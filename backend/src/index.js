const express = require('express');
const path = require('path');
const app = express();
const { PORT, HOST } = require("./config/configEnv");
const AdminRoutes = require("./routes/admin.routes");
const AuthRoutes = require("./routes/auth.routes");
const UserRoutes = require("./routes/user.routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', '..', 'frontend', 'public','login.html');

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