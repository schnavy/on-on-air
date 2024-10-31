import {Genre, Radio, Tag} from "@prisma/client";

export interface RadioWithRelations extends Radio {
    genres: GenreWithColor[];
    tags: TagWithColor[];
}

export interface GenreWithColor extends Genre {
    color: string;
}

export interface TagWithColor extends Tag {
    color: string;
}

export type SortField = "title" | "location" | "url";