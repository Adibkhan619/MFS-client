import {
    // useContext,
    //  useEffect,
    useState,
} from "react";
import { Helmet } from "react-helmet";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import "animate.css";

const Login = () => {
    const userData = useLoaderData();
    const [error, setError] = useState();
    const [showPIN, setShowPIN] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const PIN = form.get("PIN");

        if (PIN.length !== 4) {
            setError("PIN must be 4 characters");
            return;
        }
        if (!/^\d+$/.test(PIN)) {
            setError("PIN must be numerical.");
            return;
        }
        setError("");

        const user = userData.filter(
            (item) => item?.email === email && item?.PIN === PIN
        );
        console.log(user);
        if (user.length === 1) {
            alert("Login Successful");
            navigate("/");
        } else {
            alert("Invalid Credentials");
            return;
        }
    };

    return (
        <div>
            <div>
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <div className="">
                    <div className=" px-5 max-w-lg mx-auto lg:px-16 lg:gap-10 ">
                        <div className="card  mt-5  w-full  shadow-2xl bg-opacity-85 animate__fadeInDown animate__animated">
                            <form
                                onSubmit={handleRegister}
                                className="card-body "
                            >
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-lg">
                                            Email
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="input input-bordered  "
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-lg">
                                            PIN
                                        </span>
                                    </label>
                                    <div className="inline-flex">
                                        <input
                                            type={showPIN ? "text" : "PIN"}
                                            name="PIN"
                                            placeholder="PIN"
                                            className="input w-full  input-bordered"
                                            required
                                        />
                                        <span
                                            className="relative text-lg right-7 top-4 text-gray-400"
                                            onClick={() => setShowPIN(!showPIN)}
                                        >
                                            <IoMdEye />
                                        </span>
                                    </div>

                                    <small className="text-red-500 p-1">
                                        {error}
                                    </small>
                                </div>

                                <div className="form-control mt-6">
                                    <button
                                        type="submit"
                                        className="btn border-none font-bold text-gray-800 text-lg bg-amber-300 w-full "
                                    >
                                        Login
                                    </button>
                                </div>
                                <p className="text-gray-500">
                                    <small>Do not have an account? </small>
                                    <Link
                                        to="/register"
                                        className="hover:text-blue-500"
                                    >
                                        <small>
                                            <strong>Register</strong>
                                        </small>
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
