import { NextAuthOptions } from 'next-auth';
// import { FirestoreAdapter } from '@auth/firebase-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { auth as admin } from '@/lib/authAdmin';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, credentials?.email || '', credentials?.password || '');
          if (userCredential) {
            return {
              id: userCredential.user.uid,
              name: userCredential.user.displayName,
              email: userCredential.user.email,
            };
          } else {
            return null;
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  // adapter: FirestoreAdapter(firestore) as unknown as NextAuthOptions['adapter'],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log(user);
        const isAdmin = (await admin.getUser(user.id)).customClaims?.admin;
        token.id = user.id;
        token.role = isAdmin ? 'admin' : 'user';
      }

      return token;
    },
  },
};
