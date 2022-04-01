import { NextApiRequest, NextApiResponse } from 'next';
import getClient from '../../lib/googleapi';

const NEWSLETTER_ID = '1FTW2kJMOV5tQKTrosJ_ut2xBcyuylcn7Lzdqe8eaagE';
const NEWSLETTER_SHEET = 'Subscriptions';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;
  const { sheets } = await getClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: NEWSLETTER_ID,
    range: `${NEWSLETTER_SHEET}!A:A`,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [email, "Anonymous"]
      ]
    }
  });
  res.status(200).end();
}