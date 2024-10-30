import prisma from "../../../../lib/prisma";

export async function POST(
    req: Request,
    {params}: { params: Promise<{ id: string }> }
) {
    const id = (await params).id
    const body = await req.json();

    try {
        const radio = await prisma.radio.update({
            where: {id: Number(id)},
            data: body,
        });

        return Response.json({data: radio}, {status: 200});
    } catch (error) {
        console.error("Error updating radio:", error);
        return Response.json(
            {error: "Failed to update radio"},
            {status: 500},
        );
    }
}