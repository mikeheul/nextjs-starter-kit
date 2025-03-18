import { auth } from "@/lib/auth-helper";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
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
                <form action={ async () => {
                    "use server";
                    await signOut();
                    revalidatePath("/");
                }}>
                    <button type="submit">Sign out</button>
                </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}