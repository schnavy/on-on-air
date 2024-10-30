"use client";

import {useEffect, useState} from "react";
import styles from "./FloatingMenu.module.scss";
import Link from "next/link";
import {VscClose} from "react-icons/vsc";

const FloatingMenu = () => {
    const [leftPosition, setLeftPosition] = useState("10vw");
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const randomLeft = Math.floor(Math.random() * 30);
        setLeftPosition(`${randomLeft}vw`);
        setLoading(false);
    }, []);

    const handleClearSearch = () => {
        setSearchText("");
    };

    return (
        <nav
            className={styles.floatingNav + " " + (loading ? "loading" : "loaded")}
            style={{left: leftPosition}}
        >
            <div>
                <Link href="/" className={styles.link}>
                    On on Air<span className={styles.circle}></span>
                </Link>
            </div>
            <div>
                <Link href="/" className={styles.link}>
                    Index
                </Link>
            </div>
            <div>
                <Link href="/about" className={styles.link}>
                    About
                </Link>
            </div>
            <div className={styles.searchContainer}>
                <input
                    type="search"
                    className={styles.search}
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                {searchText && (
                    <VscClose className={styles.clearIcon} onClick={handleClearSearch}/>
                )}
            </div>
        </nav>
    );
};

export default FloatingMenu;
