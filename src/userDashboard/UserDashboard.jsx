
import { useState } from "react";
import useAllUsers from "../hooks/useAllUsers";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const UserDashboard = ({ currentUser }) => {
    
    const axiosPublic = useAxiosPublic()
    const [users, , refetch] = useAllUsers()
    const [moneyChange, setMoneyChange] = useState("");
    // console.log(user);

    const user = users.find(item => item._id === currentUser?._id  )
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
        console.log(typeof(amount));
        const type = "sendMoney"
        const PIN = form.PIN.value;

        if(moneyChange> user.balance){
            alert("You do not have sufficient balance")
            return
        }
        const receiver = users.find(item => item.mobile === mobile)
        // console.log(receiver);
        if(!receiver){
            alert('Enter a Valid User Mobile Number.')
            return
        }

        const sendMoney = {mobile, amount, receiver, email, name, type}

        try {
            const response = await axiosPublic.post('/validate-pin', { name, PIN });
      
            if (response.data.valid) {
                axiosPublic.patch(`/send-money/${receiver._id}`, 
                    {moneyChange: parseFloat(moneyChange)},
                )

                axiosPublic.patch(`/reduce-money/${user._id}`, 
                    {moneyChange: parseFloat(-moneyChange)},
                )

              const transactionResponse = await axiosPublic.post("/transactions", sendMoney  );
              console.log(transactionResponse.data);
              Swal.fire({
                title: `${amount} BDT has been successfully sent to ${mobile}`,
                // text: 'Do you want to continue',
                icon: 'success',
                confirmButtonText: 'Cool',
                confirmButtonColor: "#87CEEB"
              })
            } else {
              alert('Invalid PIN');
            }
          } catch (error) {
            alert('An error occurred');
          }
          refetch()

    };

    // CASH IN --------->
    const handleCashIn = async (e) => {
        e.preventDefault()
        const form = e.target;
        const mobile = form.mobile.value;
        const userMobile = user.mobile
        const name = user.name
        const id = user._id
        const agent = users.find(item => item.mobile === mobile)
        if(!agent){
            alert('Enter Valid agent No.')
            return
        }
        const request = "cashIn"
        const status = "Pending"
        const type = "cashIn"
        const amount = parseFloat(form.amount.value);
        const email = user.email
        const cashIn = { agent, amount, request, type, email, id, name, status, userMobile };

        const PIN = form.PIN.value;
        
        try {
            const response = await axiosPublic.post('/validate-pin', { name, PIN });
      
            console.log("see if im triggering");
            if (response.data.valid) {
              const transactionResponse = await axiosPublic.post("/cash-in", cashIn  );
              console.log(transactionResponse.data);
              Swal.fire({
                title: 'Cash In request sent to the agent and waiting for approval',
                // text: 'Do you want to continue',
                icon: 'success',
                confirmButtonText: 'Cool',
                confirmButtonColor: "#87CEEB"
              })
            } else {
              alert('Invalid PIN');
            }
          } catch (error) {
            alert('An error occurred');
          }
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
        const amount = parseFloat(form.amount.value);
        if(user.balance< amount){
            return alert('You do not have sufficient amount to cash-out')
        }
        const status = "Pending"
        const request = "cashOut"
        const type = "cashOut"
        const email = user.email
        const userMobile = user.mobile
        const PIN = form.PIN.value;
        const id = user._id
        
        const cashOut = { agent, amount, request, type, id, email, name, status, userMobile };

        try {
            const response = await axiosPublic.post('/validate-pin', { name, PIN });
      
            if (response.data.valid) {
              const transactionResponse = await axiosPublic.post("/cash-out", cashOut  );
              console.log(transactionResponse.data);
              Swal.fire({
                title: 'Cash Out request sent to the agent and waiting for approval',
                // text: 'Do you want to continue',
                icon: 'success',
                confirmButtonText: 'Cool',
                confirmButtonColor: "#87CEEB"
              })
            } else {
              alert('Invalid PIN');
            }
          } catch (error) {
            alert('An error occurred');
          }
    };

    return (
        <div className=" mx-auto">

            <div className="  ">

                <div className="text-center">
                    <h2 className="text-2xl"> {user?.name}</h2>
                    <h2 className="text-2xl"> {user?.email}</h2>
                    <h2 className="text-2xl"> {user?.mobile}</h2>
                    <h2 className=" text-4xl">Balance: {user?.balance}</h2>

                    <div className="mx-auto flex justify-center mt-10">
                        {user?.status === "Pending" ? (
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
