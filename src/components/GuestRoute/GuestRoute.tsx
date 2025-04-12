import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }: { children: ReactNode }) {
  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}
