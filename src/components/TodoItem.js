import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: 10,
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed
                ? 'line-through'
                : 'none'
        }
    }

    render() {

        const { id, title } = this.props.todo;

        return (
            <div style={this.getStyle()}>
                <p>
                    <input style={{ height: '10px', width: '10px' }} type="checkbox" onChange={this.props.markComplete.bind(this, id)} /> {' '}
                    { title }
                    <button onClick = {this.props.delTodo.bind(this, id)} style={btnStyle}><strong>X</strong></button>
                </p>
            </div>
        )
    }
}

// PropTypes
TodoItem.propTypes = {
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
}

const btnStyle = {
    textAlign: 'center',
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '35%',
    cursor: 'pointer',
    float: 'right'
}

export default TodoItem
