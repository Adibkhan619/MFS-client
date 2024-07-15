import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
// import toast from "react-hot-toast";
import { IoMdEye } from "react-icons/io";
import { updateProfile } from "firebase/auth";
import "animate.css";
import axios from "axios";

const Register = () => {
    const { createUser, setUser, user, loading } = useContext(AuthContext);
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // NAVIGATE TO LAST VISITED PAGE
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [navigate, user]);
    const from = location.state || "/";

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const email = form.get("email");
        const photo = form.get("photo");
        const password = form.get("password");

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
            setError(
                "Password must have at least one uppercase and one lowercase letter."
            );
            return;
        }
        setError("");

        try {
            const result = await createUser(email, password);

            await updateProfile(name, photo);
            setUser({ ...result?.user, photoURL: photo, displayName: name });

            const { data } = await axios.post(
                `https://b9a11-server-side-adibkhan619.vercel.app/jwt`,
                {
                    email: result?.user?.email,
                },
                { withCredentials: true }
            );
            navigate(from, { replace: true });
            console.log(data);
            toast.success("Registration Successful");
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    };
    if (user || loading) return;
    return (
        <div>
            <div>
                <Helmet>
                    <title>Flavour Paradise | Register</title>
                </Helmet>
                <div className="hero  max-w-full  mx-auto lg:h-[630px]  lg:mb-20">
                    <img
                        className="hero-overlay lg:h-[630px]  lg:px-0 lg:opacity-90"
                        src="https://i.postimg.cc/Dz3BGj85/Pngtree-top-desk-with-blur-restaurant-15477052.jpg"
                        alt=""
                    />
                    <div className="hero-content px-5 lg:px-16 lg:gap-10 flex-col lg:flex-row-reverse">
                        <div className="text-center space-y-3 lg:text-left">
                            <h1 className="text-5xl text-gray-900 acme py-5 font-bold animate__bounceIn animate__animated">
                                Unlock Exclusive Benefits! <br /> Register Today.
                            </h1>
                            <p className="p-6 rounded-lg text-amber-300 text-xl bg-opacity-40 bg-gray-700  oleo">
                            Welcome to Flavour Paradise! Register now to unlock exclusive offers, manage your reservations, and stay updated on our latest culinary creations. Your journey with us begins here. Join our culinary community and embark on a flavorful adventure unlike any other.
                            </p>
                        </div>
                        <div className="card glass mt-5 shrink-0 w-full max-w-sm shadow-2xl bg-opacity-85 animate__fadeInDown animate__animated">
                            <form
                                onSubmit={handleRegister}
                                className="card-body "
                            >
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-lg">
                                            Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        className="input input-bordered   "
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-lg">
                                            Email
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        className="input input-bordered  "
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-lg">
                                            Photo url
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="photo"
                                        placeholder="Photo url"
                                        className="input input-bordered  "
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-lg">
                                            Password
                                        </span>
                                    </label>
                                    <div className="inline-flex">
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            placeholder="password"
                                            className="input w-full  input-bordered"
                                            required
                                        />
                                        <span
                                            className="relative text-lg right-7 top-4 text-gray-400"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            <IoMdEye />
                                        </span>
                                    </div>

                                    <small className="text-red-500 p-1">
                                        {error}
                                    </small>
                                </div>
                                {/* {
                                                user?  <Link to="/myList">
                                    <button
                                        type="submit"
                                        className="btn border-none font-bold text-gray-800 text-lg bg-orange-500 w-full "
                                    >
                                        Register
                                    </button>
                                    </Link> : 

                                            } */}

                                <div className="form-control mt-6">
                                    <button
                                        type="submit"
                                        className="btn border-none font-bold text-gray-800 text-lg bg-amber-300 w-full "
                                    >
                                        Register
                                    </button>
                                </div>
                                <p className="text-gray-200">
                                    <small>Already have an account? </small>
                                    <Link
                                        to="/login"
                                        className="hover:text-blue-500"
                                    >
                                        <small>
                                            <strong>Login</strong>
                                        </small>
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <ToastContainer /> */}
            </div>
        </div>
    );
};

export default Register;
