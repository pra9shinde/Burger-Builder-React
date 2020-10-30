import React from "react";
import classes from "./Logo.css";
import burgerLog from "../../assets/images/burger-logo.png";

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLog} alt="Burger Builder Logo" />
    </div>
);

export default logo;
