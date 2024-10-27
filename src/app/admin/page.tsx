import styles from "./page.module.scss";
import {SignOut} from "@/components/auth/sign-out";
import {auth} from "../../../auth";
import {redirect} from "next/navigation";

const AdminPanel: React.FC = async () => {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/admin/login")

    }

    if (!session || !session.user) {
        return null; // Don't render anything if there's no session (redirect will handle it)
    }

    const response = await fetch(process.env.BASE_URL + "/api/get-all-radios");
    const {data} = await response.json();

    return (
        <div className={styles.page}>
            <main>
                Admin Panel
                <p>Welcome {session.user.email}</p>
                <SignOut/>
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
};

export default AdminPanel;
