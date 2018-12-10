import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import Service from '../../services/services'
import ItemAddForm from '../item-add-form'

import './app.css';

class App extends Component {
  service = new Service()

  state = {
    todoData: [],
    term: '',
    filter: 'all'
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

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ]
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  toggleDone = (id) => {
    this.service.toggleDone(id)
      .catch(function (error) {
        console.log('ОШИБКА', error);
      })
    this.onToggleDone(id)
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  toggleImportant = (id) => {
    this.service.toggleImportant(id)
      .catch(function (error) {
        console.log('ОШИБКА', error);
      })
    this.onToggleImportant(id)
  }

  deleteItem(id){ 
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
    
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx +1)
      ]

      return { todoData: newArray }
    })

    this.service.deleteItem(id)
      .catch(function (error) {
        console.log('ОШИБКА', error);
      })
  }

  addItem = (text) => {
    this.service.addItem(text)
      .then((data) => this.addItemToState(data) )
  };

  addItemToState = (data) => {
    const newItem = {
       ...data
    }

    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  search(items, term) {
    if (term.length === 0) {
      return items
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  filter(items, filter) {
    switch(filter) {
      case 'all': return items
      case 'active': return items.filter((item) => !item.done)
      case 'done': return items.filter((item) => item.done) 
      default: return items
    }
  }

  render() {
    const { todoData, term, filter } = this.state
    const visibleItems = this.filter(this.search(todoData, term), filter)
    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
          onSearchChange={this.onSearchChange}
          />
          <ItemStatusFilter
            filter={filter} 
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList 
          todos={visibleItems}
          toggleDone={(id) => this.toggleDone(id)}
          toggleImportant={(id) => this.toggleImportant(id)}
          onDeleted={(id) => this.deleteItem(id)}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    )
  }

}

export default App;
