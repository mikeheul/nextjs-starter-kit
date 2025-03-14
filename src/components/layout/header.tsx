import { ModeToggle } from "../theme/theme-mode-toggle";
import { AuthButton } from "../auth/auth-button";

export function Header() {
    return (
        <header className="flex items-center justify-between px-4 py-2 border-b border-accent">
            <h1>App Name</h1>
            <div className="flex-1"></div>
            <AuthButton />
            <ModeToggle />
        </header>
    )
}