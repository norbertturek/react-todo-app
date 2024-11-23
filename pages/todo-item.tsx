"use client"

import { useState } from "react"
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Todo } from "@/types/types"

interface TodoItemProps {
  todo: Todo
  editTodo: (id: string, text: string, priority: Todo["priority"]) => void
  removeTodo: (id: string) => void
  toggleComplete: (id: string) => void
}

export function TodoItem({ todo, editTodo, removeTodo, toggleComplete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(todo.text)
  const [editedPriority, setEditedPriority] = useState(todo.priority)

  const handleEdit = () => {
    if (editedText.trim()) {
      editTodo(todo.id, editedText, editedPriority)
      setIsEditing(false)
    }
  }

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  }

  return (
    <div className="flex items-center space-x-2 bg-white p-2 rounded-md shadow">
      <Checkbox
        checked={todo.isCompleted}
        onCheckedChange={() => toggleComplete(todo.id)}
      />
      {isEditing ? (
        <>
          <Input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="flex-grow"
          />
          <Select
            value={editedPriority}
            onValueChange={(value: Todo["priority"]) => setEditedPriority(value)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleEdit}>Save</Button>
          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
        </>
      ) : (
        <>
          <span className={`flex-grow ${todo.isCompleted ? "line-through text-gray-500" : ""}`}>
            {todo.text}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </span>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => removeTodo(todo.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}

