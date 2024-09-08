import { useForm } from "react-hook-form";
// import { axiosWithToken } from "./axiosWithToken";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddTheatre() {
  let { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  let [err, setErr] = useState("");

  async function addTheatre(theatreObj) {
    theatreObj.theatreId = Date.now();
    let res = await axios.post(
      "http://localhost:4000/admin-api/add-theatre",
      theatreObj
    );
    if (
      res.data.message ===
      "New theatre added and linked to theatres and showtimes"
    )
      navigate("/admin/theatres");
    else setErr(res.data.payload);
  }

  return (
    <div className="w-screen container mt-5">
      {<p className="text-red-600">{err}</p>}
      <form
        onSubmit={handleSubmit(addTheatre)}
        className="p-5 bg-slate-200 rounded space-y-2 shadow-lg mb-5"
      >
        <p className="text-3xl font-medium text-center">Add Theatre</p>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-lg">Name</Label>
            <Input type="text" className="w-64" {...register("name")} />
          </div>
          <div>
            <Label className="text-lg mb-0">Theatre Image</Label>
            <Input type="url" className="w-64" {...register("img")} />
          </div>
          <div>
            <Label className="text-lg mb-0">Theatre Location</Label>
            <Input type="text" className="w-64" {...register("location")} />
          </div>
          <div>
            <Label className="text-lg mb-0">Seating Capacity</Label>
            <Input
              type="number"
              className="w-64"
              {...register("seatingCapacity")}
            />
          </div>
        </div>
        <Button>Submit</Button>
      </form>
    </div>
  );
}
