import { Routes, Route } from "react-router-dom";
import React from "react";
import Contact from "../Components/Contact";
import SidebarWithHeader from "../Components/Common/Sidebar";
import Dashboard from "../Components/Dashboard";

function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SidebarWithHeader>
            <Dashboard />
          </SidebarWithHeader>
        }
      />
      <Route
        path="/contacts"
        element={
          <SidebarWithHeader>
            <Contact />
          </SidebarWithHeader>
        }
      />
    </Routes>
  );
}

export default AllRoutes;
