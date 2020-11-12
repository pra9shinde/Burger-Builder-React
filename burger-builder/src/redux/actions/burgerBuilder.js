import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    };
};

export const initIngredients = () => {
    return (dispatch) => {
        // async code
        // Fetch ingredients from firebase DB
        axios
            .get('https://burger-builder-77b5d.firebaseio.com/ingredients.json')
            .then((response) => {
                dispatch(setIngredients(response.data));
            })
            .catch((e) => {
                console.log(e);
                dispatch(fetchIngredientsFailed());
            });
    };
};
