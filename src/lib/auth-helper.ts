import { baseAuth } from "./auth"

export const auth = async () => {
    const session = await baseAuth();
    return session?.user;
}