import { auth } from "@/lib/auth-helper";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { signOut } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function AuthButton() {
    const user = await auth();

    if(!user) {
        return (
            <Link className={buttonVariants({ variant: "outline"})} href="signin">
                Sign In
            </Link>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    {/* <Image src="image.jpg" alt="User Avatar" width={32} height={32} /> */}
                    {user.email}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                <form>
                    <button
                        formAction={async () => {
                            "use server";
                            await signOut();
                            revalidatePath("/");
                        }}
                    >
                        Sign out
                    </button>
                </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}