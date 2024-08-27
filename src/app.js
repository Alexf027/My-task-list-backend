const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const validateToken = require('./middleware/validateToken');
const validateSchema = require('./middleware/validate');
const loginSchema = require('./schemas/login.schema');
const registerSchema = require('./schemas/register.schema');

const app = express();
require('dotenv').config();

const login = require("./routers/login");
const verifyToken = require("./routers/verify");
const profile = require("./routers/profile");
const logout = require("./routers/logout");
const register = require("./routers/register");
const listViewRouter = require('./routers/list-view-router');
const listEditRouter = require('./routers/list-edit-router');

const PORT = process.env.PORT || 8080;

function validateHTTPMethods(req, res, next) {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!validMethods.includes(req.method)) {
    return res.status(400).json({ error: '🚫 Método HTTP no válido' });
  }
  next();
};

app.use(cors({ origin: 'https://my-task-list-frontend.vercel.app/', credentials: true,}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(validateHTTPMethods);
app.use(express.json());

app.use("/login", validateSchema(loginSchema), login);
app.use("/verify", verifyToken);
app.use("/profile", validateToken, profile);
app.use("/logout", logout);
app.use("/register", validateSchema(registerSchema), register);
app.use("/list-view", validateToken, listViewRouter);
app.use("/list-edit", validateToken, listEditRouter);

connectDB();
app.listen(PORT, () => {
  console.log(`Servidor ON ✅🌐 http://localhost:${PORT}`);
});