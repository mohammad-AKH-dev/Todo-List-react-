import React, { Component } from 'react'

export default class Todo extends Component {



    editHandler(id){
        this.props.onEdit(id)
    }

    removeHandler(id){
        this.props.onRemove(id)
    }
    render() {
        return (
            // 'completed' class for completed todos
            <div className={`todo ${this.props.completed ? 'completed' : ''}`} style={{ display: 'flex' }}>
                <li className="todo-item">{this.props.title}</li>

                <button className="check-btn" onClick={this.editHandler.bind(this,this.props.id)}>
                    <i className="fas fa-check" aria-hidden="true"></i>
                </button>

                <button className="trash-btn" onClick={this.removeHandler.bind(this,this.props.id)}>
                    <i className="fas fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        )
    }
}