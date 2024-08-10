import React, { Component } from "react";
import Header from "./Header";
import Todo from "./Todo";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoTitle: "",
      status: "all",
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this)
    this.editTodo = this.editTodo.bind(this)
    this.todoTitleHandler = this.todoTitleHandler.bind(this)
    this.statusHandler = this.statusHandler.bind(this)
  }

  addTodo(event) {
    event.preventDefault();

    if(this.state.todoTitle.trim().length){
        let newTodo = {
            id: Math.floor(Math.random() * 1000),
            title: this.state.todoTitle,
            completed: false
        }

        this.setState(prevState => {
            return {todos: [...prevState.todos,newTodo],todoTitle: ''}
        })
    }
  }

  todoTitleHandler(event){
     this.setState({
        todoTitle: event.target.value
     })
  }

  editTodo(maidId){
    

      let mainTodo = this.state.todos.find(todo => todo.id === maidId)
     
    let mainTodos = this.state.todos.map(todo => {
        if(todo.id === mainTodo.id){
           todo.completed = !todo.completed
        }
        return todo
     })
     

     this.setState({
        todos: mainTodos
     })
     
  }

  statusHandler(event){
     this.setState({
        status: event.target.value
     })
  }

  removeTodo(mainId){
    let mainTodos = this.state.todos.filter(todo => todo.id !== mainId)

    this.setState({
        todos: [...mainTodos]
    })
  }

  render() {
    return (
      <>
        <Header />
        <form onSubmit={(event) => this.addTodo(event)}>
          <input
            type="text"
            className="todo-input"
            maxLength="40"
            value={this.state.todoTitle}
            onChange={(event) => this.todoTitleHandler(event)}
          />
          <button className="todo-button" type="submit">
            <i className="fas fa-plus-square"></i>
          </button>
          <div className="select">
            <select name="todos" className="filter-todo" value={this.state.status} onChange={(event) => this.statusHandler(event)}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
        </form>

        <div className="todo-container">
          <ul className="todo-list">
            {this.state.status === 'completed' && this.state.todos.filter(todo => todo.completed).map(todo=> (
                <Todo key={todo.id} {...todo} onEdit={this.editTodo} onRemove={this.removeTodo}/>
            ))}

            {this.state.status === 'uncompleted' && this.state.todos.filter(todo => !todo.completed).map(todo=> (
                <Todo key={todo.id} {...todo} onEdit={this.editTodo} onRemove={this.removeTodo}/>
            ))}

            {this.state.status === 'all' && this.state.todos.map(todo => (
                <Todo key={todo.id} {...todo} onEdit={this.editTodo} onRemove={this.removeTodo}/>
            ))}
            
          </ul>
        </div>
      </>
    );
  }
}
