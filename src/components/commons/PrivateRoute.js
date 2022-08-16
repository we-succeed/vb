import { Navigate} from "react-router-dom";

const PrivateRoute = ({auth, children}) => {
    if (auth) {
        return children
    }
    return <Navigate to="/" />
}

export default PrivateRoute;