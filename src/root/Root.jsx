import { Outlet } from "react-router-dom";


const Root = () => {
    return (
        <div>
            <h1>i am roots</h1>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;