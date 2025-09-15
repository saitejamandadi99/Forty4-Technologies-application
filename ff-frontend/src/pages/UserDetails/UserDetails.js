import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}`).then((res) => {
      setUser(res.data.user);
    });
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container my-4">
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Company:</strong> {user.company}</p>
      <p><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.state}, {user.address.zipCode}</p>
      <p><strong>Geo:</strong> Lat {user.address.geo.latitude}, Lng {user.address.geo.longitude}</p>
    </div>
  );
};

export default UserDetail;
