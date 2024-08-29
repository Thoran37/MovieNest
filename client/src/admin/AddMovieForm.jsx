import { useForm } from "react-hook-form";
// import { axiosWithToken } from "./axiosWithToken";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function AddMovieForm() {
  let { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  let [err, setErr] = useState("");

  async function addMovie(movieObj) {
    movieObj.movieId = Date.now();
    // const keys = Object.keys(movieObj);
    // console.log(keys);
    // const form = new FormData();
    // for (let i in movieObj) form.append(keys[i], movieObj[i]);
    // form.append("picturePath", {
    //   name: movieObj.img[0],
    //   type: "image/png",
    // });
    // form.append("hello", movieObj.movieId);
    // console.log(movieObj);
    // console.log(form.getAll());
    let res = await axios.post(
      "http://localhost:4000/admin-api/addMovie",
      movieObj
    );
    console.log(res);
    if (
      res.data.message ===
      "New Movie added and linked to theatres and showtimes"
    )
      navigate("/admin/movies");
    else setErr(res.data.payload);
  }

  return (
    <div className="w-screen container mt-5">
      {<p className="text-red-600">{err}</p>}
      <form
        onSubmit={handleSubmit(addMovie)}
        className="p-5 bg-slate-200 rounded space-y-2 shadow-lg mb-5"
      >
        <p className="text-3xl font-medium text-center">Add Movie</p>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-lg">Title</Label>
            <Input type="text" className="w-64" {...register("title")} />
          </div>
          <div>
            <Label className="text-lg">Language</Label>
            <Select>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-lg mb-0">Movie Image</Label>
            <Input type="file" className="w-64" {...register("img")} />
          </div>
          <div>
            <Label className="text-lg mb-0">Movie Big Poster</Label>
            <Input type="file" className="w-64" {...register("poster")} />
          </div>
          <div>
            <Label className="text-lg mb-0">Genre</Label>
            <Input type="text" className="w-64" {...register("genre")} />
          </div>
          <div>
            <Label className="text-lg mb-0">Director</Label>
            <Input type="text" className="w-64" {...register("director")} />
          </div>
          <div>
            <Label className="text-lg mb-0">Producer</Label>
            <Input type="text" className="w-64" {...register("producer")} />
          </div>
          <div>
            <Label className="text-lg mb-0">Runtime (in mins)</Label>
            <Input type="text" className="w-64" {...register("duration")} />
          </div>
          <div>
            <Label className="text-lg mb-0">Start Date</Label>
            <Input type="date" className="w-64" {...register("start")} />
          </div>
          <div>
            <Label className="text-lg mb-0">End Date</Label>
            <Input type="date" className="w-64" {...register("end")} />
          </div>
          <div>
            <Label className="text-lg mb-0">Censorship</Label>
            <Input type="text" className="w-64" {...register("censor")} />
          </div>
          <div>
            <Label className="text-lg mb-0">Trailer</Label>
            <Input type="file" className="w-64" {...register("trailer")} />
          </div>
          <div>
            <Label className="text-lg mb-0">Rating</Label>
            <Input type="text" className="w-64" {...register("rating")} />
          </div>
          <div>
            <Label className="text-lg mb-0">Cast</Label>
            <Textarea type="text" className="w-64" {...register("cast")} />
          </div>
        </div>
        <div>
          <Label className="text-lg mb-0">Description</Label>
          <Textarea type="text" className="h-36" {...register("desc")} />
        </div>
        <Button>Submit</Button>
      </form>
    </div>
  );
}
