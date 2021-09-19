import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import jwt from "jsonwebtoken";

export default NextAuth({
    providers: [
        Providers.Auth0({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            domain: process.env.DOMAIN,
        })
    ],
    secret: process.env.SECRET,
    session: {
        jwt: true,
    },
    jwt: {
        secret: process.env.SIGNING_KEY,
        verificationOptions: {
            algorithms: ["RS256"]
        },
        encode: async ({ secret, token }) => {
            const jwtClaims = {
                "id": token.id,
                "name": token.name,
                "email": token.email,
                "picture": token.picture,
                "iat": Date.now() / 1000,
                "exp": Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                "https://hasura.io/jwt/claims": {
                    "x-hasura-allowed-roles": ["user"],
                    "x-hasura-default-role": "user",
                    "x-hasura-role": "user",
                    "x-hasura-user-id": token.id,
                }
            };
            const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: 'RS256' });
            return encodedToken;
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jwt.verify(token, secret, { algorithms: ['RS256'] });
            return decodedToken;
        },
    },
    callbacks: {
        async session(session, token) {
            const encodedToken = jwt.sign(token, process.env.SIGNING_KEY, { algorithm: 'RS256' });
            session.id = token.id;
            session.token = encodedToken;
            return Promise.resolve(session);
        },
        async jwt(token, user) {
            const isUserSignedIn = user ? true : false;
            if (isUserSignedIn) {
                token.id = user.id.toString();
            }
            return Promise.resolve(token);
        }
    },
    pages: {
        // signIn: '/auth/signin',
        // signOut: '/auth/signOut',
        error: '/auth/error'
    },
    debug: true
})