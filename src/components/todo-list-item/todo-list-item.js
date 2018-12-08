import React, { Component } from 'react'
import './todo-list-item.css'

class TodoListItem extends Component {
  state = {
    done: this.props.done,
    important: this.props.important
  }

  onLabelClick = () => {
    this.setState((state) => {
      return {
        done: !state.done
      }
    })
    this.props.toggleDone()
  }

  onMarkImportant = () => {
    this.setState((state) => {
      return {
        important: !state.important
      }
    })
    this.props.toggleImportant()
  }

  render () {
    const { done, important } = this.state

    let classNames = 'todo-list-item '

    if (done) classNames += ' done '
    if (important) classNames += ' important '

    return (
      <span className={classNames}>
        <span
          className='todo-list-item-label'
          onClick={this.onLabelClick}
        >
          {this.props.label}
        </span>

        <button type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={this.onMarkImportant}
          >
          <i className="fa fa-exclamation" />
        </button>

        <button type="button"
          className="btn btn-outline-danger btn-sm float-right">
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }

};

export default TodoListItem;
