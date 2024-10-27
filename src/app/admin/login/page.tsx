import {signIn} from "../../../../auth";

const AdminLogin: () => Promise<void> = async () => {
    await signIn("email", {redirectTo: "/admin"});
};


export default AdminLogin;