import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAllUsers from "../hooks/useAllUsers";

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
                    refetch();
                }
            });
    };

    return (
        <div>
            <h1>Hello Admin</h1>

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
                                    {item.status === "Pending" ? (
                                        <p className="text-pink-400">Pending</p>
                                    ) : (
                                        <p className="text-green-400">Active</p>
                                    )}
                                </td>
                                {item?.status === "Pending" && (
                                    <td>
                                        <button
                                            onClick={() => handleActivate(item)}
                                            className="btn "
                                        >
                                            Activate
                                        </button>
                                    </td>
                                )}
                                {item?.role === "user" && (
                                    <td>
                                        <button
                                            onClick={() => makeAgent(item)}
                                            className="btn"
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
