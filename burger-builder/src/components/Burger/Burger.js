import React from "react";

import classes from "./Burger.css";

import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map((key) => {
            return [...Array(props.ingredients[key])].map((_, i) => {
                return <BurgerIngredient type={key} key={key + i} />;
            });
        })
        .reduce((prevVal, nextVal) => {
            // If user doesnt add any ingredients, transformedIngredients returns 4 empty arrays so in order to check if its empty instead of check each array length we concat them using reduce
            return prevVal.concat(nextVal);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
