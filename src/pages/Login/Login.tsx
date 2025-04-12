import { useState } from "react";
import USERS from "../../data/users.json";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { users } = USERS;
  const [error, setErorr] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const navigate = useNavigate();

  function handleSubmit(values: { email: string; password: string }) {
    const toastId = toast.loading("Loading...");
    if (!values.email || !values.password) {
      setErorr("Please fill in all fields");
      return;
    } else {
      const user = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );

      if (user) {
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successful", { id: toastId });
        setErorr("");
        navigate("/");
        }else{
          sessionStorage.setItem('user',JSON.stringify(user))
          toast.success("Login successful", { id: toastId });
        setErorr("");
        navigate("/");
        }
        
      } else {
        toast.error("Invalid email or password", { id: toastId });
        setErorr("Invalid email or password");
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="w-1/2 mx-auto border-2 border-gray-300 rounded-lg p-5 mt-10 shadow-md">
        <h2 className="my-5">Sign In Now :</h2>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="email ">
            <input
              className=" form-control "
              type="email"
              placeholder="Enter Your email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-400 mt-1 text-sm">
                *{formik.errors.email}
              </p>
            )}
          </div>

          <div className="password">
            <input
              className=" form-control"
              type="password"
              placeholder="Enter Your Password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-400 mt-1 text-sm">
                *{formik.errors.password}
              </p>
            )}
          </div>
          {error && <p className="text-red-400 mt-1 text-sm">*{error}</p>}

          <div className="flex items-center">
            <div className="flex items-center gap-1">
            <input type="checkbox" checked={rememberMe} onChange={()=>{
              setRememberMe(!rememberMe)
            }} />
            <span>remember me</span>
            </div>
            <button
            className="btn ml-auto bg-blue-500 hover:bg-blue-400"
            type="submit"
          >
            Sign in
          </button>
          </div>
        </form>
      </div>
    </>
  );
}
