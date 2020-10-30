import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";

import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={[classes.Hamburger_icon, classes.MobileOnly].join(" ")}>
            <i
                className="fa fa-bars"
                aria-hidden="true"
                onClick={props.sidebarOpen}
            ></i>
        </div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;
