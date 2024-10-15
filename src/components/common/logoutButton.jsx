import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// created logout button to go to home page with buttons disabled 

function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
        </button>
    );
}

export default LogoutButton;