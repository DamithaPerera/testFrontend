import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/app/login/services/loginService";
import { SessionStrategy } from "next-auth";

const strategy: SessionStrategy = "jwt";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials: any) {
                try {
                    const { email, password } = credentials;
                    const user = await loginUser({ email, password });
                    if(user){
                        return user.payload;
                    } 
                    
                } catch (error) {
                    console.error(error);
                }

                return null;
            }
        }),
        Google({
            clientId: '314956434329-i7c9ghc1e85fi8dr6ahf6ivhkui3j0p2.apps.googleusercontent.com',
            clientSecret: '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',
        }),
    ],
    secret: 'finlay_next_auth_secret',
    session: {
        strategy: strategy
    }
}

export default authOptions;