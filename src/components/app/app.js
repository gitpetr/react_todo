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

  toggleDone = (id) => {
    this.service.toggleDone(id)
      .catch(function (error) {
        console.log('ОШИБКА', error);
      })
  }

  toggleImportant = (id) => {
    this.service.toggleImportant(id)
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
          toggleDone={(id) => this.toggleDone(id)}
          toggleImportant={(id) => this.toggleImportant(id)}
        />
      </div>
    )
  }

}

export default App;
