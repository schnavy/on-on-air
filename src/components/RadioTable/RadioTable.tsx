"use client";
import React, {useMemo, useState} from "react";
import styles from "./RadioTable.module.scss";
import {useRouter, useSearchParams} from "next/navigation";
import TableHeader from "@/components/RadioTable/TableHeader";
import {RadioWithRelations, SortField} from "./RadioTableTypes";

interface RadioTableProps {
    radios: RadioWithRelations[];
    editable?: boolean;
}

const RadioTable: React.FC<RadioTableProps> = ({radios, editable = false}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const sortField = (searchParams.get("sortField") as SortField) || "title";
    const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "asc";
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    const [editedRadios, setEditedRadios] = useState<number[]>([]);
    const [localRadios, setLocalRadios] = useState(radios);

    const handleSort = (field: SortField) => {
        const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set("sortField", field);
        params.set("sortOrder", newOrder);
        router.replace(`?${params.toString()}`);
    };

    const filteredAndSortedRadios = useMemo(() => {
        let filteredRadios = localRadios;
        if (searchQuery) {
            filteredRadios = localRadios.filter((radio) => {
                const lowerSearch = searchQuery.toLowerCase();
                return (
                    radio.title.toLowerCase().includes(lowerSearch) ||
                    radio.description?.toLowerCase().includes(lowerSearch) ||
                    radio.location?.toLowerCase().includes(lowerSearch) ||
                    radio.tags.some((tag) => tag.title.toLowerCase().includes(lowerSearch)) ||
                    radio.genres.some((genre) => genre.title.toLowerCase().includes(lowerSearch))
                );
            });
        }

        return [...filteredRadios].sort((a, b) => {
            const aValue = a[sortField]?.toString().toLowerCase() || "";
            const bValue = b[sortField]?.toString().toLowerCase() || "";
            return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });
    }, [localRadios, searchQuery, sortField, sortOrder]);

    const handleEdit = (id: number, field: SortField, value: string) => {
        setEditedRadios((prevEditedRadios) =>
            prevEditedRadios.includes(id) ? prevEditedRadios : [...prevEditedRadios, id]
        );

        setLocalRadios((prevRadios) =>
            prevRadios.map((radio) =>
                radio.id === id ? {...radio, [field]: value} : radio
            )
        );
    };

    const saveChanges = async (id: number) => {
        const radioToSave = localRadios.find((radio) => radio.id === id);
        if (radioToSave) {
            try {
                const response = await fetch(`/api/radios/${id}`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        title: radioToSave.title,
                        location: radioToSave.location,
                        url: radioToSave.url,
                    }),
                });

                if (response.ok) {
                    setEditedRadios((prevEditedRadios) =>
                        prevEditedRadios.filter((editedId) => editedId !== id)
                    );
                } else {
                    console.error("Error updating radio:", response.statusText);
                }
            } catch (error) {
                console.error("Error updating radio:", error);
            }
        }
    };

    return (
        <div className={styles.radioTableContainer}>
            <table className={`${styles.mainRadioTable}`}>
                <TableHeader
                    sortField={sortField}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                />
                <tbody>
                {filteredAndSortedRadios.map((radio) => (
                    <tr key={radio.id}>
                        <td className={styles.title}>
                            {editable ? (
                                <input
                                    type="text"
                                    value={radio.title}
                                    onChange={(e) => handleEdit(radio.id, "title", e.target.value)}
                                />
                            ) : (
                                radio.title
                            )}
                        </td>
                        <td className={styles.location}>
                            {editable ? (
                                <input
                                    type="text"
                                    value={radio.location}
                                    onChange={(e) => handleEdit(radio.id, "location", e.target.value)}
                                />
                            ) : (
                                radio.location
                            )}
                        </td>
                        <td className={styles.genres}>
                            <div>
                                {radio.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        id={genre.id.toString()}
                                        className={styles.genreItem}
                                        //@ts-ignore --tagBGColor is a CSS variable
                                        style={{"--tagBGColor": genre.color}}
                                    >
                                            {genre.title}
                                        </span>
                                ))}
                            </div>
                        </td>
                        <td className={styles.tags}>
                            <div>
                                {radio.tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        id={tag.id.toString()}
                                        className={styles.tagItem}
                                        //@ts-ignore --tagBGColor is a CSS variable
                                        style={{"--tagBGColor": tag.color}}
                                    >
                                            {tag.title}
                                        </span>
                                ))}
                            </div>
                        </td>
                        <td className={styles.url}>
                            {editable ? (
                                <input
                                    type="text"
                                    value={radio.url}
                                    onChange={(e) => handleEdit(radio.id, "url", e.target.value)}
                                />
                            ) : (
                                <a
                                    href={radio.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`Visit ${radio.title}`}
                                >
                                    ↗
                                </a>
                            )}
                        </td>
                        {editable && (
                            <td>
                                {editedRadios.includes(radio.id) && (
                                    <button onClick={() => saveChanges(radio.id)}>Save</button>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RadioTable;
