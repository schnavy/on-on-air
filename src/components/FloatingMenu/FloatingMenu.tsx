"use client"

import {useEffect, useState} from 'react';
import styles from './FloatingMenu.module.scss';

const FloatingMenu = () => {
    // Generate a random left position between 0 and 50vw
    const [leftPosition, setLeftPosition] = useState('10vw'); // Initial default position
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const randomLeft = Math.floor(Math.random() * 50); // Generate a random value between 0 and 50
        setLeftPosition(`${randomLeft}vw`);
        setLoading(false);
    }, []);

    return (
        <nav className={styles.floatingNav + " " + (loading ? "loading" : "loaded")}
             style={{left: leftPosition}}>
            <div>
                <a href="" className={styles.link}>
                    On on Air<span className={styles.circle}></span>
                </a>
            </div>
            <div>
                <a href="" className={styles.link}>
                    Index
                </a>
            </div>
            <div>
                <a href="" className={styles.link}>
                    About
                </a>
            </div>
            <div>
                <input type={"search"} className={styles.search} placeholder={"Search"}>
                </input>
            </div>
        </nav>
    );
};

export default FloatingMenu;