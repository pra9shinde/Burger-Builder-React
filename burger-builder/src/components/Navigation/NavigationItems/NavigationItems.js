import React from 'react';
import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <div>
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact>
                Burger Builder
            </NavigationItem>
            <NavigationItem link='/orders'>Orders</NavigationItem>
            {props.isAuthenticated ? (
                <NavigationItem link='/logout'>Logout</NavigationItem>
            ) : (
                <NavigationItem link='/auth'>Signup</NavigationItem>
            )}
        </ul>
    </div>
);

export default navigationItems;
