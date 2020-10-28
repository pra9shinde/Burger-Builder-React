import React from "react";

// COntexts are like sessions you can access the value set in any component

const authContext = React.createContext({
    authenticated: false,
    login: () => {},
});

export default authContext;
