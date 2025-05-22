// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { Admin } from "../Admin/Admin";
// import { CustomerRoutes } from "../../Routes/CustomerRoutes";
// import { AdminRoutes } from "../AdminRoutes/AdminRoutes";
// export const Routers = () => {
//   return (
//     <Routes>
//       <Route path="/admin/restaurant/*" element={<AdminRoutes />} />
//       <Route path="/*" element={<CustomerRoutes />} />
//     </Routes>
//   );
// };

// src/components/Routers/Routers.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { CustomerRoutes } from "../../Routes/CustomerRoutes";
import { AdminRoutes } from "../AdminRoutes/AdminRoutes";
import { PrivateRoute } from "../PrivateRoute"; // 👈 Thêm dòng này

export const Routers = () => {
  return (
    <Routes>
      <Route
        path="/admin/restaurant/*"
        element={
          <PrivateRoute>
            <AdminRoutes />
          </PrivateRoute>
        }
      />
      <Route path="/*" element={<CustomerRoutes />} />
    </Routes>
  );
};
