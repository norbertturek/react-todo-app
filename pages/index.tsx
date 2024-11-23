import { Todo } from "@/types/types"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { TodoForm } from "./todo-form"
import { TodoItem } from "./todo-item"

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string, priority: Todo["priority"]) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      isCompleted: false,
      priority,
    }
    setTodos([...todos, newTodo])
  }

  const editTodo = (id: string, text: string, priority: Todo["priority"]) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text, priority } : todo
      )
    )
  }

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <div className="space-y-2 mt-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            removeTodo={removeTodo}
            toggleComplete={toggleComplete}
          />
        ))}
      </div>
    </div>
  )
}
