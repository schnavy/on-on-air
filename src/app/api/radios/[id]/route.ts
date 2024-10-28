import prisma from '../../../../lib/prisma';
import {NextResponse} from "next/server";

export async function POST(req: any, {params}: { params: { id: string } }) {
    const id = params.id;
    const body = await req.json();  // Parse JSON body directly

    try {
        const radio = await prisma.radio.update({
            where: {id: Number(id)},
            data: body
        });

        return NextResponse.json({data: radio}, {status: 200});
    } catch (error) {
        console.error("Error updating radio:", error);
        return NextResponse.json({error: "Failed to update radio"}, {status: 500});
    }
}