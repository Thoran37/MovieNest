import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

function Users() {
  let [users, setUsers] = useState([]);

  async function getUsers() {
    let res = await axios.get(
      "https://movie-nest-three.vercel.app/admin-api/get-users"
    );
    setUsers(res.data.payload);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-3 font-radio">
      <h1 className="text-center text-4xl mb-6">Users</h1>
      {users.map((user) => (
        <Card className="m-3">
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user.email}</p>
            <p>{user.phno}</p>
          </CardContent>
          <CardFooter className="border-t-2">
            <p>Registered on {user.date}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Users;
