import {Navigate, useLocation} from "react-router-dom";

const PrivateRoute = ({component: Component, auth, ...rest}) => {
    const { state } = useLocation();
    if (auth) {
        return  <Component {...{state}} {...{auth}}/>
    }
    return <Navigate to="/" />
}

export default PrivateRoute;