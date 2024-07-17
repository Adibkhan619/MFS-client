import { Outlet } from "react-router-dom";


const Root = () => {
    return (
        <div className="lg:mx-24">

            <Outlet></Outlet>
        </div>
    );
};

export default Root;