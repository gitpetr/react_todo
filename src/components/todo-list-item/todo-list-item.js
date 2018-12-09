import React from 'react'
import './todo-list-item.css'

const TodoListItem = ({ label, onDeleted, done, important, toggleDone, toggleImportant }) => {
    let classNames = 'todo-list-item '

    if (done) classNames += ' done '
    if (important) classNames += ' important '

    return (
      <div className={classNames}>
        <span
          className='todo-list-item-label'
          onClick={() => toggleDone()}
        >
          {label}
        </span>

        <button type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={() => toggleImportant()}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o" />
        </button>
      </div>
    );
  } 
  export default TodoListItem;
