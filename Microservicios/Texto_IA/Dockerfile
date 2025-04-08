# Usa una imagen base de Ruby
FROM ruby:3.2

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /Microservicios/Texto_IA

# Copia el Gemfile y Gemfile.lock al contenedor
COPY Gemfile  /Microservicios/Texto_IA

# Instala las dependencias listadas en el Gemfile
RUN bundle install

# Copia el resto del código de tu proyecto al contenedor
COPY . .
# Expone el puerto en el que correrá tu servidor (ajusta según sea necesario)
EXPOSE 4004

# Comando para iniciar el servidor
CMD ["ruby", "servidor.rb"]
