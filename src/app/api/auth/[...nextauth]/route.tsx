import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (!session?.user?.email) {
        console.error("Session or user email is undefined");
        return session;
      }

      await connectToDB();
      const sessionUser = await User.findOne({ email: session.user.email });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      } else {
        console.error("User not found");
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExist = await User.findOne({ email: profile?.email });

        if (!userExist) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: (profile as { picture?: string }).picture || "",
          });
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
  },
});

export const POST = handler;
export const GET = handler;
