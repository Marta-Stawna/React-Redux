import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './addRecipeComponent.scss';
import { Field, FieldArray, reduxForm } from 'redux-form'
import { AInput, ATextarea, UploadPhoto, ASelect, renderIngredients } from './components/formComponents';
import { Select, Button } from 'antd';
import { editRecipeinList } from '../stateManagment/actions/cookScriptAction';

const { Option } = Select;
class Edit extends Component {

    constructor() {
        super();
        this.state = {
            id: 0,
            recipe: {}
        };
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.setState({
            id: this.props.match.params.id
        });
    }

    componentDidMount() {
        const [recipe] = this.props.recipes.list.filter(item => item.id == this.state.id);

        this.setState({
            recipe,
        })
    }

    submit(recipe, dispatch) {
        const recipeState = this.state.recipe || null;
        return dispatch(editRecipeinList(recipe, recipeState))
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="container-add-recipes">
                <form onSubmit={handleSubmit(this.submit)} className="recipe-form">
                    <div>
                        <label htmlFor="name">Nazwa przepisu</label>
                        <Field name="name" defaultValue={this.state.recipe ? this.state.recipe.name : ''} onBlur={this.changeValue} component={AInput} type="text" />
                    </div>
                    <div>
                        <label htmlFor="category">Kategoria</label>
                        <Field name="category" component={ASelect} defaultValue={this.state.recipe ? this.state.recipe.category : ''} >
                            <Option value="starter">Przystawka</Option>
                            <Option value="mainDish">Danie Główne</Option>
                            <Option value="dessert">Deser</Option>
                            <Option value="another">Inne</Option>
                        </Field>
                    </div>
                    <div>
                        <label htmlFor="photo">Załącz zdjęcie</label>
                        <Field name="photo" component={UploadPhoto} />
                    </div>
                    <div>
                        <label htmlFor="ingredients">Składniki</label>
                        <FieldArray name="ingredients" defaultValue={this.state.recipe ? this.state.recipe.ingredients : ''} component={renderIngredients} />
                    </div>
                    <div>
                        <label htmlFor="description">Opis przygotowania</label>
                        <Field name="description" component={ATextarea} defaultValue={this.state.recipe ? this.state.recipe.description : ''} />
                    </div>
                    <Button htmlType="submit">Wyślij</Button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'editRecipe',
    // onSubmit: submit
})((connect(state => ({ recipes: state.cookScriptReducer }), { editRecipeinList })(Edit)))