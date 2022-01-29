import { useLocation } from "react-router-dom";

function useToken() {
	const location = useLocation();
	if (location.state.token) return location.state.token;
	else return 0;
}

export default useToken;
