import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, } from 'antd';
import { NavLink } from 'react-router-dom';
import { fetchRecipes, removeRecipeFromList } from '../stateManagment/actions/cookScriptAction';

import 'antd/dist/antd.css';
import './cookScriptTable.scss';

const { Column } = Table;

const mapCategory = (item) => {
    switch (item) {
        case 'mainDish':
            return 'Główne danie';
        case 'starter':
            return 'Przystawka';
        case 'dessert':
            return 'Deser';
        case 'another':
            return 'Inne';
        default:
            return item;
    }
}

class CookScriptTable extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
        this.removeItemFromTable = this.removeItemFromTable.bind(this)
    }

    componentWillMount() {
        this.props.fetchRecipes()
    }

    componentWillReceiveProps(nextProps) {
        const mapData = nextProps.recipes.list.map(item => {
            let category = item.category
            if (category) {
                category = mapCategory(category)
            }

            return {
                ...item, category
            }
        });
        this.setState({
            data: mapData
        });
    }

    removeItemFromTable(id, index) {
        this.props.removeRecipeFromList(id, index);
    }

    render() {
        return (
            <div className="table-container">
                <NavLink to="/add" className="button-add">Dodaj</NavLink>
                <Table dataSource={this.state.data} rowKey={el => el.id}>
                    <Column
                        title='Nazwa'
                        dataIndex='name'
                        key='name'
                        sorter={(a, b) => a.name.localeCompare(b.name)}
                    />
                    <Column
                        title='Zdjęcie'
                        dataIndex='photo'
                        key='photo'
                    />
                    <Column
                        title='Kategoria'
                        dataIndex='category'
                        key='category'
                        sorter={(a, b) => a.name.localeCompare(b.name)}
                    />
                    <Column
                        title='Data dodania'
                        dataIndex='date'
                        key='date'
                        sorter={(a, b) => a.name.localeCompare(b.name)}
                    />
                    <Column
                        title='Szczegóły'
                        dataIndex='details'
                        key='details'
                        render={() => <Icon type="eye" onClick={() => console.log("details")} />}
                    />
                    <Column
                        title='Edycja'
                        key='edit'
                        render={({ id }) => <NavLink to={`/edit/${id}`}>
                            <Icon type="edit" />
                        </NavLink>
                        }
                    />
                    <Column
                        title='Usuń'
                        key='delete'
                        render={(props, text, index) =>
                            <Icon type="delete" onClick={() => this.removeItemFromTable(props.id, index)} />
                        } />
                </Table>
            </div>
        )
    }
};

export default connect(state => ({
    recipes: state.cookScriptReducer
}), { fetchRecipes, removeRecipeFromList })(CookScriptTable)
