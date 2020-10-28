import React from "react";

import classes from "./Burger.css";

import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    const transformedIngredients = Object.keys(
        props.ingredients
    ).map((key) => {});

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" />
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
