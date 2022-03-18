import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, req) => {
        console.log(credentials);
        // TODO: https://next-auth.js.org/providers/credentials
        return null;
      }
    })
  ]
});