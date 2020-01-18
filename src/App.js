import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import About from './components/pages/About';
import AddTodo from './components/AddTodo';
// import uuid from 'uuid';
import axios from 'axios';

class App extends React.Component {
  state = {
    todos: []
  }

  componentDidMount(completed) {
    axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=5`)
      .then(res => this.setState({ todos: res.data }))
  }

  //Toggle Completed
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    });
  }
  //Delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }
  //Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(res => this.setState({todos: [...this.state.todos, res.data]}));
  }


  render() {

    return (
      <Router>
        <div className="container">
          <div className="App">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo
                  addTodo={this.addTodo} />
                <Todos 
                  todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
