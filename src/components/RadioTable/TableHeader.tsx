// TableHeader.tsx

import React from "react";
import styles from "./RadioTable.module.scss";

type SortField = "title" | "location" | "url";

interface TableHeaderProps {
    sortField: SortField;
    sortOrder: "asc" | "desc";
    handleSort: (field: SortField) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({sortField, sortOrder, handleSort}) => {
    const renderArrow = (field: SortField) => (sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : "");

    return (
        <thead className={styles.tableHeader}>
        <tr>
            <th className={`clickable ${styles.title}`} onClick={() => handleSort("title")}>
                Name {renderArrow("title")}
            </th>
            <th className={`clickable ${styles.location}`} onClick={() => handleSort("location")}>
                Location {renderArrow("location")}
            </th>
            <th className={styles.genres}>Genres</th>
            <th className={styles.tags}>Tags</th>
            <th className={styles.actions}>
                Visit
            </th>
        </tr>
        </thead>
    );
};

export default TableHeader;
