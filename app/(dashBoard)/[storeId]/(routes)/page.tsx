import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import React from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { formatter } from "@/lib/utils";
import getTotalRevenue from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import Overview from "@/components/overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";
interface DashBoardPageProps {
	params: { storeId: string };
}
const DashBoardPage: React.FC<DashBoardPageProps> = async ({ params }) => {

	const totalRevenue = await getTotalRevenue(params.storeId);
	const salesCount = await getSalesCount(params.storeId);
	const stockCount = await getStockCount(params.storeId);
	const graphRevenue = await getGraphRevenue(params.storeId)
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<Heading title={"DashBoard"} description={"Overview of your store"} />
				<Separator />
				<div className="grid gap-4 grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pd-2">
							<CardTitle className="text-sm font-medium">
								Total Revenue
							</CardTitle>
							<DollarSign />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pd-2">
							<CardTitle className="text-sm font-medium">Sales</CardTitle>
							<CreditCard />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">+{salesCount}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pd-2">
							<CardTitle className="text-sm font-medium">Products in stock</CardTitle>
							<Package />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stockCount}</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<Card className="col-span-4">
				<CardHeader>
					<CardTitle>Overview</CardTitle>
				</CardHeader>
				<CardContent>
					<Overview data={graphRevenue} />
				</CardContent>
			</Card>
		</div>
	);
};

export default DashBoardPage;
