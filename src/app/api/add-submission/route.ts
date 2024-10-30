import prisma from "../../../lib/prisma";

export async function POST(req: Request) {
    try {
        const {data} = await req.json();
        const {title, description, url} = data;

        if (!title) {
            return Response.json({error: "Title is required"}, {status: 400});
        }

        const slug = title.toString().toLowerCase().replace(/\s+/g, "-");

        const newRadioEntry = await prisma.radio.create({
            data: {
                title,
                slug,
                description: description || "Default description", // Fallback for description
                url: url || "https://example.com", // Fallback for url
            },
        });

        return Response.json(newRadioEntry, {status: 200});
    } catch (error) {
        console.error("Error creating radio entry:", error);
        return Response.json(
            {error: "Failed to create radio entry"},
            {status: 500},
        );
    }
}
