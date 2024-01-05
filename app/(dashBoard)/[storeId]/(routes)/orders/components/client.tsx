"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { useRouter, useParams } from "next/navigation";
import { OrderColumn, columns } from "./columns";

//
interface OrderClientProps {
  data: OrderColumn[];
}
export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders: (${data.length})`}
          description="Manage orders for your store"
        />
      </div>
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};
