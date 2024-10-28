const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    // Load the radios JSON data
    const radiosData = JSON.parse(
        fs.readFileSync(path.join(__dirname, './radio-seed2.json'), 'utf8')
    );

    for (const radioData of radiosData) {
        // Convert title and URL to lowercase to ensure case-insensitive matching
        const lowerTitle = radioData.title.toLowerCase();
        const lowerUrl = radioData.url.toLowerCase();

        // Check for an existing radio with the same title or URL (case-insensitive)
        const existingRadio = await prisma.radio.findFirst({
            where: {
                OR: [
                    { title: { equals: lowerTitle, mode: 'insensitive' } },
                    { url: { equals: lowerUrl, mode: 'insensitive' } }
                ],
            },
        });

        // Skip creation if a duplicate is found
        if (existingRadio) {
            console.log(`Duplicate found, skipping: ${radioData.title}`);
            continue;
        }

        // Handle genres for the radio
        const genreConnections = await Promise.all(
            radioData.genres.map(async (genreTitle) => {
                const genre = await prisma.genre.upsert({
                    where: { title: genreTitle }, // Ensure title is unique
                    update: {},
                    create: { title: genreTitle },
                });
                return { id: genre.id };
            })
        );

        // Handle tags for the radio
        const tagConnections = await Promise.all(
            radioData.tags.map(async (tagTitle) => {
                const tag = await prisma.tag.upsert({
                    where: { title: tagTitle }, // Ensure title is unique
                    update: {},
                    create: { title: tagTitle },
                });
                return { id: tag.id };
            })
        );

        // Create the radio entry with connected genres and tags
        const radio = await prisma.radio.create({
            data: {
                title: radioData.title,
                url: radioData.url,
                location: radioData.location,
                description: radioData.description,
                slug: radioData.slug,
                status: "submitted",
                active: true,
                genres: {
                    connect: genreConnections,
                },
                tags: {
                    connect: tagConnections,
                },
            },
        });
        console.log(`Added: ${radio.title}`);
    }
    console.log('All radios imported successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
