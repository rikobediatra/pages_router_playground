import CreadentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import nextAuth, { NextAuthOptions } from "next-auth";
import { signIn, signInWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcrypt";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CreadentialsProvider({
      type: "credentials",
      name: "Cedentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: any = await signIn({ email });

        if (user) {
            const passConfirm = await compare(password, user.password);
            if (passConfirm) {
                return user;
            } else {
                return null;
            }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ''
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      //login with credential
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }

      // login with google
      if (account?.provider === "google") {
        const data = {
          name: user.name,
          email: user.email,
          image: user.image,
          type: "google",
          role: "member"
        };

        await signInWithGoogle(data, (result: any) => {
          if (result.status) {
            token.email = result.data.email;
            token.name = result.data.name;
            token.image = result.data.image;
            token.type = result.data.type;
            token.role = result.data.role;
          }
        });

        
      }
      return token;
    },

    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }

      if ("name" in token) {
        session.user.name = token.name;
      }
      
      if ("image" in token) {
        session.user.image = token.image;
      }

      if ("role" in token) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default nextAuth(authOptions);
