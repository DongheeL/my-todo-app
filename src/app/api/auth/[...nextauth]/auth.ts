import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // 프로덕션에서도 작동하도록 설정 추가
  callbacks: {
    session({ session, token, user }) {
      return session; // 필요한 경우 여기서 세션을 커스터마이징할 수 있습니다
    },
  },
  pages: {
    signIn: "/login",
  },
};
