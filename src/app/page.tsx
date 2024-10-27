import styles from "./page.module.css";
import SubmissionForm from "@/components/submission-form/submissionForm";

const Home: React.FC = async () => {
    const response = await fetch(process.env.BASE_URL + "/api/get-all-radios");

    const {data} = await response.json();
    console.log(process.env.BASE_URL);
    return (
        <div className={styles.page}>
            <main>
                On on Air
                <SubmissionForm/>

                <div>
                    {data.map((radio: any) => (
                        <div key={radio.id}>
                            <h2>{radio.title}</h2>
                            <p>{radio.description}</p>
                            <a href={radio.url}>{radio.url}</a>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Home;