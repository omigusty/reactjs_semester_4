import React from "react";
import AddBook from "./components/AddBook";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProtectedAdmin from "./components/ProtectedAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/admin" element={<ProtectedAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}
