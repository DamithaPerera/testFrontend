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
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: strategy
    }
}

export default authOptions;