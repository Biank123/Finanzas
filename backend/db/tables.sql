-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de ingresos
CREATE TABLE ingresos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    trabajo NUMERIC NOT NULL,
    otros NUMERIC DEFAULT 0,
    fecha DATE NOT NULL
);

-- Tabla de gastos
CREATE TABLE gastos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    categoria VARCHAR(50) NOT NULL,
    producto VARCHAR(100),
    fecha DATE NOT NULL,
    precio NUMERIC NOT NULL,
    prioridad INT NOT NULL
);
