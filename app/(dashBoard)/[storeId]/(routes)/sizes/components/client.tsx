"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

//
interface SizeClient {
    data: SizeColumn[];
}
const SizeClient: React.FC<SizeClient> = ({ data }) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes: (${data.length})`}
                    description="Manage sizes for your store"
                />
                <Button
                    onClick={() => router.push(`/${params.storeId}/sizes/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for sizes" />
            <Separator />
            <ApiList entityName="sizes" entityIdName="sizeId" />
        </>
    );
};

export default SizeClient;
