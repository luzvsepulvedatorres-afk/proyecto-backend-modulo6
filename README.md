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