export interface Todo {
    id: string
    text: string
    isCompleted: boolean
    priority: "low" | "medium" | "high"
}
