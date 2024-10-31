import React from "react";
import RadioTable from "@/components/RadioTable/RadioTable";

const Home: React.FC = async () => {
    const radiosResponse = await fetch(
        `${process.env.BASE_URL}/api/get-radios-with-relations`, {cache: "no-store"});
    const {data: radios} = await radiosResponse.json();

    return (
        <div>
            <main>
                <div>
                    <RadioTable radios={radios}/>
                </div>
            </main>
        </div>
    );
};

export default Home;
