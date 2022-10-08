import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                navigate={navigate}
                location={location}
                params={params}
            />
        );
    }

    return ComponentWithRouterProp;
}
