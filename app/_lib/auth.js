import NextAuth from "next-auth";
import Google from "next-auth/providers/google"; // Use GoogleProvider as it's the standard import name
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // next auth will call this function in a middleware of the route that we mention in middleware config matcher
  callbacks: {
    authorized({ auth, request }) {
      //auth --> current session
      //!! --> convert any value to boolean
      return !!auth?.user;
    },
    //middleware which is calling while to user signup is complete and user click on signup
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },
    // it will run after the signIn callback and each time that the session is checked out example when we call that auth function
    async session({ session, user }) {
      // session--> all the information coming from google like email, fullName
      // to add guestId in the session
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;

      return session;
    },
  },
  //for our custom login or signup page , create folder of login and then page.jsx and below this
  // whenever we open signIn page we will be redirected to login route
  pages: {
    signIn: "/login",
  },
};
// Export the default NextAuth handler
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
