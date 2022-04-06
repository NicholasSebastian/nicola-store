import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/react';
import db from '../lib/firestore';

export default async (context: GetServerSidePropsContext): Promise<Result> => {
  const session = await getSession(context);

  if (session) {
    const { name } = session.user;
    const accountsRef = db.collection('accounts');
    const account = await accountsRef.doc(name).get();

    if (account.exists) {
      const { fullname, email, address, phone } = account.data();
      return {
        props: {
          username: name,
          fullname,
          email,
          address,
          phone
        }
      };
    }

    return { notFound: true };
  }

  return { 
    redirect: { 
      destination: '/', 
      permanent: false 
    } 
  };
}

type Result = GetServerSidePropsResult<{ [key: string]: any }>