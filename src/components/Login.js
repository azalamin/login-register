import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "./Loading";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (user) => {
    setLoading(true);
    const url = `http://localhost:5000/login?username=${user?.username}&password=${user?.password}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 404) {
          toast.error(`${data.message}`);
        } else {
          toast.success("Login successful!");
          reset();
        }
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full max-w-xs"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is Required",
                  },
                  minLength: {
                    value: 4,
                    message: "At least length should be 4",
                  },
                })}
              />
              <label className="label">
                {errors.username?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.username.message}
                  </span>
                )}
                {errors.username?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <Link
                to="/resetPassword"
                className="mb-3 text-accent hover:text-secondary"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              className="btn w-full max-w-xs text-white"
              type="submit"
              value="Login"
            />
          </form>
          <p>
            <small>
              Don't have an account?
              <Link className="text-primary" to="/signup">
                Create New Account
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
