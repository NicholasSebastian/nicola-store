import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '../../../lib/firestore';

export default NextAuth({
  secret: 'tSFkxNuxuyV432uSJalJgtPJJOFqhvECyvXRZ1dAC3o=',
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async ({ username, password }) => {
        if (username.length > 0 && password.length > 0) {
          const accountsRef = db.collection('accounts');
          const account = await accountsRef.doc(username).get();
          if (account.exists) {
            if (password === account.get('password')) {
              const email = account.get('email');
              return { name: username, email };
            }
          }
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
    // TODO: https://next-auth.js.org/configuration/pages
  }
});
