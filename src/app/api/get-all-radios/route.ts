import prisma from "@/lib/prisma";

export async function GET() {
    const radios = await prisma.radio.findMany();

    return Response.json({data: radios}, {status: 200});
}