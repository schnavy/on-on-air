import React from "react";
import fs from "fs/promises";
import path from "path";
import { marked } from "marked";
import styles from "./about.module.scss";

const About: React.FC = async () => {
    const filePath = path.join(process.cwd(), "public/static-content/about.md");
    const markdown = await fs.readFile(filePath, "utf8");
    const aboutHTML = marked(markdown);

    return (
        <div className={styles.aboutPage}>
                <div dangerouslySetInnerHTML={{ __html: aboutHTML }} />
        </div>
    );
};

export default About;
