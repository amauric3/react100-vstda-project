import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState('');
  const [newPriority, setNewPriority] = useState('1');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const todo = {
      id: Date.now(),
      text: newText,
      priority: parseInt(newPriority, 10),
      completed: false,
      isEditing: false
    };

    setTodos([...todos, todo]);
    setNewText('');
    setNewPriority('1');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleEditClick = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, isEditing: true } : t));
  };

  const handleSave = (id, updatedText, updatedPriority) => {
    setTodos(todos.map(t =>
      t.id === id
        ? { ...t, text: updatedText, priority: parseInt(updatedPriority, 10), isEditing: false }
        : t
    ));
  };

  const priorityClass = (p) => {
    if (p === 1) return 'priority-high';
    if (p === 2) return 'priority-medium';
    return 'priority-low';
  };

  return (
    <div className="container">
      <h1 className="text-white">Very Simple Todo App</h1>
      <h2 className="text-white">Track all of the things</h2>
      <hr />
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-header">Add New Todo</div>
            <div className="card-body">
              <form onSubmit={handleAdd}>
                <div className="form-group">
                  <label>I want to..</label>
                  <textarea
                    data-testid="create-todo-text"
                    className="form-control"
                    rows="3"
                    value={newText}
                    onChange={e => setNewText(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>How much of a priority is this?</label>
                  <select
                    data-testid="create-todo-priority"
                    className="form-control"
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value)}
                  >
                    <option value="1">High Priority</option>
                    <option value="2">Medium Priority</option>
                    <option value="3">Low Priority</option>
                  </select>
                </div>
                <button data-testid="create-todo" className="btn btn-success btn-block">Add</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-8">
          <div className="card">
            <div className="card-header">View Todos</div>
            <div className="list-group list-group-flush">
              {todos.length === 0 && (
                <div className="list-group-item">
                  <strong>Welcome to Very Simple Todo App!</strong><br />
                  Get started now by adding a new todo on the left.
                </div>
              )}

              {todos.map(todo => (
                <div
                  key={todo.id}
                  data-testid="todo-item"
                  className={`list-group-item ${priorityClass(todo.priority)}`}
                >
                  {todo.isEditing ? (
                    <EditForm todo={todo} onSave={handleSave} />
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleToggle(todo.id)}
                        />
                        <span
                          style={{
                            textDecoration: todo.completed ? 'line-through' : 'none'
                          }}
                        >
                          {todo.text}
                        </span>
                      </div>
                      <div>
                        <a
                          href="#"
                          data-testid="edit-todo"
                          onClick={e => {
                            e.preventDefault();
                            handleEditClick(todo.id);
                          }}
                        >
                          Edit
                        </a>
                        {' '}
                        <a
                          href="#"
                          data-testid="delete-todo"
                          onClick={e => {
                            e.preventDefault();
                            handleDelete(todo.id);
                          }}
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditForm({ todo, onSave }) {
  const [text, setText] = useState(todo.text);
  const [priority, setPriority] = useState(String(todo.priority));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(todo.id, text, priority);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Description</label>
        <textarea
          data-testid="update-todo-text"
          className="form-control"
          rows="3"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Priority</label>
        <select
          data-testid="update-todo-priority"
          className="form-control"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="1">High Priority</option>
          <option value="2">Medium Priority</option>
          <option value="3">Low Priority</option>
        </select>
      </div>
      <button data-testid="update-todo" className="btn btn-success">Save</button>
    </form>
  );
}