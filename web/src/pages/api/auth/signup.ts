import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/firestore';
import getClient from '../../../lib/googleapi';
import { ISignUpErrors } from '../../login';

const NEWSLETTER_ID = '1FTW2kJMOV5tQKTrosJ_ut2xBcyuylcn7Lzdqe8eaagE';
const NEWSLETTER_SHEET = 'Subscriptions';

async function checkUsername(username: string) {
  const accountsRef = db.collection('accounts');
  const account = await accountsRef.doc(username).get();
  return account.exists;
}

async function checkEmail(email: string) {
  const accountsRef = db.collection('accounts');
  const account = await accountsRef.where('email', '==', email).get();
  return !account.empty;
}

async function addNewsletterSubscription(name: string, email: string) {
  const { sheets } = await getClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: NEWSLETTER_ID,
    range: `${NEWSLETTER_SHEET}!A:A`,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [email, name]
      ]
    }
  });
}

async function createAccount(account: any) {
  const { username, password, fullname, email, phone, address, newsletter } = account;
  const accountsRef = db.collection('accounts');
  await accountsRef.doc(username).set({ password, fullname, email, phone, address });
  if (newsletter) await addNewsletterSubscription(fullname, email);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password, cPassword, fullname, email, phone, address } = req.body;
  const usernameBlank = (username.length === 0);
  const emailBlank = (email.length === 0);

  const validation: ISignUpErrors = {
    usernameBlank,
    usernameTaken: !usernameBlank && await checkUsername(username),
    passwordBlank: password.length === 0,
    passwordShort: password.length > 0 && password.length < 8,
    passwordNoMatch: password !== cPassword,
    nameBlank: fullname.length === 0,
    emailBlank,
    emailInvalid: !emailBlank && !(/\S+@\S+\.\S+/).test(email),
    emailTaken: !emailBlank && await checkEmail(email),
    phoneBlank: phone.length === 0,
    addressBlank: address.length === 0
  }

  if (Object.values(validation).every(error => !error)) {
    await createAccount(req.body);
    res.status(200).end();
  }
  else {
    res.status(400).json({ errors: validation });
  }
}