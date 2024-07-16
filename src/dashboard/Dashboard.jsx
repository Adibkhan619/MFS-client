import { useLoaderData, useParams } from "react-router-dom";
import useAllUsers from "../hooks/useAllUsers";
import AgentDashboard from "../agentDashboard.jsx/AgentDashboard";
import UserDashboard from "../userDashboard/UserDashboard";
import AdminDashboard from "../adminDashboard/AdminDashboard";

const Dashboard = () => {
    const [users] = useAllUsers()
    console.log(users);
    const getUser = useParams()
    console.log(getUser);

    
    const user = users.find(item => item.email === getUser.email)
    console.log(user?.email);

    const userData = useLoaderData()
    console.log(userData);

    return (
        <div>
            {
                userData.role === "Agent" && <AgentDashboard></AgentDashboard>
            }
            {
                userData.role === "User" && <UserDashboard user={userData}></UserDashboard>
            }
            {
                userData.role === "Admin" && <AdminDashboard></AdminDashboard>
            }
        </div>
    );
};

export default Dashboard;