import {useState,useEffect} from 'react'; 
import axios from 'axios'; 
import env from 'react-dotenv'; //check this once for more details


const UserDashboard = () =>{

    const [userData, setUserData] = useState([]);
    const [isLoading,setIsLoading] = useState(false); 
    const [error,setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const fetchData = async () =>{
        setIsLoading(true);
        try {
            const url = env.REACT_APP_API_URL || 'http://localhost:5000/api/users';
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
    })
}

export default UserDashboard