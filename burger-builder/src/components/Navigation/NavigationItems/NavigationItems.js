import React from "react";
import classes from "./NavigationItems.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
    <div>
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active={true}>
                Burger Builder
            </NavigationItem>
            <NavigationItem link="/">Checkout</NavigationItem>
        </ul>
    </div>
);

export default navigationItems;
