import express from "express";
import http from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import routerView from "./src/routes/viewRouter.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const PORT = 8080;

//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//endpoints
app.use("/", routerView);

//websockets
const messages = [];

io.on("connection", (socket)=> {
  console.log("nuevo usuario conectado");

  socket.on("new user connected", (username)=> {

    //devolvemos el historial de mensajes solo al cliente que se conecto
    socket.emit("message history", messages);

    //emitimos un evento de notificacion de conexion del nuevo cliente a todos, menos al que se conecto
    socket.broadcast.emit("show notification new user", username);
  });

  socket.on("chat message", (dataMessage)=> {
    messages.push(dataMessage);

    io.emit("broadcast new message", dataMessage);
  });
});

server.listen(PORT, ()=> {
  console.log("Servidor iniciado correctamente");
})