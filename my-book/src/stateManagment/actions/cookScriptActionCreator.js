import { ACTIONS } from '../cookScriptReducer';

export function loadRecipes(recipes) {
    return {
        type: ACTIONS.LOAD_DATA,
        recipes,
    }
}

export function addRecipe(recipe) {
    return {
        type: ACTIONS.ADD_RECIPE,
        recipe,
    }
}

export function removeRecipe(id) {
    return {
        type: ACTIONS.REMOVE_RECIPE,
        id,
    }
}

export function editRecipe(recipe) {
    return {
        type: ACTIONS.EDIT_RECIPE,
        recipe
    }
}