import prisma from "@/lib/prisma";
import {NextResponse} from 'next/server';

export async function GET(request: any) {
    const radios = await prisma.radio.findMany();

    return NextResponse.json({data: radios}, {status: 200});
}