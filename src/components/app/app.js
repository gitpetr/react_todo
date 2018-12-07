import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import Service from '../../services/services'

import './app.css';

class App extends Component {
  service = new Service()
  state = {
    todoData: []
  }

  loadData = (todoData) => {
    this.setState({todoData})
  }

  componentDidMount() {
    this.service.todos()
      .then((data) => (this.loadData(data)))
      .catch(function (error) {
        console.log('ОШИБКА', error);
      })
  }

  toggleDone = (id, done) => {
    this.service.toggleDone(id, done)
      .catch(function (error) {
        console.log('ОШИБКА', error);
      })
  }

  toggleImportant = (id, important) => {
    this.service.toggleImportant(id, important)
      .catch(function (error) {
        console.log('ОШИБКА', error);
      })
  }

  render() {

    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList 
          todos={this.state.todoData} 
          toggleDone={(id, done) => this.toggleDone(id, done)}
          toggleImportant={(id, important) => this.toggleImportant(id, important)}
        />
      </div>
    )
  }

}

export default App;
