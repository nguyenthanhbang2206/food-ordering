import { Admin } from "../Admin/Admin";
import { CreateRestaurant } from "../Restaurant/CreateRestaurant";

export const AdminRoutes = () => {
  return (
    <div>
     
      <Routes>
        <Route path="/*" element={false ? <CreateRestaurant/> : <Admin/>} />
          
      </Routes>
    </div>
  );
}