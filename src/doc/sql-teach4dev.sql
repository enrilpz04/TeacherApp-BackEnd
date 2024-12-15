CREATE SCHEMA IF NOT EXISTS teach4dev;
USE teach4dev;

-- Crear tabla users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  rol ENUM('admin', 'student', 'teacher') NOT NULL
);

-- Crear tabla knowledges
CREATE TABLE IF NOT EXISTS knowledges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Crear tabla teachers
CREATE TABLE IF NOT EXISTS teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description TEXT NOT NULL, -- Descripción perfil profesores
  schedule ENUM('Morning', 'Afternoon', 'Night') NOT NULL,
  price_p_hour FLOAT NOT NULL,
  experience VARCHAR(255) NOT NULL, -- Experiencia corta y resumida
  rating FLOAT NOT NULL,
  validated BOOLEAN NOT NULL,
  latitude VARCHAR(255) NOT NULL,
  longitude VARCHAR(255) NOT NULL,
  userId INT,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Crear tabla TeacherKnowledge (tabla intermedia)
CREATE TABLE IF NOT EXISTS TeacherKnowledge (
  teacherId INT,
  knowledgeId INT,
  PRIMARY KEY (teacherId, knowledgeId),
  FOREIGN KEY (teacherId) REFERENCES teachers(id),
  FOREIGN KEY (knowledgeId) REFERENCES knowledges(id)
);

-- Crear tabla messages
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text TEXT NOT NULL,
  date DATETIME NOT NULL,
    watched BOOLEAN NOT NULL DEFAULT FALSE,
  senderId INT NOT NULL,
  recipientId INT NOT NULL,
  FOREIGN KEY (senderId) REFERENCES users(id),
  FOREIGN KEY (recipientId) REFERENCES users(id)
);

-- Crear tabla notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM(
    'new_teacher_registration',
    'teacher_validation',
    'booking_created',
    'booking_confirmed',
    'booking_cancelled',
    'new_message',
    'new_review',
    'profile_updated',
    'booking_status_change',
    'upcoming_class'
  ) NOT NULL,
  message TEXT NOT NULL,
  date DATETIME NOT NULL,
  watched BOOLEAN NOT NULL DEFAULT FALSE,
  userId INT,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Crear tabla bookings
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  startTime TIME NOT NULL,
  status ENUM(
    'pending', 
    'confirmed', 
    'cancelled', 
    'completed',
    'archived'
    ) NOT NULL,
  studentId INT,
  teacherId INT,
  FOREIGN KEY (studentId) REFERENCES users(id),
  FOREIGN KEY (teacherId) REFERENCES teachers(id)
);

-- Crear tabla reviews
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rating FLOAT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  userId INT,
  teacherId INT,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (teacherId) REFERENCES teachers(id)
);

-- Insertar Datos de Prueba en la Tabla users (contraseña 'password123' encriptada con bcrypt)
-- Insertar 10 profesores
INSERT INTO users (id, name, surname, email, password, avatar, rol) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'teacher'),
(2, 'Ana', 'García', 'ana.garcia@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'teacher'),
(3, 'Mateo', 'Rodríguez', 'mateo.rodriguez@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'teacher'),
(4, 'Emilia', 'López', 'emilia.lopez@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'teacher'),
(5, 'David', 'Martínez', 'david.martinez@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'teacher'),
(6, 'Sofía', 'Hernández', 'sofia.hernandez@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'teacher'),
(7, 'Jorge', 'Ramírez', 'jorge.ramirez@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'teacher'),
(8, 'Raúl', 'Ibárruri', 'raul.ibarruri@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'teacher'),
(9, 'William', 'Andrés', 'william.andres@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'teacher'),
(10, 'Isabella', 'Toral', 'isabella.toral@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'teacher');

-- Insertar 10 estudiantes
INSERT INTO users (id, name, surname, email, password, avatar, rol) VALUES
(11, 'Ethan', 'Tomás', 'ethan.tomas@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'student'),
(12, 'Ava', 'Moreno', 'ava.moreno@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'student'),
(13, 'Alexander', 'Jackson', 'alexander.jackson@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'student'),
(14, 'Mía', 'Blanco', 'mia.blanco@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'student'),
(15, 'Logan', 'Hernández', 'logan.hernandez@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'student'),
(16, 'Charlotte', 'Clarke', 'charlotte.clarke@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'student'),
(17, 'Lucas', 'León', 'lucas.leon@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'student'),
(18, 'Laura', 'Walker', 'laura.walker@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'student'),
(19, 'Henry', 'Hall', 'henry.hall@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'student'),
(20, 'Petra', 'Muñoz', 'petra.munoz@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'student');

-- Insertar un administrador
INSERT INTO users (id, name, surname, email, password, avatar, rol) VALUES
(21, 'Administrador', 'Sistema', 'admin.sistema@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T9oBB0YjFyPQ2QOQ8KR/m', NULL, 'admin');

-- Insertar Tecnologías en la Tabla knowledges
INSERT INTO knowledges (id, name) VALUES
(1, 'Python'),
(2, 'JavaScript'),
(3, 'Java'),
(4, 'C++'),
(5, 'Ruby'),
(6, 'PHP'),
(7, 'Swift'),
(8, 'Go'),
(9, 'Kotlin'),
(10, 'R'),
(11, 'React'),
(12, 'Node.js'),
(13, 'SQL'),
(14, 'Machine Learning'),
(15, 'Docker'),
(16, 'Kubernetes'),
(17, 'DevOps'),
(18, 'Unity'),
(19, 'Ciberseguridad'),
(20, 'Data Analysis'),
(21, 'Vue.js');

-- Insertar Datos de Prueba en la Tabla teachers
-- Insertar 10 profesores en la tabla teachers con userId de 1 a 10
INSERT INTO teachers (id, description, schedule, price_p_hour, experience, rating, validated, latitude, longitude, userId) VALUES
(1, 'Soy un desarrollador apasionado de Python con amor por la enseñanza. He trabajado en diversos proyectos que van desde el desarrollo web hasta la ciencia de datos.', 'Morning', 30.0, '5 años en Python', 4.5, TRUE, '40.7128', '-74.0060', 1), -- Juan Pérez
(2, 'JavaScript es mi fuerte. Disfruto construyendo aplicaciones web interactivas y enseñando a otros cómo hacer lo mismo.', 'Afternoon', 40.0, '10 años en JavaScript', 4.7, TRUE, '34.0522', '-118.2437', 2), -- Ana García
(3, 'Java ha sido mi lenguaje principal por más de una década. Me especializo en desarrollo backend y soluciones empresariales.', 'Night', 25.0, '10 años en Java', 4.2, TRUE, '51.5074', '-0.1278', 3), -- Mateo Rodríguez
(4, 'Tengo amplia experiencia en C++ y he enseñado a numerosos estudiantes a lo largo de los años.', 'Morning', 35.0, '8 años en C++', 4.6, TRUE, '48.8566', '2.3522', 4), -- Emilia López
(5, 'Ruby on Rails es mi especialidad. Me encanta construir aplicaciones web y enseñar a otros.', 'Afternoon', 45.0, '7 años en Ruby', 4.8, TRUE, '35.6895', '139.6917', 5), -- David Martínez
(6, 'Desarrollador full-stack con más de 10 años de experiencia en tecnologías como JavaScript, React, Node.js y bases de datos relacionales. Mi enfoque es enseñar prácticas modernas de desarrollo y buenas prácticas de codificación.', 'Morning', 35.0, '10 años en desarrollo web', 4.9, TRUE, '40.4168', '-3.7038', 6), -- Sofía Hernández
(7, 'Ingeniero de software con especialidad en desarrollo backend. Trabajo con Python, Django y sistemas distribuidos. Ayudo a mis estudiantes a construir aplicaciones robustas y escalables.', 'Afternoon', 40.0, 'Experta en Python y backend', 4.8, TRUE, '48.8566', '2.3522', 7), -- Jorge Ramírez
(8, 'Programador especializado en desarrollo móvil para iOS y Android. Enseño desde los fundamentos de Swift y Kotlin hasta cómo publicar apps en las tiendas.', 'Night', 50.0, 'Desarrollador móvil certificado', 4.7, TRUE, '41.9028', '12.4964', 8), -- Raúl Ibárruri
(9, 'Desarrolladora front-end apasionada por crear interfaces atractivas y funcionales. Tengo experiencia con React, Vue.js y animaciones web. Mis clases son ideales para quienes quieren destacar en diseño web.', 'Morning', 30.0, '5 años como front-end', 4.7, TRUE, '38.7169', '-9.1390', 9), -- William Andrés
(10, 'Especialista en inteligencia artificial y machine learning. Enseño cómo trabajar con frameworks como TensorFlow y PyTorch, además de abordar problemas complejos de datos.', 'Afternoon', 60.0, 'Experto en IA y ML', 4.9, TRUE, '50.1109', '8.6821', 10); -- Isabella Toral

-- Relacionar Profesores con Tecnologías en la Tabla TeacherKnowledge
-- Relacionar únicamente profesores 1 a 10 con sus tecnologías
INSERT INTO TeacherKnowledge (teacherId, knowledgeId) VALUES
(1, 1),   -- Juan Pérez: Python
(2, 2),   -- Ana García: JavaScript
(3, 3),   -- Mateo Rodríguez: Java
(4, 4),   -- Emilia López: C++
(5, 5),   -- David Martínez: Ruby
(6, 2),   -- Sofía Hernández: JavaScript
(6, 11),  -- Sofía Hernández: React
(6, 12),  -- Sofía Hernández: Node.js
(6, 13),  -- Sofía Hernández: SQL
(7, 1),   -- Jorge Ramírez: Python
(7, 13),  -- Jorge Ramírez: SQL
(7, 15),  -- Jorge Ramírez: Docker
(7, 16),  -- Jorge Ramírez: Kubernetes
(8, 7),   -- Raúl Ibárruri: Swift
(8, 9),   -- Raúl Ibárruri: Kotlin
(9, 2),   -- William Andrés: JavaScript
(9, 11),  -- William Andrés: React
(9, 21),  -- William Andrés: Vue.js
(10, 1),  -- Isabella Toral: Python
(10, 14), -- Isabella Toral: Machine Learning
(10, 19); -- Isabella Toral: Data Analysis

-- Insertar Mensajes entre Profesores y Estudiantes
-- Profesor 1: Juan Pérez (userId=1), Estudiantes: Ethan Tomás (userId=11) y Ava Moreno (userId=12)
INSERT INTO messages (text, date, watched, senderId, recipientId) VALUES
('Hola Juan, estoy interesado en tus clases de desarrollo web. ¿Podríamos hablar más sobre horarios?', '2024-12-07 10:00:00', FALSE, 11, 1),
('Claro Ethan, mis clases están disponibles por las mañanas. ¿Qué temas te interesan más?', '2024-12-07 11:00:00', TRUE, 1, 11),
('Juan, ¿tus clases incluyen frameworks como React?', '2024-12-07 12:00:00', FALSE, 11, 1),
('¡Sí, por supuesto! React es uno de los principales temas que cubro en mis lecciones.', '2024-12-07 12:30:00', TRUE, 1, 11),

('Hola Juan, estoy buscando aprender Node.js desde cero. ¿Crees que podrías ayudarme?', '2024-12-06 14:00:00', FALSE, 12, 1),
('Hola Ava, definitivamente puedo ayudarte. ¿Tienes alguna experiencia previa con JavaScript?', '2024-12-06 15:00:00', TRUE, 1, 12),
('Tengo conocimientos básicos. Me interesa aprender cómo construir APIs.', '2024-12-06 16:00:00', FALSE, 12, 1),
('Perfecto, podemos estructurar nuestras clases para cubrir eso. ¡Empezamos cuando quieras!', '2024-12-06 16:30:00', TRUE, 1, 12),

-- Profesor 2: Ana García (userId=2), Estudiantes: Alexander Jackson (userId=13) y Mía Blanco (userId=14)
('Hola Ana, quiero mejorar mis habilidades en Python. ¿Qué nivel manejas?', '2024-12-05 09:00:00', FALSE, 13, 2),
('Hola Alexander, soy experta en Python, especialmente para backend y análisis de datos. ¿Cuál es tu objetivo principal?', '2024-12-05 10:00:00', TRUE, 2, 13),
('Mi objetivo es aprender a desarrollar aplicaciones web con Flask o Django.', '2024-12-05 11:00:00', FALSE, 13, 2),
('Podemos trabajar en eso. Además, puedo enseñarte cómo conectarlo con bases de datos como SQL.', '2024-12-05 12:00:00', TRUE, 2, 13),

('Ana, estoy interesado en aprender Machine Learning. ¿Es algo que enseñas?', '2024-12-07 17:00:00', FALSE, 14, 2),
('¡Claro que sí, Mía! Trabajo mucho con Machine Learning usando frameworks como TensorFlow. ¿Tienes experiencia previa?', '2024-12-07 18:00:00', TRUE, 2, 14),
('No mucha, pero tengo conocimientos básicos en Python.', '2024-12-07 19:00:00', FALSE, 14, 2),
('Perfecto, entonces podemos empezar por fundamentos y avanzar hacia proyectos prácticos.', '2024-12-07 20:00:00', TRUE, 2, 14),

-- Profesor 3: Mateo Rodríguez (userId=3), Estudiantes: Logan Hernández (userId=15) y Charlotte Clarke (userId=16)
('Hola Mateo, quiero aprender Swift para desarrollo móvil. ¿Es algo que manejas?', '2024-12-06 08:00:00', FALSE, 15, 3),
('Sí, Logan, soy desarrollador móvil. Puedo enseñarte Swift desde lo básico hasta técnicas avanzadas.', '2024-12-06 09:00:00', TRUE, 3, 15),
('Excelente, ¿tus clases incluyen ejercicios prácticos?', '2024-12-06 10:00:00', FALSE, 15, 3),
('¡Por supuesto! Aprenderás creando aplicaciones reales.', '2024-12-06 11:00:00', TRUE, 3, 15),

('Mateo, ¿enseñas desarrollo móvil para Android?', '2024-12-08 09:00:00', FALSE, 16, 3),
('¡Sí, Charlotte! Trabajo con Kotlin para Android. ¿Quieres enfocarte en algo específico?', '2024-12-08 10:00:00', TRUE, 3, 16),
('Quiero aprender a publicar aplicaciones en Play Store.', '2024-12-08 11:00:00', FALSE, 16, 3),
('Eso es genial. Mis clases incluyen ese proceso. ¡Empezamos pronto!', '2024-12-08 12:00:00', TRUE, 3, 16),

-- Profesor 4: Emilia López (userId=4), Estudiantes: Lucas León (userId=17) y Laura Walker (userId=18)
('Hola Emilia, ¿tus clases incluyen diseño de interfaces con Figma?', '2024-12-05 09:00:00', FALSE, 17, 4),
('Sí, Lucas. Incluyen diseño con Figma y mejores prácticas para front-end.', '2024-12-05 10:00:00', TRUE, 4, 17),
('Perfecto, quiero aprender a trabajar en proyectos colaborativos.', '2024-12-05 11:00:00', FALSE, 17, 4),
('Eso es fundamental, lo practicaremos con ejemplos reales.', '2024-12-05 12:00:00', TRUE, 4, 17),

('Emilia, quiero aprender animaciones en CSS. ¿Puedes enseñarme?', '2024-12-07 17:00:00', FALSE, 18, 4),
('¡Por supuesto, Laura! Las animaciones son un tema divertido. ¿Conoces lo básico de CSS?', '2024-12-07 18:00:00', TRUE, 4, 18),
('Sí, pero quiero mejorar y hacer cosas más avanzadas.', '2024-12-07 19:00:00', FALSE, 18, 4),
('Genial, haremos proyectos interesantes. ¡Hablemos de horarios!', '2024-12-07 20:00:00', TRUE, 4, 18),

-- Profesor 5: David Martínez (userId=5), Estudiantes: Henry Hall (userId=19) y Petra Muñoz (userId=20)
('Hola David, estoy buscando mejorar mis habilidades en Docker. ¿Puedes ayudarme?', '2024-12-06 08:00:00', FALSE, 19, 5),
('Claro, Henry. Docker es una herramienta clave. ¿En qué áreas necesitas ayuda?', '2024-12-06 09:00:00', TRUE, 5, 19),
('Principalmente en la creación de contenedores y configuración avanzada.', '2024-12-06 10:00:00', FALSE, 19, 5),
('Perfecto, tengo material que te será útil. ¡Empezamos pronto!', '2024-12-06 11:00:00', TRUE, 5, 19),

('David, ¿tus clases incluyen Kubernetes?', '2024-12-08 09:00:00', FALSE, 20, 5),
('Sí, Petra. Kubernetes es uno de mis temas favoritos. ¿Qué nivel tienes?', '2024-12-08 10:00:00', TRUE, 5, 20),
('Básico, pero quiero aprender a orquestar servicios.', '2024-12-08 11:00:00', FALSE, 20, 5),
('Eso es genial. Empezaremos con los fundamentos y avanzaremos hacia configuraciones avanzadas.', '2024-12-08 12:00:00', TRUE, 5, 20),

-- Profesor 6: Sofía Hernández (userId=6), Estudiantes: Ethan Tomás (userId=11) y Ava Moreno (userId=12)
('Hola Sofía, estoy interesado en aprender desarrollo de videojuegos. ¿Podemos hablar más sobre tus clases?', '2024-12-07 10:00:00', FALSE, 11, 6),
('Claro Ethan, mis clases incluyen desarrollo en Unity y Unreal Engine. ¿Tienes experiencia previa?', '2024-12-07 11:00:00', TRUE, 6, 11),
('No tengo experiencia, pero estoy motivado para aprender desde cero.', '2024-12-07 12:00:00', FALSE, 11, 6),
('¡Genial! Empezaremos con lo básico y poco a poco construiremos proyectos interesantes.', '2024-12-07 12:30:00', TRUE, 6, 11),

('Sofía, ¿enseñas sobre diseño 3D para videojuegos?', '2024-12-06 14:00:00', FALSE, 12, 6),
('Hola Ava, sí, trabajamos con herramientas como Blender para el diseño 3D. ¿Te interesa un tema en particular?', '2024-12-06 15:00:00', TRUE, 6, 12),
('Me gustaría aprender a crear personajes para videojuegos.', '2024-12-06 16:00:00', FALSE, 12, 6),
('Perfecto, empezaremos por modelado básico y avanzaremos a técnicas más complejas.', '2024-12-06 16:30:00', TRUE, 6, 12),

-- Profesor 7: Jorge Ramírez (userId=7), Estudiantes: Santiago Ruiz (userId=17) y Mía Blanco (userId=14)
('Hola Jorge, estoy interesado en aprender sobre arquitectura de software. ¿Podrías ayudarme?', '2024-12-05 09:00:00', FALSE, 17, 7),
('Hola Santiago, claro que sí. Enseño principios de arquitectura y patrones de diseño. ¿Qué necesitas específicamente?', '2024-12-05 10:00:00', TRUE, 7, 17),
('Estoy interesado en aprender sobre microservicios y sistemas escalables.', '2024-12-05 11:00:00', FALSE, 17, 7),
('¡Genial! Podemos trabajar en ejemplos prácticos para implementar esos conceptos.', '2024-12-05 12:00:00', TRUE, 7, 17),

('Jorge, quiero aprender a diseñar proyectos grandes de software. ¿Tienes experiencia en esto?', '2024-12-07 17:00:00', FALSE, 14, 7),
('Hola Mía, claro que sí. Trabajo con proyectos grandes y puedo enseñarte herramientas para la gestión eficiente.', '2024-12-07 18:00:00', TRUE, 7, 14),
('Eso sería increíble. ¿También enseñas herramientas como UML o diagramas de arquitectura?', '2024-12-07 19:00:00', FALSE, 14, 7),
('¡Por supuesto! Empezaremos con eso para establecer buenas bases.', '2024-12-07 20:00:00', TRUE, 7, 14),

-- Profesor 8: Raúl Ibárruri (userId=8), Estudiantes: Logan Hernández (userId=15) y Charlotte Clarke (userId=16)
('Hola Raúl, quiero aprender sobre hacking ético. ¿Es algo que enseñas?', '2024-12-06 08:00:00', FALSE, 15, 8),
('Sí, Logan, enseño fundamentos de ciberseguridad y análisis de vulnerabilidades. ¿Qué nivel tienes?', '2024-12-06 09:00:00', TRUE, 8, 15),
('Tengo conocimientos básicos y me gustaría aprender más sobre protección de redes.', '2024-12-06 10:00:00', FALSE, 15, 8),
('¡Genial! Empezaremos por ahí y avanzaremos hacia ataques simulados para entender cómo defender sistemas.', '2024-12-06 11:00:00', TRUE, 8, 15),

('Raúl, ¿enseñas sobre protección de datos y auditorías de seguridad?', '2024-12-08 09:00:00', FALSE, 16, 8),
('Sí, Charlotte. Trabajo con auditorías de seguridad y estándares como ISO 27001. ¿Te interesa algo en particular?', '2024-12-08 10:00:00', TRUE, 8, 16),
('Quiero aprender a identificar vulnerabilidades en sistemas empresariales.', '2024-12-08 11:00:00', FALSE, 16, 8),
('Eso es perfecto. Haremos ejercicios prácticos para fortalecer tus habilidades.', '2024-12-08 12:00:00', TRUE, 8, 16),

-- Profesor 9: William Andrés (userId=9), Estudiantes: Santiago Ruiz (userId=17) y Mía Blanco (userId=14)
('Hola William, quiero aprender análisis de datos con herramientas modernas. ¿Podrías ayudarme?', '2024-12-05 09:00:00', FALSE, 17, 9),
('Hola Santiago, claro que sí. Enseño con herramientas como Tableau y Pandas. ¿Qué tipo de análisis te interesa?', '2024-12-05 10:00:00', TRUE, 9, 17),
('Principalmente análisis financiero y visualización de datos.', '2024-12-05 11:00:00', FALSE, 17, 9),
('¡Perfecto! Trabajaremos en proyectos relevantes para ese campo.', '2024-12-05 12:00:00', TRUE, 9, 17),

('William, ¿enseñas modelado avanzado en estadística?', '2024-12-07 17:00:00', FALSE, 18, 9),
('Sí, Laura. Puedo enseñarte desde fundamentos hasta modelos predictivos avanzados. ¿Conoces algo de estadística?', '2024-12-07 18:00:00', TRUE, 9, 18),
('Un poco, pero quiero profundizar más.', '2024-12-07 19:00:00', FALSE, 18, 9),
('Genial, empezaremos con ejercicios prácticos para dominar las bases.', '2024-12-07 20:00:00', TRUE, 9, 18),

-- Profesor 10: Isabella Toral (userId=10), Estudiantes: Henry Hall (userId=19) y Petra Muñoz (userId=20)
('Hola Isabella, ¿enseñas sobre integración continua y despliegue en la nube?', '2024-12-06 08:00:00', FALSE, 19, 10),
('Hola Henry, sí, enseño sobre CI/CD y gestión de infraestructuras en la nube. ¿Qué nivel tienes?', '2024-12-06 09:00:00', TRUE, 10, 19),
('Básico, pero quiero aprender a usar herramientas como Jenkins y AWS.', '2024-12-06 10:00:00', FALSE, 19, 10),
('¡Perfecto! Empezaremos con ejemplos prácticos para que aprendas rápido.', '2024-12-06 11:00:00', TRUE, 10, 19),

('Isabella, ¿enseñas sobre Docker y Kubernetes?', '2024-12-08 09:00:00', FALSE, 20, 10),
('Hola Petra, sí, Docker y Kubernetes son mis temas favoritos. ¿Qué necesitas aprender?', '2024-12-08 10:00:00', TRUE, 10, 20),
('Quiero aprender a gestionar aplicaciones en contenedores.', '2024-12-08 11:00:00', FALSE, 20, 10),
('Eso es genial. Empezaremos por lo básico y luego haremos configuraciones avanzadas.', '2024-12-08 12:00:00', TRUE, 10, 20);

-- Insertar Reservas de Clases en la Tabla bookings
INSERT INTO bookings (id, date, startTime, status, studentId, teacherId) VALUES
(1, '2024-12-09', '09:00:00', 'confirmed', 11, 1), -- Ethan Tomás con Juan Pérez
(2, '2024-12-10', '10:00:00', 'pending', 12, 1),   -- Ava Moreno con Juan Pérez
(3, '2024-12-11', '11:00:00', 'cancelled', 13, 1), -- Alexander Jackson con Juan Pérez

(4, '2024-12-12', '09:00:00', 'confirmed', 14, 2), -- Mía Blanco con Ana García
(5, '2024-12-13', '10:00:00', 'completed', 15, 2), -- Logan Hernández con Ana García
(6, '2024-12-14', '12:00:00', 'pending', 16, 2),   -- Charlotte Clarke con Ana García

(7, '2024-12-09', '13:00:00', 'confirmed', 17, 3), -- Santiago Ruiz con Mateo Rodríguez
(8, '2024-12-10', '14:00:00', 'completed', 18, 3), -- Mía Blanco con Mateo Rodríguez
(9, '2024-12-11', '15:00:00', 'cancelled', 19, 3), -- Henry Hall con Mateo Rodríguez

(10, '2024-12-12', '12:00:00', 'confirmed', 20, 4), -- Petra Muñoz con Emilia López
(11, '2024-12-13', '13:00:00', 'completed', 11, 4), -- Ethan Tomás con Emilia López
(12, '2024-12-14', '14:00:00', 'pending', 12, 4),   -- Ava Moreno con Emilia López

(13, '2024-12-09', '17:00:00', 'confirmed', 13, 5), -- Alexander Jackson con David Martínez
(14, '2024-12-10', '18:00:00', 'completed', 14, 5), -- Mía Blanco con David Martínez
(15, '2024-12-11', '19:00:00', 'pending', 15, 5),   -- Logan Hernández con David Martínez

(16, '2024-12-12', '16:00:00', 'confirmed', 16, 6), -- Charlotte Clarke con Sofía Hernández
(17, '2024-12-13', '17:00:00', 'completed', 17, 6), -- Santiago Ruiz con Sofía Hernández
(18, '2024-12-14', '18:00:00', 'pending', 18, 6),   -- Mía Blanco con Sofía Hernández

(19, '2024-12-09', '09:00:00', 'confirmed', 19, 7), -- Henry Hall con Jorge Ramírez
(20, '2024-12-10', '10:00:00', 'completed', 20, 7), -- Petra Muñoz con Jorge Ramírez
(21, '2024-12-11', '12:00:00', 'pending', 11, 7),   -- Ethan Tomás con Jorge Ramírez

(22, '2024-12-12', '13:00:00', 'confirmed', 12, 8), -- Ava Moreno con Raúl Ibárruri
(23, '2024-12-13', '14:00:00', 'completed', 13, 8), -- Alexander Jackson con Raúl Ibárruri
(24, '2024-12-14', '15:00:00', 'pending', 14, 8),   -- Mía Blanco con Raúl Ibárruri

(25, '2024-12-09', '12:00:00', 'confirmed', 15, 9), -- Logan Hernández con William Andrés
(26, '2024-12-10', '13:00:00', 'completed', 16, 9), -- Charlotte Clarke con William Andrés
(27, '2024-12-11', '14:00:00', 'pending', 17, 9),   -- Santiago Ruiz con William Andrés

(28, '2024-12-12', '16:00:00', 'confirmed', 18, 10), -- Mía Blanco con Isabella Toral
(29, '2024-12-13', '17:00:00', 'completed', 19, 10), -- Henry Hall con Isabella Toral
(30, '2024-12-14', '19:00:00', 'pending', 20, 10);   -- Petra Muñoz con Isabella Toral

-- Insertar Reviews en la Tabla reviews
-- Cada review es de un estudiante (userId=11-20) hacia un profesor (teacherId=1-10)
INSERT INTO reviews (id, rating, comment, date, userId, teacherId) VALUES
-- Profesor 1: Juan Pérez (teacherId=1)
(1, 4.5, 'Las clases fueron muy prácticas y se enfocaron en resolver problemas reales.', '2024-12-06 10:30:00', 11, 1),
(2, 5.0, 'Excelente profesor, siempre dispuesto a explicar con paciencia.', '2024-12-07 14:15:00', 12, 1),
(3, 4.0, 'Me ayudó a entender conceptos complejos de manera simple.', '2024-12-08 16:00:00', 13, 1),

-- Profesor 2: Ana García (teacherId=2)
(4, 5.0, 'Una maestra excepcional, sus ejemplos son claros y útiles.', '2024-12-06 09:45:00', 14, 2),
(5, 4.5, 'Aprendí mucho sobre optimización y mejores prácticas.', '2024-12-07 13:00:00', 15, 2),
(6, 3.5, 'Un poco apresurada en algunos temas, pero muy capacitada.', '2024-12-08 15:30:00', 16, 2),

-- Profesor 3: Mateo Rodríguez (teacherId=3)
(7, 4.8, 'La manera en que explica algoritmos es brillante.', '2024-12-06 12:00:00', 17, 3),
(8, 4.0, 'Buena enseñanza, aunque algunas clases fueron algo densas.', '2024-12-07 11:30:00', 18, 3),
(9, 5.0, 'Sabe mucho y lo transmite de manera efectiva.', '2024-12-08 14:20:00', 19, 3),

-- Profesor 4: Emilia López (teacherId=4)
(10, 4.7, 'Muy profesional y con un gran conocimiento en bases de datos.', '2024-12-06 10:50:00', 20, 4),
(11, 5.0, 'Entusiasta y motivadora, excelente experiencia.', '2024-12-07 14:10:00', 11, 4),
(12, 4.3, 'Cubrió todos los temas prometidos y más.', '2024-12-08 16:40:00', 12, 4),

-- Profesor 5: David Martínez (teacherId=5)
(13, 4.9, 'La mejor clase de programación que he tenido.', '2024-12-06 17:10:00', 13, 5),
(14, 5.0, 'Resolvió todas mis dudas sobre desarrollo web.', '2024-12-07 19:00:00', 14, 5),
(15, 4.0, 'Buen profesor, aunque a veces se extiende mucho.', '2024-12-08 18:30:00', 15, 5),

-- Profesor 6: Sofía Hernández (teacherId=6)
(16, 5.0, 'Muy inspiradora, me motivó a seguir aprendiendo.', '2024-12-06 20:10:00', 16, 6),
(17, 4.7, 'Sus explicaciones sobre seguridad son muy claras.', '2024-12-07 16:45:00', 17, 6),
(18, 4.5, 'Se preocupa por el aprendizaje de sus estudiantes.', '2024-12-08 18:00:00', 18, 6),

-- Profesor 7: Jorge Ramírez (teacherId=7)
(19, 4.8, 'Sus clases de arquitectura fueron increíbles.', '2024-12-06 10:15:00', 19, 7),
(20, 5.0, 'Siempre está disponible para consultas fuera de clase.', '2024-12-07 12:00:00', 20, 7),
(21, 4.5, 'Aprendí mucho sobre sistemas distribuidos.', '2024-12-08 14:30:00', 11, 7),

-- Profesor 8: Raúl Ibárruri (teacherId=8)
(22, 4.9, 'Muy metódico y enfocado en resolver problemas prácticos.', '2024-12-06 13:30:00', 12, 8),
(23, 4.7, 'Se toma el tiempo necesario para explicar todo a fondo.', '2024-12-07 15:00:00', 13, 8),
(24, 5.0, 'Clases dinámicas y bien estructuradas.', '2024-12-08 16:20:00', 14, 8),

-- Profesor 9: William Andrés (teacherId=9)
(25, 5.0, 'Gran conocimiento en DevOps, aprendí mucho sobre Docker.', '2024-12-06 13:45:00', 15, 9),
(26, 4.6, 'Muy claro al explicar conceptos complicados.', '2024-12-07 15:30:00', 16, 9),
(27, 4.8, 'Excelente enseñanza, lo recomiendo ampliamente.', '2024-12-08 16:50:00', 17, 9),

-- Profesor 10: Isabella Toral (teacherId=10)
(28, 4.9, 'Gran dominio de las herramientas de análisis de datos.', '2024-12-06 18:10:00', 18, 10),
(29, 4.5, 'Proporciona muchos ejemplos prácticos.', '2024-12-07 19:20:00', 19, 10),
(30, 5.0, 'La mejor profesora de análisis que he tenido.', '2024-12-08 17:40:00', 20, 10);

-- Insertar Notificaciones en la Tabla notifications
-- Insertar notificaciones para Profesores (userId=1-10)
INSERT INTO notifications (id, type, message, date, userId) VALUES
-- Profesor 1: Juan Pérez (userId=1)
(1, 'teacher_validation', 'Tu perfil ha sido validado. Ahora puedes empezar a recibir reservas.', NOW(), 1),
(2, 'booking_created', 'Tienes una nueva reserva del alumno Ethan Tomás, para el día 2024-12-10 a las 10:00.', NOW(), 1),
(3, 'booking_cancelled', 'La reserva del alumno Ethan Tomás para el día 2024-12-10 a las 10:00 ha sido cancelada.', NOW(), 1),

-- Profesor 2: Ana García (userId=2)
(4, 'profile_updated', 'Tu perfil ha sido actualizado exitosamente.', NOW(), 2),
(5, 'new_message', 'Tienes un nuevo mensaje del alumno Ava Moreno.', NOW(), 2),
(6, 'new_review', 'Has recibido una nueva reseña del alumno Ava Moreno.', NOW(), 2),

-- Profesor 3: Mateo Rodríguez (userId=3)
(7, 'profile_updated', 'Tu perfil ha sido actualizado exitosamente.', NOW(), 3),
(8, 'booking_created', 'Tienes una nueva reserva del alumno Santiago Ruiz, para el día 2024-12-11 a las 14:00.', NOW(), 3),
(9, 'new_message', 'Tienes un nuevo mensaje del alumno Santiago Ruiz.', NOW(), 3),
(10, 'booking_status_change', 'La reserva para tu clase con Santiago Ruiz ha cambiado a "confirmed".', NOW(), 3),

-- Profesor 4: Emilia López (userId=4)
(11, 'booking_created', 'Tienes una nueva reserva del alumno Mía Blanco, para el día 2024-12-12 a las 09:00.', NOW(), 4),
(12, 'booking_cancelled', 'La reserva del alumno Mía Blanco para el día 2024-12-12 a las 09:00 ha sido cancelada.', NOW(), 4),

-- Profesor 5: David Martínez (userId=5)
(13, 'booking_created', 'Tienes una nueva reserva del alumno Logan Hernández, para el día 2024-12-13 a las 11:00.', NOW(), 5),
(14, 'new_message', 'Tienes un nuevo mensaje del alumno Logan Hernández.', NOW(), 5),

-- Profesor 6: Sofía Hernández (userId=6)
(15, 'new_review', 'Has recibido una nueva reseña del alumno Charlotte Clarke.', NOW(), 6),
(16, 'booking_created', 'Tienes una nueva reserva del alumno Charlotte Clarke, para el día 2024-12-14 a las 10:00.', NOW(), 6),
(17, 'booking_status_change', 'La reserva para tu clase con Juan Pérez ha cambiado a "completed".', NOW(), 6),

-- Profesor 7: Jorge Ramírez (userId=7)
(18, 'booking_created', 'Tienes una nueva reserva del alumno Lucas León, para el día 2024-12-15 a las 13:00.', NOW(), 7),
(19, 'booking_cancelled', 'La reserva del alumno Lucas León para el día 2024-12-15 a las 13:00 ha sido cancelada.', NOW(), 7),
(20, 'upcoming_class', 'Tienes una clase próxima con Mateo Rodríguez el 2024-12-20 a las 10:00.', NOW(), 7),

-- Profesor 8: Raúl Ibárruri (userId=8)
(21, 'new_message', 'Tienes un nuevo mensaje del alumno Laura Walker.', NOW(), 8),
(22, 'new_review', 'Has recibido una nueva reseña del alumno Laura Walker.', NOW(), 8),
(23, 'booking_status_change', 'La reserva para tu clase con David Martínez ha cambiado a "cancelled".', NOW(), 8),
(24, 'upcoming_class', 'Tienes una clase próxima con Emilia López el 2024-12-21 a las 11:00.', NOW(), 8),

-- Profesor 9: William Andrés (userId=9)
(25, 'booking_created', 'Tienes una nueva reserva del alumno Henry Hall, para el día 2024-12-16 a las 12:00.', NOW(), 9),
(26, 'booking_cancelled', 'La reserva del alumno Henry Hall para el día 2024-12-16 a las 12:00 ha sido cancelada.', NOW(), 9),
(27, 'booking_status_change', 'La reserva para tu clase con Emilia López ha cambiado a "confirmed".', NOW(), 9),
(28, 'upcoming_class', 'Tienes una clase próxima con David Martínez el 2024-12-22 a las 12:00.', NOW(), 9),

-- Profesor 10: Isabella Toral (userId=10)
(29, 'new_review', 'Has recibido una nueva reseña del alumno Petra Muñoz.', NOW(), 10),
(30, 'new_message', 'Tienes un nuevo mensaje del alumno Petra Muñoz.', NOW(), 10),
(31, 'upcoming_class', 'Tienes una clase próxima con Sofía Hernández el 2024-12-23 a las 14:00.', NOW(), 10),

-- Insertar notificaciones para Estudiantes (userId=11-20)
-- Estudiante 1: Ethan Tomás (userId=11)
(32, 'new_message', 'Tienes un nuevo mensaje del profesor Juan Pérez.', NOW(), 11),
(33, 'booking_confirmed', 'Tu reserva con el profesor Juan Pérez ha sido confirmada para el día 2024-12-10 a las 10:00.', NOW(), 11),

-- Estudiante 2: Ava Moreno (userId=12)
(34, 'new_message', 'Tienes un nuevo mensaje del profesor Ana García.', NOW(), 12),
(35, 'booking_confirmed', 'Tu reserva con el profesor Ana García ha sido confirmada para el día 2024-12-11 a las 14:00.', NOW(), 12),

-- Estudiante 3: Alexander Jackson (userId=13)
(36, 'new_message', 'Tienes un nuevo mensaje del profesor Mateo Rodríguez.', NOW(), 13),
(37, 'booking_confirmed', 'Tu reserva con el profesor Mateo Rodríguez ha sido confirmada para el día 2024-12-12 a las 09:00.', NOW(), 13),

-- Estudiante 4: Mía Blanco (userId=14)
(38, 'new_message', 'Tienes un nuevo mensaje del profesor Emilia López.', NOW(), 14),
(39, 'booking_confirmed', 'Tu reserva con el profesor Emilia López ha sido confirmada para el día 2024-12-13 a las 11:00.', NOW(), 14),

-- Estudiante 5: Logan Hernández (userId=15)
(40, 'new_message', 'Tienes un nuevo mensaje del profesor David Martínez.', NOW(), 15),
(41, 'booking_confirmed', 'Tu reserva con el profesor David Martínez ha sido confirmada para el día 2024-12-14 a las 10:00.', NOW(), 15),

-- Estudiante 6: Charlotte Clarke (userId=16)
(42, 'new_message', 'Tienes un nuevo mensaje del profesor Sofía Hernández.', NOW(), 16),
(43, 'booking_confirmed', 'Tu reserva con el profesor Sofía Hernández ha sido confirmada para el día 2024-12-15 a las 14:00.', NOW(), 16),

-- Estudiante 7: Lucas León (userId=17)
(44, 'new_message', 'Tienes un nuevo mensaje del profesor Jorge Ramírez.', NOW(), 17),
(45, 'booking_confirmed', 'Tu reserva con el profesor Jorge Ramírez ha sido confirmada para el día 2024-12-16 a las 13:00.', NOW(), 17),

-- Estudiante 8: Laura Walker (userId=18)
(46, 'new_message', 'Tienes un nuevo mensaje del profesor Raúl Ibárruri.', NOW(), 18),
(47, 'booking_confirmed', 'Tu reserva con el profesor Raúl Ibárruri ha sido confirmada para el día 2024-12-17 a las 10:00.', NOW(), 18),

-- Estudiante 9: Henry Hall (userId=19)
(48, 'new_message', 'Tienes un nuevo mensaje del profesor William Andrés.', NOW(), 19),
(49, 'booking_confirmed', 'Tu reserva con el profesor William Andrés ha sido confirmada para el día 2024-12-18 a las 12:00.', NOW(), 19),

-- Estudiante 10: Petra Muñoz (userId=20)
(50, 'new_message', 'Tienes un nuevo mensaje del profesor Isabella Toral.', NOW(), 20),
(51, 'booking_confirmed', 'Tu reserva con el profesor Isabella Toral ha sido confirmada para el día 2024-12-19 a las 09:00.', NOW(), 20),

-- Notificaciones para el Administrador (userId=21)
(52, 'new_teacher_registration', 'Un nuevo profesor, Juan Pérez, se ha registrado en la plataforma.', NOW(), 21),
(53, 'new_teacher_registration', 'Un nuevo profesor, Ana García, se ha registrado en la plataforma.', NOW(), 21),
(54, 'profile_updated', 'Tu perfil ha sido actualizado exitosamente.', NOW(), 21);
