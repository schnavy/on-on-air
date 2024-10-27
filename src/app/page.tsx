import styles from "./page.module.scss";
import SubmissionForm from "../../src//components/submission-form/submissionForm";
import {SignIn} from "@/components/auth/sign-in";

const Home: React.FC = async () => {
    const response = await fetch(process.env.BASE_URL + "/api/get-all-radios");

    const {data} = await response.json();

    return (
        <div className={styles.page}>
            <main>
                On on Air
                <br/>
                <SignIn/>
                <br/>
                <SubmissionForm/>
                <br/>
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