import SubmissionForm from "../../src/components/submission-form/submissionForm";
import React from "react";
import RadioTable from "@/components/RadioTable/RadioTable";

const Home: React.FC = async () => {
    const radiosResponse = await fetch(process.env.BASE_URL + "/api/get-radios-with-relations");
    const {data: radios} = await radiosResponse.json();

    return (
        <div>
            <main>
                <div>
                    <RadioTable radios={radios}/>
                </div>
                <br/>
                <SubmissionForm/>
                <br/>
            </main>
        </div>
    );
};

export default Home;