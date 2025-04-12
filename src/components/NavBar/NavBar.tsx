import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const token = localStorage.getItem("user");
  const user = token ? JSON.parse(token) : null;

  const [isUserHidden, setIsUserHidden] = useState("hidden");

  const handleUserOpen = () => {
    setIsUserHidden("visible");
  };
  const handleUserClose = () => {
    setIsUserHidden("hidden");
  };
  function logOut() {
    localStorage.removeItem("user");

    window.location.reload();
  }

  return (
    <>
      <div className="nav py-3 shadow bg-slate-100 fixed top-0 left-0 right-0 z-50">
        <div className="container flex items-center justify-between mx-auto gap-10 px-3">
          <div className="logo text-2xl font-bold text-green-600">
            <Link to={"/"}>To-Do</Link>
          </div>

          <ul className="flex items-center gap-5  md:m-0 ">
            {!token && (
              <>
                <li></li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-green-600 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to={"/login"}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <>
                <div
                  onClick={() => {
                    if (isUserHidden === "hidden") {
                      handleUserOpen();
                    } else {
                      handleUserClose();
                    }
                  }}
                  className="cursor-pointer w-8 h-8  rounded-full bg-gray-700 text-white flex justify-center items-center relative"
                >
                  <div
                    className={`absolute bg-gray-500 top-10 z-50 w-52 right-0 md:right-0 rounded-md ${isUserHidden} `}
                  >
                    <p className="p-4 flex justify-center items-center ">
                      {user.name}
                    </p>
                    <Link
                      to={"/login"}
                      className="p-4 flex justify-center items-center "
                      onClick={logOut}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
