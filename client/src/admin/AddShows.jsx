import { useForm } from "react-hook-form";
// import { axiosWithToken } from "./axiosWithToken";
import { useLocation, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function AddShows() {
  let { register, handleSubmit, setValue } = useForm();
  let navigate = useNavigate();
  let [err, setErr] = useState("");
  const { state } = useLocation();
  let [showTheatreForm, setTheatreForm] = useState(false);
  let [theatres, setTheatres] = useState([]);

  async function getTheatres() {
    let res = await axios.get("http://localhost:4000/admin-api/get-theatres");
    if (res.data.message !== "Theatres fetched successfully")
      setErr(res.data.message);
    else setTheatres(res.data.payload);
  }

  useEffect(() => {
    getTheatres();
  }, []);

  async function addShows(obj) {
    obj.movieId = state.movieId;
    obj.title = state.title;
    obj.blockedSeats = [];
    let res = await axios.post(
      "http://localhost:4000/admin-api/add-shows",
      obj
    );
  }

  return (
    <div className="container m-5 bg-slate-200 rounded space-y-2 shadow-lg">
      {<p className="text-red-600">{err}</p>}
      <p className="text-3xl font-medium text-center">Add Shows</p>
      <div>
        <Label className="text-lg">Title</Label>
        <Input
          className="w-64 font-bold text-lime-600 text-lg"
          disabled
          defaultValue={state.title}
        />
      </div>
      <Button onClick={() => setTheatreForm(true)}>Add Theatre</Button>
      {showTheatreForm && (
        <form
          onSubmit={handleSubmit(addShows)}
          className="p-5 bg-slate-200 rounded space-y-2 shadow-2xl shadow-slate-500 mb-5"
        >
          <Label className="text-lg">Theatre Name</Label>
          <Select onValueChange={(value) => setValue("theatreId", value)}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select Theatre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {theatres.map((th, ind) => (
                  <SelectItem key={ind} value={th.theatreId}>
                    {th.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input type="hidden" {...register("theatreId")} />
          <Label className="text-lg">Date</Label>
          <Input className="w-64" type="date" {...register("date")} />
          <Label className="text-lg">Show Timing</Label>
          <Input className="w-64" type="text" {...register("time")} />
          <Button type="submit">Submit</Button>
        </form>
      )}
    </div>
  );
}
