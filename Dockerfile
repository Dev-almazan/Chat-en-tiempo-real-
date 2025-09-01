# 1. Usa una imagen oficial y ligera de Node.js como base
FROM node:18-slim

# 2. Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# 3. Copia los archivos de dependencias.
# Se copian primero para aprovechar el caché de Docker. Si no cambian, no se reinstala todo.
COPY package*.json ./

# 4. Instala las dependencias del proyecto
RUN npm install

# 5. Copia el resto del código de tu aplicación al directorio de trabajo
COPY . .

# 6. Expone el puerto en el que la aplicación va a correr
EXPOSE 8080

# 7. Define el comando que se ejecutará para iniciar la aplicación
# Asegúrate de que tu archivo principal se llame 'app.js'
CMD [ "node", "app.js" ]