import {NextRequest, NextResponse} from 'next/server';
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const {data} = await req.json();

        // Validate and destructure the data
        const {title, description, url} = data;

        if (!title) {
            // Return an error if title is missing
            return NextResponse.json({error: "Title is required"}, {status: 400});
        }

        // Generate the slug from the title
        const slug = title.toString().toLowerCase().replace(/\s+/g, "-");

        // Create a new radio entry in the database
        const newRadioEntry = await prisma.radio.create({
            data: {
                title,
                slug,
                description: description || "Default description", // Fallback for description
                url: url || "https://example.com", // Fallback for url
            },
        });

        // Return the new entry as a JSON response
        return NextResponse.json(newRadioEntry, {status: 200});
    } catch (error) {
        console.error("Error creating radio entry:", error);

        // Return a 500 error if something goes wrong
        return NextResponse.json({error: "Failed to create radio entry"}, {status: 500});
    }
}
