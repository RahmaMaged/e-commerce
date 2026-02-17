import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const nextauthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {
          placeholder: "Enter Your Email",
        },
        password: {},
      },
      authorize: async function (userData) {
        console.log(userData);

        let res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        let finalRes = await res.json();

        console.log(finalRes);

        if (finalRes.message == "success") {
          console.log("Finnaalll");

          return {
            id: "",
            name: finalRes.user.name,
            email: finalRes.user.email,
            userTokenFromBackend: finalRes.token,
          };
        } else {
          console.log("Noooo");

          return null;
        }
      },
    }),
  ],

  //   secret: process.env.AUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  callbacks: {
    jwt(params) {
      if (params.user) {
        params.token.userTokenFromBackend = params.user.userTokenFromBackend;
      }

      console.log("Params", params);

      return params.token;
    },

    session(params) {
      return params.session;
    },
  },

  session: {
    maxAge: 60 * 60 * 24,
  },
};
