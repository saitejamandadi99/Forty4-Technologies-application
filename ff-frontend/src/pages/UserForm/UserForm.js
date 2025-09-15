import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: { street: "", city: "", state: "", zipCode: "", geo: { latitude: "", longitude: "" } }
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [field, subfield] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [subfield]: value }
      }));
    } else if (name.includes("geo.")) {
      const [, subfield] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, geo: { ...prev.address.geo, [subfield]: value } }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, formData);
    navigate("/");
  };

  return (
    <div className="container my-4">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <input className="form-control" name="name" placeholder="Name" onChange={handleChange} />
        <input className="form-control" name="email" placeholder="Email" onChange={handleChange} />
        <input className="form-control" name="phone" placeholder="Phone" onChange={handleChange} />
        <input className="form-control" name="company" placeholder="Company" onChange={handleChange} />
        <input className="form-control" name="address.street" placeholder="Street" onChange={handleChange} />
        <input className="form-control" name="address.city" placeholder="City" onChange={handleChange} />
        <input className="form-control" name="address.state" placeholder="State" onChange={handleChange} />
        <input className="form-control" name="address.zipCode" placeholder="Zip Code" onChange={handleChange} />
        <input className="form-control" name="geo.latitude" placeholder="Latitude" onChange={handleChange} />
        <input className="form-control" name="geo.longitude" placeholder="Longitude" onChange={handleChange} />
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default UserForm;
