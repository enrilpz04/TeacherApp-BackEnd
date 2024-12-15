# Proyecto Teach4dev: WebApp

## Equipo de Trabajo

Nuestro grupo está conformado por cuatro personas que han colaborado de manera equitativa en el desarrollo de este proyecto. Para repartir el trabajo de manera eficiente, utilizamos **Jira** como herramienta de gestión de tareas. Nos reuníamos semanalmente de forma síncrona a través de videollamadas por **Teams** y **Discord**, compartiendo pantalla para revisar el progreso y coordinar nuestras actividades.

Además, manteníamos una comunicación constante a diario mediante el chat instantáneo de **WhatsApp**, lo que nos permitió resolver dudas rápidamente y mantenernos sincronizados. Todo el trabajo desarrollado se subía a **GitHub** utilizando la terminal de **Git**; algunos miembros lo hacían a través de **Hyper-V** y otros mediante la terminal de **Visual Studio Code**.

El portavoz y representante del grupo es que ha hablado de parte del grupo en las tres sesiones de seguimiento a las que hemos asistido los cuatro, aunque todos hemos trabajado por igual, repartiendo las tareas de manera equitativa y avanzando día a día y semana a semana. Compartíamos todos los avances y dudas con el resto del grupo, lo cual nos permitió aprender cómo es la dinámica de trabajo de un desarrollador web full stack en equipo de una forma efectiva y comunicativa.

### Distribución inicial de Tareas (finalmente todos los miembros del grupo hemos participado en todas las partes):

- **El primer miembro del grupo:**:
  - Inició aportando un esquema visual del proyecto web interactivo, junto con E e I.
  - Escribió todas las rutas del frontend y del backend para su posterior desarrollo.
  - Desarrolló la parte del backend de mensajes, notificaciones y reservas (bookings).
  - Implementó las notificaciones en el frontend Angular, añadiendo la librería **SweetAlert** para mensajes emergentes.
  - Configuró el dashboard para cambiar la contraseña y la foto de perfil, utilizando la librería **Multer** para la subida de archivos.
  - Añadió la librería **Angular Material** para crear tablas en Angular que muestran el listado de notificaciones pendientes y leídas.
  - Elaboró un documento para la inserción de datos en todas las tablas en formato de conversación, insertando 10 profesores, 10 alumnos y un administrador.

- **El segundo miembro del grupo:**:
  - Desarrolló la parte del backend del registro de usuarios.
  - Implementó la API del mapa en la home de Angular para ubicar a los profesores en el mapa.

- **El tercer miembro del grupo:**:
  - Participó en la creación del esquema visual del proyecto.
  - Desarrolló el backend de la parte de los profesores y las clases.
  - Implementó los filtros de búsqueda de profesores en el frontend.
  - Desarrolló la parte de los mensajes en el frontend en tiempo real y el dashboard de administrador.

- **Y el cuarto miembro del grupo:**:
  - Colaboró en la creación del esquema visual del proyecto.
  - Desarrolló las vistas de la web en el frontend en Angular, específicamente la home inicial.
  - Editó el CSS del login y del registro en Angular frontend.

Durante el proyecto, todos los miembros colaboraron en la corrección de errores y en la implementación de funcionalidades necesarias para asegurar que todo funcionara correctamente y estuvieran perfectamente coordinados.

## 1. Objetivos realizados en este proyecto de gestión de una web de profesores de programación mediante Angular, ExpressJS y una API RESTful

1. **Creación de la Base de Datos:**
   - Diseñar y configurar una base de datos MySQL utilizando Sequelize para gestionar la información de administradores, profesores y alumnos.
   
2. **Desarrollo del Backend con ExpressJS:**
   - Configurar un servidor Express que maneje las rutas necesarias para la gestión de usuarios y profesores.
   - Implementar autenticación y autorización mediante JSON Web Tokens (JWT) y encriptación de contraseñas con bcrypt.
   
3. **Desarrollo del Frontend con Angular:**
   - Crear una interfaz de usuario intuitiva y responsiva utilizando Angular CLI y Angular Material.
   - Implementar funcionalidades como formularios de registro, login, listados filtrables de profesores, mapas de localización y perfiles de usuario.
   
4. **Integración de Librerías y Herramientas:**
   - Utilizar diversas librerías como SweetAlert para mensajes emergentes, Moment para la gestión de fechas, Multer y Cropper para la gestión y edición de imágenes, entre otras.
   
5. **Implementación de Funcionalidades Clave:**
   - Validación de profesores por parte de administradores.
   - Sistema de puntuaciones y opiniones para profesores.
   - Gestión de perfiles y comunicaciones entre alumnos y profesores.
   
6. **Despliegue y Mantenimiento:**
   - Configuración de nodemon para el desarrollo backend.
   - Asegurar la conectividad y rendimiento de la base de datos MySQL.

## 2. Descripción del proyecto

**Teach4dev: WebApp** es una aplicación web diseñada para la gestión y localización de profesores de clases particulares categorizados por su rama de conocimiento. Su principal objetivo es ofrecer un directorio completo donde los alumnos puedan encontrar profesores que impartan clases online según sus necesidades específicas.

### Funcionalidades principales:

- **Listado de Profesores:** Visualización de profesores filtrables por ramas de conocimiento, precio por hora, experiencia y puntuación.
- **Mapa de Localización:** Ubicación geográfica de los profesores para facilitar la búsqueda según la ciudad del alumno.
- **Tipos de Usuarios:**
  - **Administrador:** Responsable de validar y gestionar los perfiles de los profesores y alumnos.
  - **Profesor:** Puede registrarse, gestionar su perfil y recibir valoraciones de los alumnos.
  - **Alumno:** Puede registrarse, buscar profesores, contactar con ellos y dejar valoraciones.
- **Interacciones y Opiniones:** Los alumnos pueden puntuar y dejar opiniones sobre los profesores, fomentando una comunidad basada en la confianza.
- **Seguridad:** Implementación de autenticación y autorización para asegurar el acceso adecuado a las funcionalidades según el rol del usuario.

### Tecnologías y Frameworks utilizados

- **Frontend:**
  - **Angular:** Framework de desarrollo web robusto y de código abierto que permite crear aplicaciones de una sola página (SPA) con una arquitectura modular, componentes reutilizables y una excelente gestión del estado.
  - **Angular CLI:** Herramienta de línea de comandos que agiliza la creación, desarrollo y mantenimiento de proyectos Angular, automatizando tareas como la generación de componentes, servicios y módulos.
  - **Angular Material:** Biblioteca de componentes UI que implementa las directrices de Material Design de Google, ofreciendo una interfaz de usuario consistente, responsiva y estéticamente atractiva.
  - **SweetAlert:** Librería para la creación de mensajes emergentes (popups) personalizados y visualmente agradables, mejorando la interacción y retroalimentación con el usuario.
  - **Moment:** Librería para el manejo, formateo y manipulación de fechas y horas de manera sencilla y eficiente, facilitando la gestión de información temporal en la aplicación.
  - **Multer:** Middleware para gestionar la subida de archivos y fotos, facilitando la manipulación y almacenamiento de archivos en el servidor.
  - **Cropper:** Herramienta para la edición y recorte de imágenes, utilizada para permitir a los usuarios personalizar sus fotos de perfil de manera intuitiva y precisa.
  - **jwt-decode:** Librería para decodificar los tokens JWT, permitiendo extraer información contenida en el token sin verificar su firma.
  
- **Backend:**
  - **ExpressJS:** Framework minimalista para Node.js que simplifica la creación de servidores web y APIs RESTful, proporcionando una estructura flexible y extensible para manejar rutas, middleware y solicitudes HTTP.
  - **CORS:** Middleware para Express que gestiona las políticas de intercambio de recursos de origen cruzado, permitiendo que la aplicación frontend se comunique de manera segura con el backend desde diferentes dominios.
  - **Nodemon:** Herramienta de desarrollo que reinicia automáticamente el servidor backend cada vez que se detectan cambios en los archivos del proyecto, mejorando la eficiencia y fluidez durante el desarrollo.
  - **MySQL:** Sistema de gestión de bases de datos relacional ampliamente utilizado para almacenar y gestionar los datos de la aplicación de manera estructurada y eficiente.
  - **Sequelize:** ORM (Object-Relational Mapping) para Node.js que facilita la interacción con la base de datos MySQL, permitiendo definir modelos de datos y realizar consultas de manera más intuitiva y segura.
  - **JSON Web Token (JWT):** Estándar para la creación y verificación de tokens de autenticación, utilizado para asegurar las rutas y gestionar la autenticación y autorización de usuarios en la aplicación.
  - **Bcrypt:** Librería para encriptar contraseñas de manera segura, garantizando que las credenciales de los usuarios se almacenen de forma protegida en la base de datos.
  
- **Base de Datos:**
  - **MySQL Workbench:** Herramienta visual para el diseño, modelado y administración de bases de datos MySQL, que facilita la creación de esquemas, la ejecución de consultas y el mantenimiento de la estructura de datos del proyecto.

## 3. Pasos realizados

1. **Diseño de la Base de Datos:**
   - Se diseñó un esquema en MySQL Workbench que incluye tablas para administradores, profesores, alumnos, valoraciones y mensajes.
   
2. **Configuración del Backend:**
   - Inicialización del proyecto Node.js con ExpressJS.
   - Configuración de Sequelize para la conexión y gestión de la base de datos MySQL.
   - Implementación de rutas para la gestión de usuarios, profesores y autenticación.
   
3. **Desarrollo del Frontend:**
   - Creación del proyecto Angular utilizando Angular CLI.
   - Diseño de componentes para formularios de registro, login, listados de profesores, mapas y perfiles de usuario.
   - Integración de Angular Material para una interfaz responsiva y moderna.
   
4. **Integración de Librerías:**
   - Implementación de SweetAlert para mejorar la interacción con el usuario mediante mensajes emergentes.
   - Uso de Moment para manejar y formatear fechas en la aplicación.
   - Utilización de Multer y Cropper para la gestión y edición de imágenes de perfil de los profesores.
   
5. **Autenticación y Seguridad:**
   - Implementación de JWT para manejar tokens de autenticación.
   - Encriptación de contraseñas con bcrypt para asegurar la información sensible.
   
6. **Pruebas y Despliegue:**
   - Configuración de nodemon para facilitar el desarrollo backend.
   - Pruebas de funcionalidades y aseguramiento de la correcta interacción entre frontend y backend.
   
7. **Documentación y Mantenimiento:**
   - Creación de la documentación del proyecto en la carpeta `doc`, incluyendo diagramas de la base de datos y ejemplos de peticiones REST.
   - Configuración de `.gitattributes` para la gestión adecuada de archivos en el repositorio Git.

## 4. Resolución de la actividad

### 4.1. Creación de la Base de Datos en MySQL Workbench

Se diseñó el esquema `WebApp` con las siguientes tablas principales:

- **Usuarios:** Gestiona la información de administradores, profesores y alumnos.
- **Profesores:** Detalles específicos de los profesores, incluyendo su especialidad, experiencia y ubicación.
- **Alumnos:** Información de los alumnos registrados en la plataforma.
- **Valoraciones:** Puntuaciones y opiniones de los alumnos sobre los profesores.
- **Mensajes:** Comunicación entre alumnos y profesores.

**Ejemplo de creación de la tabla Usuarios:**

```sql
CREATE TABLE IF NOT EXISTS `WebApp`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('ADMIN', 'PROFESOR', 'ALUMNO') NOT NULL,
  PRIMARY KEY (`id`)
);
### 4.2. **Configuración del Backend con ExpressJS y Sequelize**

**Conexión a la base de datos usando Sequelize:**

```javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('WebApp', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Conexión exitosa a la base de datos.'))
  .catch(err => console.error('Error de conexión:', err));

module.exports = sequelize;
```

**Definición del modelo Usuario:**

```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('ADMIN', 'PROFESOR', 'ALUMNO'),
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;
```

**Implementación de rutas de autenticación:**

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
```

**Controlador de autenticación:**

```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, email, password: hashedPassword, rol });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, 'secreto', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### 4.3. **Desarrollo del Frontend con Angular**

**Creación del proyecto Angular:**

```bash
ng new teacher-app
cd teacher-app
```

**Instalación de librerías adicionales:**

```bash
npm install sweetalert2 moment multer cropperjs @angular/material @angular/cdk jwt-decode
```

**Implementación de servicios para comunicación con el backend:**

```typescript
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
}
```

**Creación de componentes para formularios de registro y login:**

```bash
ng generate component components/register
ng generate component components/login
```

**Ejemplo de formulario de registro:**

```html
<!-- src/app/components/register/register.component.html -->
<form (ngSubmit)="onRegister()" [formGroup]="registerForm">
  <mat-form-field>
    <mat-label>Nombre</mat-label>
    <input matInput formControlName="nombre" required>
  </mat-form-field>
  
  <mat-form-field>
    <mat-label>Email</mat-label>
    <input matInput formControlName="email" required>
  </mat-form-field>
  
  <mat-form-field>
    <mat-label>Contraseña</mat-label>
    <input matInput type="password" formControlName="password" required>
  </mat-form-field>
  
  <mat-form-field>
    <mat-label>Rol</mat-label>
    <mat-select formControlName="rol" required>
      <mat-option value="PROFESOR">Profesor</mat-option>
      <mat-option value="ALUMNO">Alumno</mat-option>
    </mat-select>
  </mat-form-field>
  
  <button mat-raised-button color="primary" type="submit">Registrar</button>
</form>
```

**Controlador del componente de registro:**

```typescript
// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        res => {
          Swal.fire('Éxito', 'Registro completado', 'success');
        },
        err => {
          Swal.fire('Error', err.error.message, 'error');
        }
      );
    }
  }
}
```

### 4.4. **Implementación de Rutas Protegidas y Roles de Usuario**

**Guarda de autenticación:**

```typescript
// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
```

**Protección de rutas en el módulo de rutas:**

```typescript
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### 4.5. **Implementación de Funcionalidades Adicionales**

- **Filtrado de Profesores:**
  - Implementación de filtros por ramas de conocimiento, precio por hora, experiencia y puntuación en el listado de profesores.
  
- **Mapa de Localización:**
  - Integración de una API de mapas (por ejemplo, Google Maps) para mostrar la ubicación de los profesores.
  
- **Gestión de Imágenes:**
  - Uso de Multer para la subida de imágenes y Cropper para la edición de fotos de perfil.
  
- **Valoraciones y Opiniones:**
  - Implementación de un sistema donde los alumnos pueden puntuar y dejar opiniones sobre los profesores.
  
- **Chat en Tiempo Real:**
  - Implementación de un sistema de chat en tiempo real para la comunicación entre alumnos y profesores.

### 5. **Posibles propuestas de mejora para el futuro**

1. **Chat en Tiempo Real:** 
   - Ya implementado por E, permitiendo la comunicación instantánea entre alumnos y profesores.
   
2. **Pago Integrado:** 
   - Integrar pasarelas de pago para facilitar las transacciones entre alumnos y profesores.
   
3. **Optimización de Búsqueda:** 
   - Mejorar los algoritmos de búsqueda y filtrado para una experiencia de usuario más eficiente.
   
4. **Versionamiento de Perfiles:** 
   - Implementar un historial de cambios en los perfiles de profesores para mayor transparencia.
   
5. **Soporte Multilenguaje:** 
   - Añadir soporte para múltiples idiomas para ampliar el alcance de la aplicación.
   
6. **Decodificación de JWT:** 
   - Implementar una librería para decodificar los tokens JWT, como `jwt-decode`, que permite extraer información del token sin verificar su firma.

### 6. **Lo interesante del proyecto**

El desarrollo de **Teach4dev: WebApp** ha sido una experiencia enriquecedora que ha permitido combinar diversas tecnologías para crear una plataforma funcional y útil. La integración de Angular con ExpressJS y Sequelize para gestionar una base de datos robusta ha demostrado la eficacia de las arquitecturas modernas en el desarrollo web. Además, la implementación de funcionalidades como la localización de profesores en mapas y la gestión de imágenes ha añadido un valor significativo a la aplicación, mejorando la experiencia del usuario final.

### 7. **Lo que hemos aprendido durante la realización del proyecto**

- **Estructuración de Aplicaciones Full Stack:** 
  - Comprender cómo conectar y coordinar frontend y backend para crear aplicaciones web completas.
  
- **Uso de Frameworks Modernos:** 
  - Profundizar en el uso de Angular para construir interfaces de usuario dinámicas y responsivas.
  - Aprender a manejar ExpressJS para desarrollar servidores backend eficientes.
  
- **Gestión de Bases de Datos con Sequelize:** 
  - Diseñar y gestionar bases de datos relacionales utilizando Sequelize como ORM.
  
- **Autenticación y Seguridad:** 
  - Implementar sistemas de autenticación robustos con JWT y encriptación de contraseñas con bcrypt.
  
- **Integración de Librerías y Herramientas:** 
  - Aprender a integrar y utilizar diversas librerías para mejorar la funcionalidad y usabilidad de la aplicación.
  
- **Desarrollo Colaborativo y Control de Versiones:** 
  - Utilizar Git y GitHub para el manejo de versiones y la colaboración en equipo.
  
- **Buenas Prácticas de Desarrollo:** 
  - Aplicar principios de diseño limpio, modularidad y escalabilidad en el desarrollo de software.
  
- **Resolución de Problemas y Depuración:** 
  - Mejorar habilidades para identificar y resolver problemas técnicos durante el desarrollo.
  
- **Trabajo en Equipo Efectivo:** 
  - Aprender a trabajar en grupo de forma efectiva, colaborativa y comunicativa, simulando la dinámica de un equipo de desarrolladores web full stack profesional.

En resumen, este proyecto ha consolidado conocimientos en desarrollo web full stack, fomentando habilidades tanto en frontend como en backend, y preparando para enfrentar desafíos futuros en el ámbito del desarrollo de aplicaciones.

### ANEXOS:
### **A) Instalación y Uso**

**A-1) Requisitos Previos**

- **Node.js** (v14 o superior)
- **npm** (v6 o superior)
- **Angular CLI** (v14 o superior)
- **MySQL** (v5.7 o superior)

**A-2) Clonar el Repositorio**

```bash
git clone https://github.com/tu-usuario/teach4dev-WebApp.git
cd teach4dev-WebApp
```

**A-3) Configuración del Backend**

1. **Instalar Dependencias:**
   
2. ```bash
   cd backend
   npm install
   ```
   
3. **Configurar la Base de Datos:**
   - Crear una base de datos llamada **WebApp** en MySQL Workbench.
   - Configurar las credenciales en el archivo `config/database.js`.
   
4. **Migrar y Poblar la Base de Datos:**
   
5. ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
   
6. **Iniciar el Servidor Backend:**
   
7. ```bash
   npm run dev
   ```

**A-4) Configuración del Frontend**

1. **Instalar Dependencias:**
   
2. ```bash
   cd frontend
   npm install
   ```
   
3. **Iniciar la Aplicación Angular:**
   
4. ```bash
   ng serve
   ```
   
5. **Acceder a la Aplicación:**
   - Abrir el navegador y navegar a [http://localhost:4200](http://localhost:4200)

**A-5) Scripts Útiles**

- **Backend:**
  - `npm start`: Iniciar el servidor en modo producción.
  - `npm run dev`: Iniciar el servidor en modo desarrollo con nodemon.
  
- **Frontend:**
  - `ng serve`: Iniciar el servidor de desarrollo de Angular.
  - `ng build`: Compilar la aplicación para producción.

**A-6) Estructura del Proyecto**

- `backend/`: Contiene el código del servidor ExpressJS.
  - `controllers/`: Controladores de rutas.
  - `models/`: Modelos de Sequelize.
  - `routes/`: Definición de rutas.
  - `config/`: Configuraciones de la base de datos.
  - `middleware/`: Middleware para autenticación.
  - `app.js`: Archivo principal del servidor.
  
- `frontend/`: Contiene el código de la aplicación Angular.
  - `src/app/components/`: Componentes de Angular.
  - `src/app/services/`: Servicios para comunicación con el backend.
  - `src/app/guards/`: Guards para rutas protegidas.
  - `src/app/models/`: Modelos de datos.
  - `app-routing.module.ts`: Definición de rutas.
  - `app.module.ts`: Módulo principal de Angular.
  
- `doc/`: Documentación del proyecto.
  - Diagramas de la base de datos, scripts SQL, capturas de pantalla, etc.

**B) Contribuciones**

Las contribuciones son bienvenidas. Por favor, abre un **issue** o un **pull request** para cualquier mejora o corrección.

**C) Licencia**

Este proyecto está bajo la **licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

________________________________________

¡Gracias por usar **Teach4dev: WebApp**!

