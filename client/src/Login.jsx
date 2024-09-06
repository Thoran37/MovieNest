import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { loginThunk } from "./redux/userSlice";

export default function Login() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let dispatch = useDispatch();
  async function login(obj) {
    dispatch(loginThunk(obj));
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">Login</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(login)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <div>
              {errors.username?.type === "required" && (
                <p className="text-red-500 inline me-0.5">*</p>
              )}
              <Label>Username</Label>
            </div>
            <Input
              className="col-span-3"
              {...register("username", { required: true })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div>
              {errors.username?.type === "required" && (
                <p className="text-red-500 inline me-0.5">*</p>
              )}
              <Label>Password</Label>
            </div>
            <Input
              type="password"
              className="col-span-3"
              {...register("password", { required: true })}
            />
          </div>
          <DialogFooter>
            <Button>Login</Button>
          </DialogFooter>
        </form>
        <Button>Login with Google</Button>
        <Button>Forgot Password ?</Button>
      </DialogContent>
    </Dialog>
  );
}
