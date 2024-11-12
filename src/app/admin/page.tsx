import styles from "./page.module.scss";
import {SignOut} from "@/components/auth/sign-out";
import {auth} from "../../../auth";
import {redirect} from "next/navigation";
import RadioTable from "@/components/RadioTable/RadioTable";

const AdminPanel: React.FC = async () => {
    const session = await auth();
    console.log(session)

    if (!session || !session.user) {
        redirect("/admin/login");
        return null;
    }

    const radiosResponse = await fetch(
        process.env.BASE_URL + "/api/get-radios-with-relations",
    );
    const {data: radios} = await radiosResponse.json();

    return (
        <div className={styles.page}>
            <main>
                Admin Panel
                <p>Welcome {session.user.email}</p>
                <SignOut/>
                <br/>
                <RadioTable radios={radios} editable={true}/>
            </main>
        </div>
    );
};

export default AdminPanel;
