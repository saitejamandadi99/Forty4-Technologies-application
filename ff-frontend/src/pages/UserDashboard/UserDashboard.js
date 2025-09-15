import {useState,useEffect} from 'react'; 
import axios from 'axios'; 



const UserDashboard = () =>{

    const [userData, setUserData] = useState([]);
    const [isLoading,setIsLoading] = useState(false); 
    const [error,setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const fetchData = async () =>{
        setIsLoading(true);
        try {
            const url = `${process.env.REACT_APP_API_URL}/api/users`;
            const response = await axios.get(url);
            setUserData(response.data.users);
            setSuccess(response.data.message);
            setError(null);
            console.log(response.data);
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <div>
            <h1>User Dashboard</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{color:'red'}}>Error: {error}</p>}
            {success && <p style={{color:'green'}}>Success: {success}</p>}
        </div>
    )
}

export default UserDashboard