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
  description TEXT NOT NULL, -- Sobre mí
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
  type VARCHAR(255) NOT NULL,
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
  duration INT NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') NOT NULL,
  totalPrice FLOAT NOT NULL,
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

-- Insertar datos de prueba en users (contraseña password123)
INSERT INTO users (name, surname, email, password, avatar, rol) VALUES
('John', 'Doe', 'john.doe@example.com', '$2a$10$gHbkBm4c7XuVttddxFG.zuUPiPyMMNOnCKHt10iN1xV1B92nNesXG', NULL, 'teacher'),
('Jane', 'Smith', 'jane.smith@example.com', '$2a$10$gHbkBm4c7XuVttddxFG.zuUPiPyMMNOnCKHt10iN1xV1B92nNesXG', NULL, 'student'),
('Alice', 'Johnson', 'alice.johnson@example.com', '$2a$10$gHbkBm4c7XuVttddxFG.zuUPiPyMMNOnCKHt10iN1xV1B92nNesXG', NULL, 'teacher'),
('Bob', 'Brown', 'bob.brown@example.com', '$2a$10$gHbkBm4c7XuVttddxFG.zuUPiPyMMNOnCKHt10iN1xV1B92nNesXG', NULL, 'student'),
('Charlie', 'Davis', 'charlie.davis@example.com', '$2a$10$gHbkBm4c7XuVttddxFG.zuUPiPyMMNOnCKHt10iN1xV1B92nNesXG', NULL, 'teacher');

-- Insertar datos de prueba en knowledges
INSERT INTO knowledges (name) VALUES
('Python'),
('JavaScript'),
('Java'),
('C++'),
('Ruby');

-- Insertar datos de prueba en teachers
INSERT INTO teachers (description, schedule, price_p_hour, experience, rating, validated, latitude, longitude, userId) VALUES
('I am a passionate Python developer with a love for teaching. I have worked on various projects ranging from web development to data science.', 'Morning', 30.0, '5 years in Python', 4.5, TRUE, '40.7128', '-74.0060', 1),
('JavaScript is my forte. I enjoy building interactive web applications and teaching others how to do the same.', 'Afternoon', 40.0, '10 years in JavaScript', 4.7, TRUE, '34.0522', '-118.2437', 3),
('Java has been my primary language for over a decade. I specialize in backend development and enterprise solutions.', 'Night', 25.0, '10 years in Java', 4.2, TRUE, '51.5074', '-0.1278', 5);

-- Insertar datos de prueba en TeacherKnowledge
INSERT INTO TeacherKnowledge (teacherId, knowledgeId) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Insertar datos de prueba en messages
INSERT INTO messages (text, date, watched, senderId, recipientId) VALUES
('Hello, how are you?', '2023-01-01 10:00:00', FALSE, 1, 2),
('I need help with my homework.', '2023-01-02 11:00:00', FALSE, 2, 1),
('Can we reschedule our lesson?', '2023-01-03 12:00:00', FALSE, 3, 4),
('What is your homework about?', '2023-01-04 10:00:00', FALSE, 1, 2),
('Is about maths.', '2023-01-05 11:00:00', FALSE, 2, 1),
('Is everything ok?', '2023-01-05 11:00:00', FALSE, 2, 3);


-- Insertar datos de prueba en notifications
INSERT INTO notifications (type, message, date, watched, userId) VALUES
('info', 'Your lesson has been scheduled.', '2023-01-01 10:00:00', FALSE, 2),
('warning', 'Your payment is due.', '2023-01-02 11:00:00', FALSE, 4),
('success', 'Your profile has been updated.', '2023-01-03 12:00:00', TRUE, 1);

-- Insertar datos de prueba en bookings
INSERT INTO bookings (date, startTime, duration, status, totalPrice, studentId, teacherId) VALUES
('2023-01-01', '10:00:00', 60, 'confirmed', 30.0, 2, 1),
('2023-01-02', '11:00:00', 90, 'pending', 45.0, 4, 2),
('2023-01-03', '12:00:00', 120, 'completed', 60.0, 2, 3);

-- Insertar datos de prueba en reviews
INSERT INTO reviews (rating, comment, date, userId, teacherId) VALUES
(4.5, 'Great teacher!', '2023-01-01 10:00:00', 2, 1),
(4.7, 'Very knowledgeable.', '2023-01-02 11:00:00', 4, 2),
(4.2, 'Good experience.', '2023-01-03 12:00:00', 2, 3);


