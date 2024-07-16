import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <h1 className="text-4xl">Its home</h1>
            <Link to=""><button>Dashboard</button></Link>
        </div>
    );
};

export default Home;