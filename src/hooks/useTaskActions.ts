import { useState, type FormEvent } from 'react'
import { deleteTask, updateTask } from '../services/taskService'
import type { Task } from '../types'

interface UseTaskActionsOptions {
  task: Task
  onSuccess?: () => void
}

export function useTaskActions({
  task,
  onSuccess,
}: UseTaskActionsOptions) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description ?? '')
  const [priority, setPriority] = useState(task.priority)
  const [assigneeId, setAssigneeId] = useState(task.assigneeId)
  const [dueDate, setDueDate] = useState(task.dueDate)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const valid = title.trim().length >= 3 && title.trim().length <= 80
  const busy = saving || deleting

  function startEditing() {
    setTitle(task.title)
    setDescription(task.description ?? '')
    setError(null)
    setEditing(true)
  }

  function cancelEditing() {
    setTitle(task.title)
    setDescription(task.description ?? '')
    setError(null)
    setEditing(false)
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!valid || busy) return

    setSaving(true)
    setError(null)

    try {
      await updateTask(task.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        priority: priority.trim(),
        assigneeId: assigneeId,
        dueDate: dueDate.trim()
      })
      setEditing(false)
      onSuccess?.()
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Error al actualizar la tarea',
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (busy) return

    setDeleting(true)
    setError(null)

    try {
      await deleteTask(task.id)
      onSuccess?.()
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Error al eliminar la tarea',
      )
    } finally {
      setDeleting(false)
    }
  }

  return {
    editing,
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    assigneeId,
    setAssigneeId,
    dueDate,
    setDueDate,
    saving,
    deleting,
    error,
    valid,
    busy,
    startEditing,
    cancelEditing,
    handleUpdate,
    handleDelete,
  }
}