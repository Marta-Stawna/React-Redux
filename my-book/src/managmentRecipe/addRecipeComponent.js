import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form'
import { AInput, ATextarea, UploadPhoto, ASelect, renderIngredients } from './components/formComponents';
import { Select, Button } from 'antd';
import { addRecipeToList } from '../stateManagment/actions/cookScriptAction';

const { Option } = Select;

class AddRecipeForm extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container-add-recipes">
        <form onSubmit={handleSubmit} className="recipe-form">
          <div>
            <label htmlFor="name">Nazwa przepisu</label>
            <Field name="name" component={AInput} type="text" />
          </div>
          <div>
            <label htmlFor="category">Kategoria</label>
            <Field name="category" component={ASelect}>
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
            <FieldArray name="ingredients" component={renderIngredients} />
          </div>
          <div>
            <label htmlFor="description">Opis przygotowania</label>
            <Field name="description" component={ATextarea} />
          </div>
          <Button htmlType="submit">Zapisz</Button>
        </form>
      </div>
    )
  }
}


export default reduxForm({
  form: 'addRecipe',
  onSubmit: (recipe, dispatch) => dispatch(addRecipeToList(recipe))
})((connect(state => ({ recipes: state.cookScriptReducer }), { addRecipeToList })(AddRecipeForm)))