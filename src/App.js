import { useEffect, useState } from 'react';
import './App.css'
import { v4 } from 'uuid';

function App() {
  const [todoList, setTodoList] = useState(() => {
    const localItem = localStorage.getItem("ITEMS");
    if(localItem == null) return [];
    return JSON.parse(localItem)
  });
  const [todoItem, setTodoItem] = useState("")

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todoList))
  }, [todoList])


  function addTodo(e) {
    e.preventDefault()
    if (todoItem === "") {
      return alert("Todos cannot be empty")
    }

    setTodoList((prev) => {
      return ([...prev, {
        value: todoItem,
        isCompleted: false,
        id: v4()
      }])
    })
    setTodoItem("")
  }
  function toggleChecked(id, completed) {
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (todoList.id === id) {
          return { ...todoList, completed }
        }
        return todo;
      })
    })
  }
  function deleteTodo(id) {
    setTodoList((prev) => {
      return prev.filter(prev => prev.id !== id)
    }
    )
  }
  return (
    <>
      <form onSubmit={addTodo} className='new-item-form'>
        <div className='form-row'>
          <label htmlFor='item'>New Item</label>
          <input value={todoItem} type='text' id='item'
            onChange={e => (setTodoItem(e.target.value))}>
          </input>
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>Todo List</h1>
      <ul className='list'>
        {todoList.length === 0 && "No Todos"}
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input type='checkbox' checked={todo.Completed}
                  onChange={e => toggleChecked(todo.id, e.target.checked)}>
                </input>
                {todo.value}
              </label>
              <button className='btn btn-danger' onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App;
