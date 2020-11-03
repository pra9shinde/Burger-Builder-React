import React from "react";
import classes from "./Order.css";

const Order = (props) => {
    let ingredients = [];
    for (let key in props.ingredients) {
        ingredients.push({
            name: key,
            amount: props.ingredients[key],
        });
    }

    const ingredientsComp = ingredients.map((ing) => {
        return (
            <span
                key={ing.name}
                style={{
                    textTransform: "capitalize",
                    display: "inline-block",
                    margin: "0 8px",
                    border: "1px solid #ccc",
                    padding: "5px",
                }}
            >
                {ing.name}({ing.amount})
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsComp}</p>
            <p>
                Price: <strong>₹{props.price}</strong>
            </p>
        </div>
    );
};

export default Order;
