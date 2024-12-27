import { useEffect, useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MdDelete, MdEditSquare, MdOutlineLocationOn } from "react-icons/md";

function Theatres() {
  let [theatres, setTheatres] = useState([]);

  async function getTheatres() {
    let res = await axios.get("http://localhost:4000/admin-api/get-theatres");
    setTheatres(res.data.payload);
  }

  useEffect(() => {
    getTheatres();
  }, []);

  async function edit() {
    let res = await axios.put("http://localhost:4000/admin-api/update-theatre");
    console.log(res.data.message);
    getTheatres();
  }

  async function deletefunc(id) {
    let res = await axios.delete(
      `http://localhost:4000/admin-api/remove-theatre/${id}`
    );
    console.log(res.data.message);
    getTheatres();
  }

  return (
    <div className="p-3 font-radio">
      <Button className="absolute right-0 mr-6">
        <Link to="add-theatre">Add New</Link>
      </Button>
      <h1 className="text-center text-4xl mb-6">Theatres</h1>
      {theatres.map((theatre) => (
        <Card className="m-3" key={theatre.theatreId}>
          <CardHeader>
            <CardTitle>
              {theatre.name}
              <MdDelete
                onClick={() => deletefunc(theatre.theatreId)}
                className="cursor-pointer inline ms-5 text-red-600"
              />
              <MdEditSquare
                onClick={edit}
                className="cursor-pointer inline ms-5 text-blue-500"
              />
            </CardTitle>
          </CardHeader>
          <CardFooter className="border-t-2 p-3">
            <p className="flex">
              <MdOutlineLocationOn />
              {theatre.location}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Theatres;
