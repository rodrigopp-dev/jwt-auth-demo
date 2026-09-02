import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
//import TextField from '@mui/material/TextField'
import { TextField, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography'

interface TaskFormProps {
  title: string
  setTitle: (value: string) => void
  description: string
  setDescription: (value: string) => void
  status: string
  setStatus: (value: string) => void
  priority: string
  setPriority: (value: string) => void
  assigneeId: number
  setAssigneeId: (value: number) => void
  dueDate: string
  setDueDate: (value: string) => void
  submitting: boolean
  error: string | null
  valid: boolean
  handleSubmit: (e: React.FormEvent) => void
}

export function TaskForm({
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
  submitting,
  error,
  valid,
  handleSubmit,
}: TaskFormProps) {
  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Nueva Tarea</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Nombre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        helperText="Mínimo 3 caracteres"
      />
      <TextField
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={2}
      />
      <TextField
        select
        label="Prioridad"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        fullWidth
      >
        <MenuItem value="LOW">Baja</MenuItem>
        <MenuItem value="MED">Media</MenuItem>
        <MenuItem value="HIGH">Alta</MenuItem>
      </TextField>
      <TextField
        label="Fecha límite"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        label="Asignado (ID de usuario)"
        value={assigneeId}
        onChange={(e) => setAssigneeId(Number(e.target.value))}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" disabled={!valid || submitting}>
        {submitting ? 'Creando…' : 'Crear Tarea'}
      </Button>
    </Stack>
  )
}
