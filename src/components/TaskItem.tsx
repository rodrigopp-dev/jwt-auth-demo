import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTaskActions } from '../hooks/useTaskActions'
import type { Task } from '../types'

interface TaskItemProps {
  task: Task
  onChanged: () => void
}

export function TaskItem({ task, onChanged }: TaskItemProps) {
  const actions = useTaskActions({
    task,
    onSuccess: onChanged,
  })

  function confirmDelete() {
    const confirmed = window.confirm(
      `¿Eliminar el tarea "${task.title}"?`,
    )

    if (confirmed) {
      void actions.handleDelete()
    }
  }

  if (actions.editing) {
    return (
      <Paper
        variant="outlined"
        component="form"
        onSubmit={actions.handleUpdate}
        sx={{ p: 2 }}
      >
        <Stack spacing={2}>
          <Typography variant="subtitle1">Editar tarea #{task.id}</Typography>

          {actions.error && <Alert severity="error">{actions.error}</Alert>}

          <TextField
            label="Nombre"
            value={actions.title}
            onChange={(event) => actions.setTitle(event.target.value)}
            required
            fullWidth
            helperText="Entre 3 y 80 caracteres"
            inputProps={{ minLength: 3, maxLength: 80 }}
          />

          <TextField
            label="Descripción"
            value={actions.description}
            onChange={(event) => actions.setDescription(event.target.value)}
            fullWidth
            multiline
            rows={2}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={!actions.valid || actions.busy}
            >
              {actions.saving ? 'Guardando…' : 'Guardar cambios'}
            </Button>

            <Button
              type="button"
              startIcon={<CloseIcon />}
              onClick={actions.cancelEditing}
              disabled={actions.busy}
            >
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </Paper>
    )
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1.5}>
        {actions.error && <Alert severity="error">{actions.error}</Alert>}

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'flex-start' }}
          spacing={2}
        >
          <Stack spacing={0.5}>
            <Typography variant="subtitle1">{task.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description || 'Sin descripción'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID {task.id} · Estado {task.status} · Prioridad {task.priority}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Asigando a {task.assigneeId} · Fecha límite {task.dueDate}
            </Typography>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={actions.startEditing}
              disabled={actions.busy}
            >
              Editar
            </Button>

            <Button
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={confirmDelete}
              disabled={actions.busy}
            >
              {actions.deleting ? 'Eliminando…' : 'Eliminar'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  )
}