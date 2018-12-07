import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, toggleDone, toggleImportant }) => {

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem 
          {...itemProps } 
          toggleDone={(done) => toggleDone(id, done )}
          toggleImportant={(important) => toggleImportant(id, important )}
        />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default TodoList;
