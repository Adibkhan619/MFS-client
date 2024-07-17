import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link,  useNavigate } from "react-router-dom";
// import { AuthContext } from "../provider/AuthProvider";
// import toast, { Toaster } from 'react-hot-toast';
import { IoMdEye } from "react-icons/io";
// import { updateProfile } from "firebase/auth";
import "animate.css";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
// import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
    // const { createUser, setUser, user, loading } = useContext(AuthContext);
    const [error, setError] = useState();
    const [showPIN, setShowPIN] = useState(false);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const email = form.get("email");
        const mobile = form.get("mobile");
        const PIN = form.get("PIN");
        const balance = parseFloat(0)
        const role = "User"
        const status = "Pending"

        if (PIN.length !== 5) {
            setError("PIN must be 5 characters");
            return;
        }
        if (!/^\d+$/.test(PIN)) {
            setError(
                "PIN must be numerical."
            );
            return;
        }
        setError("");

        const userData= {name, email, mobile, PIN, balance, role, status}  ;
        console.log(userData);

        axiosPublic.post("/users", userData)
        .then(res => {
            console.log(res.data);

            if(res.data.insertedId){
                 Swal.fire({
        title: 'Successfully Registered!',
        // text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Cool',
        confirmButtonColor: "#87CEEB"
      })
      navigate(`/dashboard/${email}`)
            }
        })
  

    };

    return (
        <div>
            <div>
                <Helmet>
                    <title>Register</title>
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
                                        placeholder="Email"
                                        className="input input-bordered  "
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-lg">
                                            Mobile No
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        placeholder="Mobile"
                                        className="input input-bordered  "
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
                                            type={
                                                showPIN
                                                    ? "text"
                                                    : "PIN"
                                            }
                                            name="PIN"
                                            placeholder="PIN"
                                            className="input w-full  input-bordered"
                                            required
                                        />
                                        <span
                                            className="relative text-lg right-7 top-4 text-gray-400"
                                            onClick={() =>
                                                setShowPIN(!showPIN)
                                            }
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
                                        Register
                                    </button>
                                </div>
                                <p className="text-gray-500">
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
