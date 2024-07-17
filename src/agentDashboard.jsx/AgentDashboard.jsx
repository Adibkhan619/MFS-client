import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useCashIn from "../hooks/useCashIn";
import { useState } from "react";
import useAllUsers from "../hooks/useAllUsers";
import useCashOut from "../hooks/useCashOut";

const AgentDashboard = ({ currentUser }) => {
    console.log(currentUser);
    const axiosPublic = useAxiosPublic()
    const [cashIn, ,refetch] = useCashIn();
    const [cashOut, , ] = useCashOut()
    const [users, ,] = useAllUsers()
    console.log(users);
    const [moneyChange, setMoneyChange] = useState("")
    console.log(cashIn);

    const user = users.find(item => item._id === currentUser?._id  )
    console.log(user);

    const myCashInReq = cashIn.filter(
        (item) => item?.agent?.name === user?.name
    );
    console.log(myCashInReq);

    const myCashOutReq = cashOut.filter(
        (item) => item?.agent?.name === user?.name
    );
    console.log(myCashOutReq);

    // CASH IN REQ----->
    const handleCashInReq = async(item) => {
        console.log(item.id, 'amar id');
        const amount = parseFloat(item.amount);
        setMoneyChange(amount)

        axiosPublic.patch(`/send-money/${item.id}`, 
            {moneyChange: parseFloat(moneyChange)},
        )
        axiosPublic.patch(`/reduce-money/${user._id}`, 
            {moneyChange: parseFloat(-moneyChange)},
        )
      const transactionResponse = await axiosPublic.patch(`/cash-in/${item._id}`, 
        {
            status: "Approved"
        }
        );
      console.log(transactionResponse.data);
      Swal.fire({
        title: `${item.amount} BDT has been successfully sent to ${item.userMobile}`,
        // text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Cool',
        confirmButtonColor: "#87CEEB"
      })
      refetch()
    }


        // CASH OUT REQ----->
        const handleCashOutReq = async(item) => {
            console.log(item.id, 'amar id');
            const amount = parseFloat(item.amount);
            setMoneyChange(amount)
    
            axiosPublic.patch(`/send-money/${user._id}`, 
                {moneyChange: parseFloat(moneyChange)},
            )

            // swap problem can occure

            axiosPublic.patch(`/reduce-money/${item?.id}`, 
                {moneyChange: parseFloat(-moneyChange)},
            )
          const transactionResponse = await axiosPublic.patch(`/cash-out/${item?._id}`, 
            {
                status: "Approved"
            }
            );
          console.log(transactionResponse.data);
          Swal.fire({
            title: `${item.amount} BDT has been successfully sent to ${item.userMobile}`,
            // text: 'Do you want to continue',
            icon: 'success',
            confirmButtonText: 'Cool',
            confirmButtonColor: "#87CEEB"
          })
          refetch()
        }

    return (
        <div className="text-center mx-auto mt-5">
            <h1 className="text-2xl">{user?.role}</h1>
            <h1 className="text-3xl">{user?.name}</h1>
            <h1 className="text-2xl">{user?.email}</h1>

            <h1 className="text-4xl">Balance: {user?.balance}</h1>

        <div className="lg:flex justify-center gap-5 my-10">
                {/* cash-in */}
                <div className="overflow-x-auto card border p-5 shadow-md">
                <h1 className="text-3xl text-left">Cash In Requests</h1>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Amount </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {myCashInReq.map((item, idx) => (
                            <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.userMobile}</td>
                                <td>{item.amount}</td>
                                <td>{item.status}</td>
                                <td>{
                                    item.status === "Pending" && <button className="btn" onClick={() => handleCashInReq(item)}>Approve</button>
                                            }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* cash-Out */}
            <div className="overflow-x-auto card border p-5 shadow-md">
                <h1 className="text-3xl text-left">Cash Out Requests</h1>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Amount </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {myCashOutReq.map((item, idx) => (
                            <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.userMobile}</td>
                                <td>{item.amount}</td>
                                <td>{item.status}</td>
                                <td>{
                                    item.status === "Pending" && <button className="btn" onClick={() => handleCashOutReq(item)}>Approve</button>
                                            }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
        </div>
    );
};

export default AgentDashboard;
