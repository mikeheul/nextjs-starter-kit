import { signIn, providerMap } from "@/lib/auth"
import { AuthError } from "next-auth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function SignInPage(props: {
    searchParams: { callbackUrl: string | undefined }
}) {
    return (
        <div className="flex flex-col gap-2">
            <form
                className="flex items-end gap-4"
                action={async (formData) => {
                "use server"
                try {
                    await signIn("resend", formData)
                } catch (error) {
                    if (error instanceof AuthError) {
                        // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                    }
                    throw error
                }
                }}
            >
                <label htmlFor="email">
                    Email
                    <Input name="email" id="email" />
                </label>
                <Input type="submit" value="Sign In" />
            </form>
            {Object.values(providerMap).map((provider) => (
                <form
                    key={provider.id}
                    action={ async () => {
                        "use server"
                        try {
                            await signIn(provider.id, {
                                redirectTo: props.searchParams?.callbackUrl ?? "",
                            })
                        } catch (error) {
                            // Signin can fail for a number of reasons, such as the user
                            // not existing, or the user not having the correct role.
                            // In some cases, you may want to redirect to a custom error
                            if (error instanceof AuthError) {
                                // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                            }
                
                            // Otherwise if a redirects happens Next.js can handle it
                            // so you can just re-thrown the error and let Next.js handle it.
                            // Docs:
                            // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                            throw error
                        }
                }}
                >
                    <Button type="submit">
                        <span>Sign in with {provider.name}</span>
                    </Button>
                </form>
            ))}
        </div>
    )
}