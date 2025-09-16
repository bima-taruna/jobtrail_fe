// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const API_URL = process.env.API_URL || "http://localhost:8000";

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
      accessTokenExpires: Date.now() + 1000 * 60 * 60,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.access_token) {
          throw new AuthError("CredentialsSignin"); // v5 style
        }

        return {
          id: data.user.user_id,
          email: data.user.email,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 1000 * 60 * 60,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
        },
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
        error: token.error as string,
      };
    },
  },
});

export const { GET, POST } = handlers;
