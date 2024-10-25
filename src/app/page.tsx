import styles from "./page.module.css";
import React from "react";
import SubmissionForm from "@/components/submission-form/submissionForm";

const Home: React.FC = async () => {
    return (
        <div className={styles.page}>
            <main>
                On on Air
                <SubmissionForm/>
            </main>
        </div>
    );
}

export default Home;