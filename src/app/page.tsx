import styles from "./page.module.css";
import React from "react";

const Home: React.FC = () => {
    return (
        <div className={styles.page}>
            <main>
                On on Air
                <form>
                    <label>
                        Name:
                        <input type="text" name="name"/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </main>
        </div>
    );
}

export default Home;