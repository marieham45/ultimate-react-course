import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/FakeAuthContext.jsx";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated])

    if (isAuthenticated) return children
};

export default ProtectedRoute;