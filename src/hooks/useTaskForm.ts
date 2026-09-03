
import { useState } from 'react'
import { createTask } from '../services/taskService'

interface UseTaskFormOptions {
  onSuccess?: () => void
}

const getLocalTodayDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function useTaskForm(id: number, { onSuccess }: UseTaskFormOptions = {}) {
  //const [name, setName] = useState('')
  //const [description, setDescription] = useState('')

  const [projectId, setProjectId] = useState(1)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [assigneeId, setAssigneeId] = useState(1)
  //const [dueDate, setDueDate] = useState('')
  const [dueDate, setDueDate] = useState(getLocalTodayDate());

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const valid = title.trim().length >= 3

  function reset() {
    setProjectId(0)
    setTitle('')
    setDescription('')
    setStatus('')
    setPriority('')
    setAssigneeId(0)
    setDueDate('')
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid || submitting) return

    setSubmitting(true)
    setError(null)

    try {
      await createTask(id, {
        title: title.trim(),
        description: description.trim(),
        priority: priority.trim(),
        assigneeId: assigneeId,
        dueDate: dueDate.trim()
      })
      reset()
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la tarea')
    } finally {
      setSubmitting(false)
    }
  }

  return {
    projectId,
    setProjectId,
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    priority,
    setPriority,
    assigneeId,
    setAssigneeId,
    dueDate,
    setDueDate,
    submitting,
    error,
    valid,
    handleSubmit,
  }
}