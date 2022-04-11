import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import Navbar from "./navbar";

const UserManagement = () => {

    const [data, setUsers] = useState([]);

    const userData = async () => {
        const res = await axios.get('http://localhost:3000/users/')
        console.log(res.data);
        setUsers(res.data)
    }

    useEffect(() => {
        //passing getData method to the lifecycle method
        userData()
    }, [])


    const [dataRole, setRoles] = useState([]);

    const roleData = async () => {
        const res = await axios.get('http://localhost:3000/roles/')
        console.log(res.data);
        setRoles(res.data)
    }

    useEffect(() => {
        //passing getData method to the lifecycle method
        roleData()
    }, [])


    return (
        <div>
            <Navbar></Navbar>
               <h2>Users List</h2>
                          <div>  
                        <table class="ui celled table">
                            <thead class="">
                                <tr class="">
                                    <th class="">User ID</th>
                                    <th class="">Username</th>
                                    <th class="">Password</th>
                                    <th class="">Name</th>
                                    <th class="">Role ID</th>
                                    <th class="">Created Date</th>
                                    <th class="">Updated Date</th>

                                </tr>
                            </thead>
                            <tbody class="">
                                {
                            data.map((user) => {
                    return (
                                <tr class="" key={user._id}>
                                    <td class="">{user._id}</td>
                                    <td class="">{user.username}</td>
                                    <td class="">{user.password}</td>
                                    <td class="">{user.name}</td>
                                    <td class="">{user.roleId}</td>
                                    <td class="">{user.createdAt}</td>
                                    <td class="">{user.updatedAt}</td>
                                </tr>
                                 )
                                })
                            }
                            </tbody>
                        </table>
                        </div>
                   
            
        </div>
    )
}

export default UserManagement;