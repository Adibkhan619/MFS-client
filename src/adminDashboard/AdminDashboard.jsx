import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAllUsers from "../hooks/useAllUsers";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    // const [moneyToAdd, setMoneyToAdd] = useState('');
    const axiosPublic = useAxiosPublic();
    const [users, , refetch] = useAllUsers();

    const makeAgent = (item) => {
        axiosPublic
            .patch(`/users/${item._id}`, {
                money: parseFloat(10000),
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: `${
                            item.displayName || item.name
                        } is an Agent Now!`,
                        showClass: {
                            popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `,
                        },
                        hideClass: {
                            popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `,
                        },
                    });
                }
            });
    };

    const handleActivate = (item) => {
        axiosPublic
            .patch(`/users/activate/${item._id}`, {
                status: "Active",
                balance: parseFloat(40),
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: `${item.name} is Activated and 40 BDT has been credited into the account`,
                        // text: 'Do you want to continue',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: "#87CEEB"
                      })
                    refetch();
                }
            });
    };

    const handleBlock = (item) => {
        axiosPublic
            .patch(`/users/block/${item._id}`, {
                status: "Blocked",
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: `${item.name} has been Blocked`,
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: "#87CEEB"
                      })
                    refetch();
                }
            });
    };

    return (
        <div>
            <h1>Hello Admin</h1>
            <Link to="/transactions"><button className="btn">Transactions</button></Link>
            
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {users.map((item, idx) => (
                            <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>{item.role}</td>
                                <td>
                                    {item.status === "Pending" && (
                                        <p className="text-orange-400 p-2 bg-slate-100 text-center font-bold">Pending</p>
                                    )} 
                                     {
                                     item.status === "Active" &&(
                                        <p className="text-green-400 p-2 bg-slate-100 text-center font-bold">Active</p>
                                    )}
                                     {
                                     item.status === "Blocked" &&(
                                        <p className="text-red-400 p-2 bg-slate-100 text-center font-bold">Blocked</p>
                                    )}

                             

                                </td>
                                {item?.status === "Pending" || item?.status ==="Blocked" ? (
                                    <td>
                                        <button
                                            onClick={() => handleActivate(item)}
                                            className="btn bg-green-300"
                                        >
                                            Activate
                                        </button>
                                    </td>
                                )
                                :
                                (
                                    <td>
                                        <button
                                            onClick={() => handleBlock(item)}
                                            className="btn btn-outline text-red-400"
                                        >
                                            Block
                                        </button>
                                    </td>
                                )
                               
                            }
                                {item?.role === "User" && (
                                    <td>
                                        <button
                                            onClick={() => makeAgent(item)}
                                            className="btn btn-outline text-sky-400"
                                        >
                                            Make Agent
                                        </button>
                                    </td>
                                )}

                                <td></td>
                            </tr>
                        ))}
                        {/* row 2 */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
