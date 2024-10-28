import prisma from '../../../lib/prisma';
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const radios = await prisma.radio.findMany({
            include: {
                tags: true,
                genres: true,
            },
        });

        return NextResponse.json({data: radios}, {status: 200});

    } catch (error) {
        NextResponse.json({error: "Failed to fetch radios with relations."}, {status: 500});
    }

}