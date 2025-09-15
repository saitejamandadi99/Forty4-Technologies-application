import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UserCard = ({ user, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`);
        onDelete(user._id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="card shadow-sm m-3 p-3 col-md-5 col-lg-3">
      <h5 className="card-title">{user.name}</h5>
      <p className="card-text"><strong>Email:</strong> {user.email}</p>
      <p className="card-text"><strong>Company:</strong> {user.company}</p>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => window.open(`/user/${user._id}`, "_blank")}
        >
          View
        </button>
        <button
          className="btn btn-outline-warning btn-sm"
          onClick={() => navigate(`/edit/${user._id}`)}
        >
          Edit
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
