CREATE TABLE estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    grade FLOAT NOT NULL,
    subject VARCHAR(100) NOT NULL
);