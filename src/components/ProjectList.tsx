import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Link as RouterLink } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Project } from '../types'

interface ProjectListProps {
  projects: Project[]
  loading: boolean
  error: string | null
}

export function ProjectList({ projects, loading, error }: ProjectListProps) {
  if (loading) {
    return (
      <Stack alignItems="center" py={4}>
        <CircularProgress />
      </Stack>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  if (projects.length === 0) {
    return <Typography color="text.secondary">No hay proyectos.</Typography>
  }

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Proyectos ({projects.length})
      </Typography>
      
      <List>
      {projects.map((project) => (
        <Card
          key={project.id}
          component={RouterLink}
          to={`/projects/${project.id}`}
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          <CardContent>
            <Typography variant="subtitle1">{project.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {project.description ?? 'Sin descripción'}
            </Typography>
          </CardContent>
        </Card>
      ))}
      </List>
    </>
  )
}
