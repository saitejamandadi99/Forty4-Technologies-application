import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      geo: {
        latitude: "",
        longitude: "",
      },
    },
  });

  const navigate = useNavigate();
  const { id } = useParams(); // check if editing

  // fetch existing user if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/users/${id}`)
        .then((res) => {
          // ✅ backend sends { message, user }, so we need res.data.user
          setFormData((prev) => ({
            ...prev,
            ...res.data.user,
            address: {
              ...prev.address,
              ...res.data.user.address,
              geo: {
                ...prev.address.geo,
                ...res.data.user.address.geo,
              },
            },
          }));
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  // handle nested input updates
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prev) => {
        let updated = { ...prev };
        let obj = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          obj[keys[i]] = { ...obj[keys[i]] };
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = value;
        return updated;
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update user
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/users/${id}`,
          formData
        );
      } else {
        // Create new user
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/users`,
          formData
        );
      }
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error while saving user. Check console for details.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit User" : "Create User"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Company</label>
          <input
            type="text"
            name="company"
            className="form-control"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <h5>Address</h5>
        <div className="mb-3">
          <label>Street</label>
          <input
            type="text"
            name="address.street"
            className="form-control"
            value={formData.address.street}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>City</label>
          <input
            type="text"
            name="address.city"
            className="form-control"
            value={formData.address.city}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>State</label>
          <input
            type="text"
            name="address.state"
            className="form-control"
            value={formData.address.state}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Zip Code</label>
          <input
            type="text"
            name="address.zipCode"
            className="form-control"
            value={formData.address.zipCode}
            onChange={handleChange}
          />
        </div>

        {/* Geo */}
        <h5>Geo Location</h5>
        <div className="mb-3">
          <label>Latitude</label>
          <input
            type="text"
            name="address.geo.latitude"
            className="form-control"
            value={formData.address.geo.latitude}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Longitude</label>
          <input
            type="text"
            name="address.geo.longitude"
            className="form-control"
            value={formData.address.geo.longitude}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
