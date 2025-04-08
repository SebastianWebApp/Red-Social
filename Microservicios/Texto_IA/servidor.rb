require 'sinatra'
require 'net/http'
require 'uri'
require 'json'
require 'sinatra/cross_origin'



# Lista blanca de hosts permitidos
# set :cross_origin, true



# Ruta para mejorar el texto con la API de OpenAI
post '/' do
  begin
    # Recupera el texto que el usuario envió en la solicitud
    request_payload = JSON.parse(request.body.read)
    texto_a_mejorar = request_payload['Texto']

    # Definir la URL del endpoint
    uri = URI.parse("https://api.openai.com/v1/chat/completions")

    # Crear la solicitud POST
    request = Net::HTTP::Post.new(uri)
    request["Content-Type"] = "application/json"
    request["Authorization"] = "Bearer"  # Usa tu propia clave API aquí

    # Crear el cuerpo de la solicitud
    request.body = JSON.dump({
      "model" => "gpt-3.5-turbo",  # Usa el modelo correcto como "gpt-3.5-turbo"
      "temperature" => 0.6,
      "messages" => [
        { "role" => "system", "content" => "Mejora el texto. No modifiques ni cambies los enlaces presentes en el texto. Usa emojis de manera adecuada para resaltar ideas clave, hacer el texto más atractivo y añadir un toque creativo cuando sea pertinente." },
        { "role" => "user", "content" => texto_a_mejorar }
      ],
      "max_tokens" => 3000
    })

    # Configurar las opciones para la solicitud HTTP con SSL habilitado
    req_options = { use_ssl: uri.scheme == "https" }

    # Realizar la solicitud y capturar la respuesta
    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end

    # Extraer la respuesta mejorada de la API
    response_body = JSON.parse(response.body)
    texto_mejorado = response_body.dig("choices", 0, "message", "content")

    # Devolver la respuesta mejorada en formato JSON
    content_type :json
    { Estado: true, Respuesta: texto_mejorado }.to_json

  rescue JSON::ParserError
    # Manejo de error si el JSON es inválido
    status 400
    content_type :json
    { Estado: false, Respuesta: "Formato equivocado. Por favor, inténtalo de nuevo." }.to_json

  rescue OpenAI::AuthenticationError
    # Manejo de error si ocurre un problema de autenticación con la API de OpenAI
    status 401
    content_type :json
    { Estado: false, Respuesta: "Error de autenticación con OpenAI. Intenta nuevamente más tarde." }.to_json

  rescue OpenAI::APIError
    # Manejo de error si ocurre un problema con la API de OpenAI
    status 500
    content_type :json
    { Estado: false, Respuesta: "Hubo un problema con la API de OpenAI. Intenta nuevamente más tarde." }.to_json

  rescue StandardError => e
    # Manejo de cualquier otro error
    status 500
    content_type :json
    { Estado: false, Respuesta: "Ocurrió un error inesperado: #{e.message}" }.to_json
  end
end

# Iniciar el servidor en el puerto 4004
# Se coloca para poder utilizar en el docker
# set :bind, '0.0.0.0'
set :port, 4004
