import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserCard from "../../components/userCard";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>User Dashboard</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate("/create")}
        >
          + Create User
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="row mt-3">
            {users.length === 0 ? (
                    <p className="text-center text-muted">No users found.</p>
            ) : (
            users.map((user) => (
                    <UserCard key={user._id} user={user} onDelete={handleDelete} />
            ))
        )}
      </div>

    </div>
  );
};

export default UserDashboard;
