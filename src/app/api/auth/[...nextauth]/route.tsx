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
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
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
            image: profile?.picture as string,
          });
        }
        console.log("Profile img1: ", profile?.image, "-----");
        console.log("Profile img2: ", profile?.picture, "-----");
        return true;
      } catch (error) {
        console.log(error);
      }
      return false;
    },
  },
});

export { handler as POST, handler as GET };
