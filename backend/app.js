require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const expressWinston = require("express-winston");
const logger = require("./src/config/logger.js");
const db = require("./src/config/database.js");
const path = require('path');
const authRoutes = require("./src/routes/authRoutes.js");
const postRoutes = require("./src/routes/postRoutes.js");
const messageRoutes = require("./src/routes/messageRoutes.js");
const winston = require("winston");
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
};

app.use(cors(corsOptions));

app.use(helmet());
app.use(express.json());

// Logging de solicitudes HTTP con Morgan
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

// Logging de solicitudes HTTP con express-winston
const logsDir = path.join(__dirname, 'src/logs');
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logsDir, 'combined.log') })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false
}));

// Rutas
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/messages", messageRoutes);

// Middleware de manejo de errores
app.use(
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: path.join(logsDir, "error.log"),
      }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("¡Ocurrió un error inesperado!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en el puerto ${PORT}`);
});
