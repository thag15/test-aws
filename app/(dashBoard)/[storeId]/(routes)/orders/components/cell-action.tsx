"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
interface CellActionProps {
    data: OrderColumn;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/apis/${params.storeId}/orders/${data.id}`);
            toast.success("order deleted");
            router.refresh();
        } catch (error) {
            toast.error("something went wrong from action");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };
    return (
        <div>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
