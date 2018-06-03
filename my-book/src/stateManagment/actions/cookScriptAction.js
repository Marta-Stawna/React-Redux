import { history } from '../../index';
import { loadRecipes, addRecipe, removeRecipe, editRecipe } from './cookScriptActionCreator';
import dataFirebase from '../../index';
import { takeTime } from '../../utils/dateFormat';

export function fetchRecipes() {
    return function (dispatch) {
        const cookData = dataFirebase.database().ref('recipes');
        let data = [];
        return cookData.once('value', (snapshot) => {
            snapshot.forEach(item => { data.push(item.val()) });
        }).then(() => dispatch(loadRecipes(data)))
    }
}

export function addRecipeToList(recipe) {
    return function (dispatch) {
        const myRef = dataFirebase.database().ref('recipes').push();
        const key = myRef.key;
        const newData = {
            ...recipe,
            id: key,
            date: takeTime()
        }

        myRef.update(newData).then(() => {
            dispatch(addRecipe(recipe))
            return history.push('/')
        })
    }
}

export function removeRecipeFromList(id, index) {
    return function (dispatch) {
        dataFirebase.database().ref('recipes')
            .child(id)
            .remove()
            .then(() => dispatch(removeRecipe(index)))
    }
}

export function editRecipeinList(props, recipeState) {
    return function (dispatch) {
        const newValue = {
            ...recipeState, ...props
        }

        dataFirebase.database().ref('recipes')
            .child(recipeState.id)
            .update(newValue)
            .then(item => {
                dispatch(editRecipe(newValue));
                return history.push('/')
            });
    }
}