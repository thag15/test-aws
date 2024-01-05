"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams, useRouter } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
    entityName: string;
    entityIdName: string;
}
export const ApiList: React.FC<ApiListProps> = ({
    entityName,
    entityIdName,
}) => {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const baseUrl = `${origin}/apis/${params.storeId}`;
    return (
        <div className="">
            <ApiAlert
                title="GET All"
                variant="public"
                description={`${baseUrl}/${entityName}`}
            />
            <ApiAlert
                title="GET ID"
                variant="public"
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
            <ApiAlert
                title="POST"
                variant="admin"
                description={`${baseUrl}/${entityName}`}
            />
            <ApiAlert
                title="POST"
                variant="admin"
                description={`${baseUrl}/${entityName}/${entityIdName}`}
            />
            <ApiAlert
                title="DELETE"
                variant="admin"
                description={`${baseUrl}/${entityName}/${entityIdName}`}
            />
        </div>
    );
};
