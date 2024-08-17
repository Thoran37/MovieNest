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

export default function Login() {
  let { register, handleSubmit } = useForm();

  async function login(obj) {
    console.log(obj);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">Login</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(login)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Username</Label>
            <Input className="col-span-3" {...register("username")} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right"> Password </Label>
            <Input
              type="password"
              className="col-span-3"
              {...register("password")}
            />
          </div>
          <DialogFooter>
            <Button>Login with Google</Button>
            <Button>Login</Button>
            <Button>Forgot Password?</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
