
import { useState } from "react";
import useAllUsers from "../hooks/useAllUsers";
import useAxiosPublic from "../hooks/useAxiosPublic";

const UserDashboard = ({ user }) => {
    const axiosPublic = useAxiosPublic()
    const [users] = useAllUsers()
    const [moneyChange, setMoneyChange] = useState();
    console.log(user);

    // SEND MONEY ------->
    const handleSendMoney = async (e) => {
        e.preventDefault()
        const form = e.target;
        const mobile = form.mobile.value;
        const email = user.email
        const name = user.name
        const amount = parseFloat(form.amount.value);
        setMoneyChange(amount)

        if(moneyChange> user.balance){
            alert("You do not have sufficient balance")
            return
        }
        const receiver = users.find(item => item.mobile === mobile)
        if(!receiver){
            alert('Enter a Valid User Mobile Number.')
            return
        }
        const sendMoney = {mobile, amount, receiver, email, name}

        axiosPublic.patch(`/send-money/${mobile}`, 
            {moneyChange: parseFloat(moneyChange)},
        )
        axiosPublic.patch(`/reduce-money/${user._id}`, 
            {moneyChange: parseFloat(-moneyChange)},
        )
        axiosPublic.post("/transactions", sendMoney  )
        alert(`${amount} money successfully sent to ${mobile}`)
    };

    // CASH IN --------->
    const handleCashIn = async (e) => {
        e.preventDefault()
        const form = e.target;
        const mobile = form.mobile.value;
        const name = user.name
        const agent = users.find(item => item.mobile === mobile)
        if(!agent){
            alert('Enter Valid agent No.')
            return
        }
        const request = "cashIn"

        const amount = parseFloat(form.amount.value);
        const email = user.email
        const cashIn = { agent, amount, request, email, name };

        const PIN = form.PIN.value;
        if(PIN !== user.PIN){
            alert("Invalid PIN")
            return
        }
        axiosPublic.post("/transactions", cashIn  )
        return alert("Cash In request sent to the agent and waiting for approval")    
    };

    // CASH OUT --------->
    const handleCashOut = async (e) => {
        e.preventDefault()
        const form = e.target;
        const mobile = form.mobile.value;
        const name = user.name
        const agent = users.find(item => item.mobile === mobile)
        if(!agent){
            alert('Enter Valid agent No.')
            return
        }
        const request = "cashOut"
        const amount = parseFloat(form.amount.value);
        const email = user.email
        const cashOut = { agent, amount, request, email, name };

        const PIN = form.PIN.value;
        if(PIN !== user.PIN){
            alert("Invalid PIN")
            return
        }
        axiosPublic.post("/transactions", cashOut  )
        return alert("Cash In request sent to the agent and waiting for approval")    
    };

    return (
        <div className=" mx-auto">
            <h1>User dashboard</h1>
            <h1></h1>
            <div className="  ">
                <figure>
                    {/* <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
      alt="Shoes" /> */}
                </figure>
                <div className="text-center">
                    <h2 className="text-2xl"> {user.name}</h2>
                    <h2 className=" text-4xl">Balance: {user.balance}</h2>

                    <div className="mx-auto flex justify-center mt-10">
                        {user.balance === !0 ? (
                            <h1 className="text-lg">
                                Your Account is waiting for approval
                            </h1>
                        ) : (

                            <div className="flex lg:flex-row flex-col gap-10">

                                {/* // SEND MONEY -----------------------> */}
                            <div className="border card p-5 w-full ">
                                <h1 className="text-3xl">Send Money</h1>
                                <form method="dialog" onSubmit={handleSendMoney}>
                                    {/* if there is a button in form, it will close the modal */}
                                    <div className="">
                                        <div className=" ">
                                            <div className="">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Mobile No.
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="mobile"
                                                        placeholder="Mob no."
                                                        className="input input-bordered w-72 "
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Amount
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="amount"
                                                        placeholder="BDT"
                                                        className="input input-bordered w-72"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Enter your PIN
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="PIN"
                                                        placeholder="Pin"
                                                        className="input input-bordered w-72"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control mt-6">
                                                    <button
                                                        className="btn "
                                                        type="submit"
                                                    >
                                                        Send Money
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>



                            {/* cash in */}
   
                            <div className="border card p-5 w-full ">
                                <h1 className="text-3xl">Cash In</h1>
                                <form method="dialog" onSubmit={handleCashIn}>
                                    {/* if there is a button in form, it will close the modal */}
                                    <div className="">
                                        <div className=" ">
                                            <div className="">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Mobile No.
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="mobile"
                                                        placeholder="Mob no."
                                                        className="input input-bordered w-72"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Amount
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="amount"
                                                        placeholder="BDT"
                                                        className="input input-bordered w-72"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Enter your PIN
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="PIN"
                                                        placeholder="Pin"
                                                        className="input input-bordered w-72"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control mt-6">
                                                    <button
                                                        className="btn "
                                                        type="submit"
                                                    >
                                                        Cash In
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* cash out */}

                            <div className="border card p-5 w-full ">
                                <h1 className="text-3xl">Cash Out</h1>
                                <form method="dialog" onSubmit={handleCashOut}>
                                    {/* if there is a button in form, it will close the modal */}
                                    <div className="">
                                        <div className=" ">
                                            <div className="">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Mobile No.
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="mobile"
                                                        placeholder="Mob no."
                                                        className="input input-bordered w-72"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Amount
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="amount"
                                                        placeholder="BDT"
                                                        className="input input-bordered w-72"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Enter your PIN
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="PIN"
                                                        placeholder="Pin"
                                                        className="input input-bordered w-72"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control mt-6">
                                                    <button
                                                        className="btn "
                                                        type="submit"
                                                    >
                                                        Cash Out
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
