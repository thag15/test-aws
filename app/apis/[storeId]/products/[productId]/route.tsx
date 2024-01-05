"use server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        if (!params.productId) {
            return new NextResponse("product is required", { status: 400 });
        }

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        console.log("[PRODUCT_GET]", error);
        return new NextResponse("Interal error", { status: 500 });
    }
}
//
export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string; productId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const {
            name,
            images,
            categoryId,
            colorId,
            sizeId,
            price,
            isFeatured,
            isArchived,
        } = body;
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });
        if (!name) return new NextResponse("name is required", { status: 400 });
        if (!images || !images.length) {
            return new NextResponse("images is required", { status: 400 });
        }
        if (!categoryId) {
            return new NextResponse("categoryId is required", { status: 400 });
        }
        if (!colorId) {
            return new NextResponse("colorId is required", { status: 400 });
        }
        if (!sizeId) {
            return new NextResponse("sizeId is required", { status: 400 });
        }
        if (!price) {
            return new NextResponse("price is required", { status: 400 });
        }

        if (!params.productId) {
            return new NextResponse("productId is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                categoryId,
                colorId,
                sizeId,
                price,
                isFeatured,
                isArchived,
                storeId: params.storeId,
                images: {
                    deleteMany: {},
                },
            },
        });
        const product = await prismadb.product.update({
            where: {
                id: params.productId,
            }, data: {
                images: {

                    createMany: {
                        data: [
                            ...images.map((img: { url: string }) => img)
                        ]
                    }
                }
            }
        })
        return NextResponse.json(product);
    } catch (error) {
        console.log("[BILLBOARDS_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
//
export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string; productId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!params.productId) {
            return new NextResponse("productId is required", { status: 400 });
        }
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productId,
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        console.log("[PRODUCT_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
//
