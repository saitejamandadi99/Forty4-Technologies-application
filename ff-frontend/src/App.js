import {Routes, Route } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import UserForm from "./pages/UserForm/UserForm";
import UserDetails from "./pages/UserDetails/UserDetails";

function App() {
  return (

      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/create" element={<UserForm />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>

  );
}

export default App;
