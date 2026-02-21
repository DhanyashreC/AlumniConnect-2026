import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar"; 

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* This is what was missing/crashing in your screenshot */}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;