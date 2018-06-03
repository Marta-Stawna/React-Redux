export const ACTIONS = {
    LOAD_DATA: Symbol('LOAD_DATA'),
    ADD_RECIPE: Symbol('ADD_RECIPE'),
    REMOVE_RECIPE: Symbol('REMOVE_RECIPES'),
    EDIT_RECIPE: Symbol('EDIT_RECIPE'),
}

const INITIAL_STATE = {
    list: [],
    selected: null,
}

function cookScriptReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ACTIONS.LOAD_DATA:
            console.log(state, action.recipes, "LOAD")
            return {
                ...state, list: action.recipes
            }
        case ACTIONS.ADD_RECIPE:
            console.log(state, action.recipes, "ADD")
            return {
                ...state, list: [
                    ...state.list, action.recipe
                ]
            }
        case ACTIONS.REMOVE_RECIPE:
            console.log(state, action.id, "DELETE")
            return {
                ...state, list: [...state.list.splice(0, action.id), ...state.list.splice(1)],
            }
        case ACTIONS.EDIT_RECIPE:
            console.log(state, action.recipes, "EDIT")
            return {
                ...state, list: state.list.filter(item => {
                    if (item.id === action.recipe.id)
                        return action.recipe;
                })
            }
        default:
            return state;
    }
}

export default cookScriptReducer;