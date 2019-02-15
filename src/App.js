import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      message: "Kaylin's To-Dos :",
      newTodo: '',
      todos: [{
        title: 'Learn React',
        done: false
      }, {
        title: 'Learn JSX',
        done: false
      }]
    };
    this.formSubmitted = this.formSubmitted.bind(this);
    this.newTodoChanged = this.newTodoChanged.bind(this);

  }

  formSubmitted(e) {
    e.preventDefault();
    this.setState({
      newTodo: '',
      todos: [...this.state.todos, {
        title: this.state.newTodo,
        done: false
      }]
    });
  }

  newTodoChanged(event) {
    this.setState({
      newTodo: event.target.value
    });
  }

  toggleTodoDone(e, index) {
    const todos = [...this.state.todos]; // copy the array todos
    todos[index] = {...todos[index]}; // copy of the object(todo) at specified index
    todos[index].done = e.target.checked; // updates value at that index
    this.setState({
      todos // copy of state with latest update - do not want to mutate state
    });
  }

  removeTodo(index){
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({
      todos 
    });
  }

  allDone() {
    const todos = this.state.todos.map(todo => {
      return {
        title: todo.title,
        done: true
      };
    });
    this.setState({
      todos
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        <form onSubmit={this.formSubmitted}>
          <label htmlFor="newTodo">New Todo :</label>
          <input id="newTodo" name="newTodo" onChange={this.newTodoChanged} value={this.state.newTodo} placeholder="Type Your To-Do Here!"/>
          <button type="submit">Add Todo</button>
        </form>
        <ul>
          {this.state.todos.map((todo, index) => {
            return (<li key={todo.title}>
              <input onChange={(e) => this.toggleTodoDone(e, index)} type="checkbox" checked={todo.done} /> 
              <span className={todo.done ? 'done' : '' }>{todo.title}</span> 
              <button onClick={() => this.removeTodo(index)}>Remove</button>
            </li>)
          })}
            <button onClick={() => this.allDone()}>All Items Completed</button>

        </ul>
      </div>
    ); // the {{}} in span.style - the first set indicate it is an expression, the second that it is an object
  }
}

export default App;

// <span style={{ textDecoration: todo.done ? 'line-through' : 'inherit'}}>{todo.title}</span> 

