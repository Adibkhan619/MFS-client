import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAllUsers from "../hooks/useAllUsers";

const AdminDashboard = () => {
    // const [moneyToAdd, setMoneyToAdd] = useState('');
    const axiosPublic = useAxiosPublic()
    const [users, loading, refetch] = useAllUsers()
    const userData = useLoaderData()
    console.log(userData);


    const makeAgent = (item) => {
        axiosPublic.patch(`/users/${item._id}`, {
            money: parseFloat(10000)}
        )
        .then(res =>{
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    title: `${user.displayName || user.name} is an Admin Now!`,
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
        })
    }








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
                    {
                        userData.map((item, idx) => <tr key={item._id}>
                        <th>{idx + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>{item.role}</td>
                        <td>{item.status}</td>
                       
                    
                        {
                            item?.status ==="Pending" ?  (<td><button className="btn ">Activate</button></td>) : <td>Active</td>
                        }
                    
                    {
                        item?.role === "user" && (
                            <td><button onClick={() => makeAgent(item)} className="btn">Make Agent</button></td>
                        ) 
                    }
                  
                        <td></td>
                      </tr>)
                    }
                    {/* row 2 */}
                  </tbody>
                </table>
              </div>
           
        </div>
    );
};

export default AdminDashboard;