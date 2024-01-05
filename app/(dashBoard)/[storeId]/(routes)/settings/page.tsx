import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./components/settings-form";

interface SettingsPagesProps {
    params: {
        storeId: string;
    };
}

const SettingsPages: React.FC<SettingsPagesProps> = async ({ params }) => {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        },
    });
    if (!store) return redirect("/");
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    );
};

export default SettingsPages;
