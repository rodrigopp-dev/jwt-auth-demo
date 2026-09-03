import LogoutIcon from '@mui/icons-material/Logout'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams  } from 'react-router-dom'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { useAuth } from '../hooks/useAuth'
import { useTaskForm } from '../hooks/useTaskForm'
import { useTasks } from '../hooks/useTasks'

export function TasksPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { id: projectId } = useParams();
  const numericProjectId = Number(projectId);
  const { tasks, loading, error, refetch } = useTasks(numericProjectId)
  const taskForm = useTaskForm({ onSuccess: refetch })
  

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <Box maxWidth={640} mx="auto" mt={6}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Tasks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fase 4 — formulario + lista conectados.
          </Typography>
        </Box>
        <Button startIcon={<LogoutIcon />} onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Stack>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TaskForm {...taskForm} />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <TaskList tasks={tasks} loading={loading} error={error} />
      </Paper>
    </Box>
  )
}
