import { Form, Input, Select, Upload, Button, Icon } from 'antd';
import React, { Component } from 'react';
import { Field } from 'redux-form'

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
    }
};

export const renderIngredients = ({ fields, defaultValue }) => {
    // if (defaultValue) {
    //     const lengthField = defaultValue.length;

    //     for (let i = 0; i < lengthField; i++) {
    //         fields.push({})
    //     }
    // }
    return (
        <div className="ingredients-container">
            <Button onClick={() => fields.push({})}>Dodaj</Button>
            {fields.map((item, index) => {
                return <div key={index} className="ingredients">
                    <label htmlFor="nameIngredients">Nazwa składnika</label>
                    <Field
                        name={`${item}.name`}
                        type="text"
                        component={AInput}
                        defaultValue={defaultValue ? defaultValue[0].name : ''}
                    />
                    <label htmlFor="amountIngredients">Ilość składnika</label>
                    <Field
                        name={`${item}.amount`}
                        type="text"
                        component={AInput}
                        defaultValue={defaultValue ? defaultValue[0].amount : ''}
                    />
                    <Button onClick={() => fields.remove(index)}>Usuń</Button>
                </div>
            }
            )}
        </div>
    )
}

export const UploadPhoto = () => {
    return (
        <Upload
            name="photo"
            listType="picture-card"
            action="//jsonplaceholder.typicode.com/posts/"
            onChange={this.handleChange}
        >
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Załącz zdjęcie</div>
            </div>
        </Upload>
    )
}

const makeField = Component => class HOC extends Component {

    constructor() {
        super();
        this.state = {
            value: ''
        }
        this.changeText = this.changeText.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.defaultValue
        })
    }

    changeText(event) {
        this.setState({
            value: event.target ? event.target.value : event
        })
    }

    render() {
        return (
            <FormItem {...formItemLayout}>
                <Component {...this.props} {...this.props.input} children={this.props.children} onChange={this.changeText} value={this.state.value}
                />
            </FormItem>
        )
    }
};

export const AInput = makeField(Input);
export const ASelect = makeField(Select);
export const ATextarea = makeField(TextArea);