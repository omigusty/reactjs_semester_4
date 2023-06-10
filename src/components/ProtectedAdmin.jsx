import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddBook from "./AddBook";

export default function ProtectedAdmin() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <AddBook />
      </div>
    </>
  );
}
