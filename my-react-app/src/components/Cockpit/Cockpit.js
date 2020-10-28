import React, { useEffect, useRef, useContext } from "react";

import classes from "./Cockpit.css";
import AuthContext from "../../context/auth-context";

const cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);
    console.log(authContext.authenticated);

    // Function Component React Function executes when Component is Rendered
    useEffect(() => {
        console.log("[Cockpit.js] useEffect....");

        toggleBtnRef.current.click(); //click togglebtn

        // If you want to do clean up when the component is unmounted add below function to useeffect
        return () => {
            console.log("[Cockpit.js] Cleanup....");
        };
    }, []); //blank [] will render component only once. We can pass dependency in [] where it will render on passed dependency only

    let assignedClasses = [];
    let btnClass = "";

    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red);
    }

    if (props.personsLength <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(" ")}>List of Persons</p>

            <button
                className={btnClass}
                onClick={props.clicked}
                ref={toggleBtnRef}
            >
                Toggle Persons
            </button>

            <button onClick={authContext.login}>Login</button>
        </div>
    );
};

export default React.memo(cockpit); //memo is used when component is static, to avoid re render of virtual dom
