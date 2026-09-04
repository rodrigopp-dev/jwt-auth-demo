# JWT Auth Demo — TaskFlow Frontend

Este repositorio contiene una aplicación frontend (Single Page Application) que consume la **TaskFlow API**. El proyecto sirve como una demostración completa de autenticación basada en JWT y operaciones CRUD aplicadas a la gestión de **Proyectos** y **Tareas**.

## Características Principales

- **Autenticación JWT:** Gestión de inicio y cierre de sesión, protegiendo las rutas privadas como el Dashboard.
- **Gestión de Proyectos (Projects):**
  - **Listar:** Carga y visualización de proyectos existentes mediante `GET /projects`.
  - **Crear:** Formulario para registrar nuevos proyectos mediante `POST /projects`.
  - **Editar:** Modificación del nombre y descripción del proyecto a través de `PUT /projects/{id}`.
  - **Eliminar:** Borrado de un proyecto y sus tareas asociadas mediante `DELETE /projects/{id}` (restringido al propietario del proyecto o rol `ADMIN`).
- **Gestión de Tareas (Tasks):**
  - **Listar:** Consulta y visualización de todas las tareas vinculadas a un proyecto específico.
  - **Crear:** Formulario y registro de nuevas tareas dentro de un proyecto.
  - **Editar:** Modificación completa de la información de las tareas existentes.
  - **Eliminar:** Borrado individual de tareas específicas.
- **Manejo de Estados de UI:** Indicadores visuales para carga (`loading`), errores, listas vacías y confirmaciones de acciones.
- **Diseño Reactivo:** Uso de componentes de Material UI (MUI) como `Paper`, `Stack`, `TextField`, `Button` y `Alert`.



## Arquitectura y Patrones

El código fuente en `src/` sigue un estricto patrón de separación de responsabilidades en tres capas:

1. **Servicios (Cómo se llama a la API):** Archivos puramente TypeScript (sin React) que utilizan Axios (`httpClient`) para realizar las peticiones HTTP y adjuntar el token JWT.
2. **Hooks (Estado y flujo):** Custom hooks de React (ej. `useProjects`, `useProjectForm`, `useProjectActions`) que encapsulan la lógica de negocio, validaciones y la comunicación con los servicios.
3. **Componentes (Interfaz de usuario):** Componentes presentacionales que solo se encargan de renderizar la información y capturar las interacciones del usuario.



### Estructura de Directorios

```text
src/
├── assets/                 # Recursos estáticos (imágenes, iconos, etc.)
├── components/             # Componentes visuales
│   ├── ProjectForm.tsx     # Formulario para nuevos proyectos
│   ├── ProjectItem.tsx     # Tarjeta individual de proyecto
│   ├── ProjectList.tsx     # Contenedor de la colección de proyectos
│   ├── TaskForm.tsx        # Formulario para nuevas tareas
│   ├── TaskItem.tsx        # Tarjeta individual de tarea
│   └── TaskList.tsx        # Contenedor de la colección de tareas
├── config/                 # Configuraciones globales
│   └── apiUrl.ts           # Definición de la URL base de la API
├── context/                # Contextos de React
│   └── AuthContext.tsx     # Proveedor del estado de autenticación global
├── hooks/                  # Lógica de negocio y manejo de estado
│   ├── useAuth.ts          # Hook para consumir el contexto de autenticación
│   ├── useProjectActions.ts# Acciones a nivel de proyecto (editar, eliminar)
│   ├── useProjectForm.ts   # Estado del formulario de creación de proyectos
│   ├── useProjects.ts      # Manejo de estado general de proyectos
│   ├── useTaskActions.ts   # Acciones a nivel de tarea (editar, eliminar)
│   ├── useTaskForm.ts      # Estado del formulario de creación de tareas
│   └── useTasks.ts         # Manejo de estado general de tareas
├── pages/                  # Vistas principales de la aplicación
│   ├── DashboardPage.tsx   # Página principal para la gestión de proyectos
│   ├── LoginPage.tsx       # Página de inicio de sesión
│   └── TasksPage.tsx       # Página dedicada a la gestión de tareas de un proyecto
└── services/               # Peticiones HTTP centralizadas
    ├── authService.ts      # Peticiones relacionadas a la autenticación
    ├── httpClient.ts       # Instancia configurada de Axios
    ├── projectService.ts   # Peticiones CRUD para proyectos
    └── taskService.ts      # Peticiones CRUD para tareas
    .env.example            # Plantilla de variables de entorno para el proyecto
```



## Especificaciones de la API

El frontend está diseñado respetando estrictamente el contrato de la API (Swagger).  
**URL Base de la API:** `https://d3ujwk09smrk9z.cloudfront.net`

### Autenticación (Auth)


| Método | Endpoint      | Descripción                                                                                       |
| ------ | ------------- | ------------------------------------------------------------------------------------------------- |
| `POST` | `/auth/login` | Inicia sesión en el sistema y retorna el token JWT necesario para autorizar las demás peticiones. |




### Endpoints de Proyectos (Projects)


| Método   | Endpoint         | Descripción                                                       |
| -------- | ---------------- | ----------------------------------------------------------------- |
| `GET`    | `/projects`      | Retorna la lista de proyectos del usuario.                        |
| `POST`   | `/projects`      | Crea un proyecto nuevo. (Cuerpo: `{ name, description? }`).       |
| `PUT`    | `/projects/{id}` | Reemplaza la información del proyecto (El nombre es obligatorio). |
| `DELETE` | `/projects/{id}` | Elimina el proyecto y sus tareas en cascada.                      |




### Endpoints de Tareas (Tasks)


| Método   | Endpoint                      | Descripción                                                    |
| -------- | ----------------------------- | -------------------------------------------------------------- |
| `GET`    | `/projects/{projectId}/tasks` | Retorna la lista de tareas asociadas a un proyecto específico. |
| `POST`   | `/projects/{projectId}/tasks` | Crea una nueva tarea asignada a un proyecto.                   |
| `PUT`    | `/tasks/{taskId}`             | Reemplaza la información completa de una tarea existente.      |
| `DELETE` | `/tasks/{taskId}`             | Elimina una tarea específica.                                  |



### Configuración de Variables de Entorno

El proyecto incluye un archivo .env.example que sirve como plantilla de referencia para la configuración local.

Seguridad: Los archivos .env (que pueden almacenar credenciales de APIs) nunca deben subirse al repositorio de código (GitHub).

Uso: Al clonar el proyecto, debes duplicar este archivo .env.example, renombrar la copia como .env (o .env.local), y asegurarte de que los valores sean los correctos para tu entorno.

VITE_API_URL: Esta variable define la dirección del servidor al que React hará las peticiones. El prefijo VITE_ es obligatorio, ya que permite que el empaquetador Vite haga que esta variable esté disponible de manera pública en el código del frontend.

## Instalación y Uso

1. **Clonar e instalar dependencias:**
  ```bash
    npm install
  ```
2. **Iniciar el entorno de desarrollo:**
  ```bash
    npm run dev
  ```
3. **Generar el build de producción:**
  ```bash
    npm run build
  ```

> **Consejo de pruebas:** Para probar la eliminación de un proyecto y sus tareas en cascada, y para evitar errores de permisos (`403 Forbidden`), asegúrate de interactuar con proyectos que hayas creado tú mismo, o inicia sesión con un usuario que tenga privilegios de `ADMIN`.

