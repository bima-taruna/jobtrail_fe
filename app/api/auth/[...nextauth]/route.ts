import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = process.env.API_URL || "http://localhost:8000";

// 🔄 Helper to refresh the access token
async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${API_URL}/auth/refresh_token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.refreshToken}`,
      },
    });

    const data = await res.json();
    if (!res.ok || !data.access_token) throw data;

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + 1000 * 60 * 60, // adjust to backend TTL
      // keep refreshToken unless backend rotates it
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // call FastAPI /auth/login
        const res = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.access_token) {
          return null;
        }

        // return everything needed for JWT
        return {
          id: data.user.user_id,
          email: data.user.email,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // 🔑 Controls what gets saved in the JWT
    async jwt({ token, user }: any) {
      // First login → attach user info + tokens
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 1000 * 60 * 60, // match backend TTL
        };
      }

      // If token still valid, return it
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Otherwise try to refresh
      return await refreshAccessToken(token);
    },

    // 🎁 What goes to the client via useSession()
    async session({ session, token }: any) {
      session.user = {
        id: token.id,
        email: token.email,
      };
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
