"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Todo } from "@/types/types"

interface TodoFormProps {
  addTodo: (text: string, priority: Todo["priority"]) => void
}

export function TodoForm({ addTodo }: TodoFormProps) {
  const [text, setText] = useState("")
  const [priority, setPriority] = useState<Todo["priority"]>("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      addTodo(text, priority)
      setText("")
      setPriority("medium")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="flex-grow"
      />
      <Select value={priority} onValueChange={(value: Todo["priority"]) => setPriority(value)}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Add</Button>
    </form>
  )
}

export default TodoForm;