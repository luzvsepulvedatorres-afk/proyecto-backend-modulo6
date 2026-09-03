# Proyecto Módulo #6: Node & Express Web App (Parte 1)

Aplicación web desarrollada con Node.js y Express como base inicial para el backend, estructurada bajo una arquitectura modular y limpia.

---

## 🚀 Tecnologías y Herramientas Utilizadas
* **Node.js** (v18+)
* **Express.js**
* **Dotenv** (para la gestión de variables de entorno)
* **Nodemon** (como dependencia de desarrollo para reinicio automático)
* **Módulo nativo `fs` (File System)** (para persistencia en archivos planos y logs)

---

## 📁 Estructura del Proyecto
El proyecto cumple con la arquitectura modular obligatoria organizada en las siguientes carpetas:
* `controllers/`: Contiene la lógica de negocio y controladores de las rutas (`appController.js`).
* `routes/`: Define las rutas y endpoints del servidor (`appRoutes.js`).
* `middlewares/`: Espacio destinado a interceptores y funciones intermedias (como el registro de logs).
* `public/`: Almacena el contenido estático servido directamente por Express (`index.html`).
* `logs/`: Almacena el archivo plano `log.txt` con el registro de peticiones.

---

## ⚙️ Instrucciones de Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd proyecto-backend-modulo6
Instalar dependencias:

Bash
npm install
Configurar las variables de entorno:
Crea un archivo .env en la raíz del proyecto y define el puerto:

Fragmento de código
PORT=3000
Ejecutar la aplicación:

Modo producción:

Bash
npm start
Modo desarrollo (con Nodemon):

Bash
npm run dev
💡 Decisiones Técnicas y Justificaciones
Nombre del archivo principal (app.js): Se optó por app.js en lugar de index.js como una convención estándar en Express para separar el archivo de inicialización del servidor de los puntos de entrada o pruebas unitarias, facilitando la lectura y escalabilidad del proyecto.

Modularización (Rutas y Controladores): Se separó la lógica de negocio (controllers/) de los endpoints (routes/) para evitar un archivo monolítico, permitiendo que la aplicación sea escalable de cara a la integración futura con bases de datos en los siguientes módulos.

Persistencia en archivos planos (fs): Se implementó un middleware personalizado que utiliza fs.appendFile de manera asíncrona para registrar de forma automática la fecha, hora y ruta accedida (log.txt) en cada petición HTTP, cumpliendo con los requisitos de trazabilidad básica sin sobrecargar el sistema.

Scripts de ejecución: Se configuraron explícitamente los scripts start y dev en el package.json para automatizar el flujo de trabajo del desarrollador mediante nodemon, optimizando los tiempos de prueba y validación en local.

# Módulo 7 - Parte 2: Relaciones 1:N con Sequelize y Express

Proyecto backend desarrollado con Node.js, Express y Sequelize (SQLite), enfocado en la implementación de arquitectura modular en capas y la gestión de relaciones de uno a muchos (1:N) entre modelos de User y Order.

---

## 🚀 Requisitos Previos

Asegúrate de tener instalado en tu equipo:

* Node.js (versión 16 o superior recomendada)
* npm

---

## ⚙️ Instrucciones de Instalación y Ejecución

1. Clona el repositorio o descarga y descomprime el proyecto en tu computadora.
2. Abre una terminal en la carpeta raíz del proyecto.
3. Instala las dependencias necesarias ejecutando:
```bash
npm install

```


4. Inicia el servidor ejecutando:
```bash
npm start

```


*El servidor correrá por defecto en el puerto 3000.*

---

## 🔌 Endpoints de la API

### Gestión de Usuarios (CRUD)

* `GET /api/usuarios` - Obtiene todos los usuarios registrados.
* `POST /api/usuarios` - Crea un nuevo usuario.
* `PUT /api/usuarios/:id` - Actualiza los datos de un usuario por su ID.
* `DELETE /api/usuarios/:id` - Elimina un usuario por su ID.
* `POST /api/usuarios/transaccion` - Crea un usuario aplicando manejo de transacciones y rollback.

### Relación 1:N (Usuarios y Pedidos)

* `GET /api/usuarios/pedidos` - Obtiene la lista completa de todos los usuarios junto con sus respectivos pedidos (include).
* `GET /api/usuarios/:userId/pedidos` - Obtiene de forma específica los pedidos asociados a un usuario mediante su ID.
* `POST /api/usuarios/:userId/pedidos` - Crea y asocia un nuevo pedido directamente a un usuario específico.

---

## 📂 Arquitectura del Proyecto

```text
├── config/          # Configuración de la base de datos (Sequelize)
├── controllers/     # Lógica de negocio (Controladores de usuarios y pedidos)
├── models/          # Modelos de datos y definición de asociaciones (User y Order)
├── routes/          # Enrutamiento modular de la API
├── app.js           # Archivo principal de configuración de Express
├── package.json     # Dependencias y scripts del proyecto
└── README.md        # Documentación del proyecto

```