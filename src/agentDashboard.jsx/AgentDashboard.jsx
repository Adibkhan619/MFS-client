
const AgentDashboard = ({user}) => {



    return (
        <div className="text-center mx-auto my-10">
            <h1 className="text-2xl">{user.role}</h1>
            <h1 className="text-3xl">{user.name}</h1>
            <h1 className="text-2xl">{user.email}</h1>
           
            <h1 className="text-4xl">Balance: {user.balance}</h1>
        </div>
    );
};

export default AgentDashboard;