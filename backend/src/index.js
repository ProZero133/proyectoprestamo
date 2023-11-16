require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { PORT, HOST } = require("./config/configEnv");
const AdminRoutes = require("./routes/admin.routes");
const AuthRoutes = require("./routes/auth.routes");
const UserRoutes = require("./routes/user.routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const JWT_SECRET = process.env.JWT_SECRET;
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', '..', 'frontend', 'public','login.html');
const JWT_SECRET = 'tu_secreto_super_secreto';
  // Enviar el archivo HTML como respuesta
  res.sendFile(indexPath);
});
app.use("/api", AdminRoutes, UserRoutes);

app.use("/api/login", AuthRoutes);
const port = process.env.PORT;
console.log(PORT)
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});