import prisma from "../../../lib/prisma";
import {hashStringToHue, hslToRgb} from "@/utils/helpers";

function getPastelColorForTag(tagName: string) {
    const hue = hashStringToHue(tagName);
    const saturation = 80;
    const lightness = 60;
    return hslToRgb(hue, saturation, lightness);
}

export async function GET() {
    try {
        const radios = await prisma.radio.findMany({
            include: {
                tags: true,
                genres: true,
            },
        });

        const radiosWithColoredTags = radios.map((radio) => ({
            ...radio,
            genres: radio.genres.map((genre) => ({
                ...genre,
                color: getPastelColorForTag(genre.title), // Consistent RGB color for each tag
            })),
            tags: radio.tags.map((tag) => ({
                ...tag,
                color: getPastelColorForTag(tag.title), // Consistent RGB color for each tag
            })),
        }));

        console.log(radiosWithColoredTags);

        return Response.json({data: radiosWithColoredTags}, {status: 200});
    } catch (error) {
        return Response.json(
            {error: "Failed to fetch radios with relations." + error},
            {status: 500},
        );
    }
}
