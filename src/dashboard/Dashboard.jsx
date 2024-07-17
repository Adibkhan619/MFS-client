import {  useLoaderData, useParams } from "react-router-dom";
import useAllUsers from "../hooks/useAllUsers";
import AgentDashboard from "../agentDashboard.jsx/AgentDashboard";
import UserDashboard from "../userDashboard/UserDashboard";
import AdminDashboard from "../adminDashboard/AdminDashboard";

const Dashboard = () => {
    const [users, , ] = useAllUsers()
    console.log(users);
    const getUser = useParams()
    console.log(getUser);

    
    const currentUser = users.find(item => item.email === getUser.email)
    console.log(currentUser?.email);

    const userData = useLoaderData()
    console.log(userData);

    return (
        <div>
            {/* <Outlet></Outlet> */}
            {
                userData.role === "Agent" && <AgentDashboard currentUser={userData}></AgentDashboard>
            }
            {
                userData.role === "User" && <UserDashboard currentUser={userData}></UserDashboard>
            }
            {
                userData.role === "Admin" && <AdminDashboard currentUser={userData}></AdminDashboard>
            }
        </div>
    );
};

export default Dashboard;