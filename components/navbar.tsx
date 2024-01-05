import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const NavBar = async () => {
    const { userId } = auth()
    if (!userId) {
        redirect('/sign-in')
    }
    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    })
    return (
        <>
            <div className="border-b">
                <div className="flex items-center p-4 gap-3">
                    <StoreSwitcher items={stores} />
                    <MainNav />
                    <div className="ml-auto flex items-center space-x-4">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
