"use client";
import React, {useState, useEffect} from "react";
import {Genre, Radio, Tag} from "@prisma/client";
import styles from "./RadioTable.module.scss";

interface RadioWithRelations extends Radio {
    genres: GenreWithColor[];
    tags: TagWithColor[];
}

interface GenreWithColor extends Genre {
    color: string;
}

interface TagWithColor extends Tag {
    color: string;
}

type SortField = "title" | "location";

const RadioTable: React.FC<{ radios: RadioWithRelations[], editable?: boolean }> = ({radios, editable = false}) => {
    const [loading, setLoading] = useState(true);
    const [radiosState, setRadiosState] = useState<RadioWithRelations[]>(radios);
    const [editedRadios, setEditedRadios] = useState<number[]>([]);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortField, setSortField] = useState<SortField>("title");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const field = urlParams.get("sortField") as SortField;
        const order = urlParams.get("sortOrder") as "asc" | "desc";
        if (field && order) {
            setSortField(field);
            setSortOrder(order);
            sortRadios(field, order);
        }
        setLoading(false);
    }, []);

    const sortRadios = (field: SortField, order: "asc" | "desc") => {
        const sortedRadios = [...radiosState].sort((a, b) =>
            order === "asc" ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field])
        );
        setRadiosState(sortedRadios);
    };

    const handleSort = (field: SortField) => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);
        setSortField(field);

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("sortField", field);
        urlParams.set("sortOrder", newOrder);
        window.history.pushState({}, "", `${window.location.pathname}?${urlParams.toString()}`);

        sortRadios(field, newOrder);
    };

    const handleEdit = (id: number, field: SortField, value: string) => {
        setEditedRadios((prevEditedRadios) => [...prevEditedRadios, id]);
        setRadiosState((prevRadios) =>
            prevRadios.map((radio) =>
                radio.id === id ? {...radio, [field]: value} : radio
            )
        );
    };

    const saveChanges = async (id: number) => {
        const radioToSave = radiosState.find((radio) => radio.id === id);
        if (radioToSave) {
            try {
                await fetch(`/api/radios/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: radioToSave.title,
                        location: radioToSave.location
                    }),
                });
            } catch (error) {
                console.error("Error updating radio:", error);
            }
            setEditedRadios((prevEditedRadios) => prevEditedRadios.filter((editedId) => editedId !== id));
        }
    };

    const renderArrow = (field: SortField) => (sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : "");

    return (
        <div className={styles.radioTableContainer}>
            <table className={styles.mainRadioTable + " " + (loading ? styles.loading : styles.loaded)}>
                <thead>
                <tr>
                    <th className={`clickable ${styles.title}`} onClick={() => handleSort("title")}>
                        Name {renderArrow("title")}
                    </th>
                    <th className={`clickable ${styles.location}`} onClick={() => handleSort("location")}>
                        Location {renderArrow("location")}
                    </th>
                    <th className={styles.genres}>Genres</th>
                    <th className={styles.tags}>Tags</th>
                    <th className={styles.actions}></th>
                </tr>
                </thead>
                <tbody>
                {radiosState.map((radio) => (
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
                                {radio.genres.map((genre) => {
                                    return (
                                        <span
                                            key={genre.id}
                                            id={genre.id.toString()}
                                            className={styles.genreItem}
                                            style={{
                                                // @ts-ignore
                                                "--tagBGColor": `${genre.color}`,
                                            }}
                                        >{genre.title}</span>
                                    )
                                })}
                            </div>
                        </td>
                        <td className={styles.tags}>
                            <div>
                                {radio.tags.map((tag) => {
                                    return (
                                        <span
                                            key={tag.id}
                                            id={tag.id.toString()}
                                            className={styles.tagItem}
                                            style={{
                                                // @ts-ignore
                                                "--tagBGColor": `${tag.color}`,
                                            }}
                                        >
                                        {tag.title}</span>
                                    )
                                })
                                }
                            </div>
                        </td>
                        <td>
                            {editable && editedRadios.includes(radio.id) ? (
                                    <button onClick={() => saveChanges(radio.id)}>Save
                                    </button>
                                ) :
                                <a href={radio.url} target="_blank" rel="noreferrer">↗</a>
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RadioTable;