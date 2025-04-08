package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings" // Importación necesaria

	_ "github.com/go-sql-driver/mysql" // Driver para MariaDB
	"github.com/joho/godotenv"
)

var db *sql.DB

type Habilidades struct {
	Imagen    string `json:"Imagen"`
	Nombre    string `json:"Nombre"`
	Direccion string `json:"Direccion"`
}

// Estructura para la respuesta estándar
type Response struct {
	Estado    bool        `json:"Estado"`
	Respuesta interface{} `json:"Respuesta"` // Cambiar a `interface{}` para poder manejar cualquier tipo de dato
}

// Función para cargar las variables de entorno desde el archivo .env
func Cargar_Env() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error al cargar el archivo .env: %v", err)
	}
}

// Conectar a MySQL
func initDB() error {
	var err error

	// Cargar las variables de entorno
	Cargar_Env()
	DB_URL := os.Getenv("DB_URL")

	// Configuración de conexión: usuario, contraseña y host (sin especificar base de datos)
	dsn := DB_URL
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		return err
	}
	// Probar conexión
	return db.Ping()
}

// Crear la base de datos
func createDatabase() error {
	// Cargar las variables de entorno
	Cargar_Env()

	DB_NAME := os.Getenv("DB_NAME")

	query := "CREATE DATABASE IF NOT EXISTS " + DB_NAME
	_, err := db.Exec(query)
	if err != nil {
		return err
	}
	fmt.Println("Base de datos creada o ya existente.")
	return nil
}

// Crear la tabla en la base de datos
func createTable() error {

	// Cargar las variables de entorno
	Cargar_Env()

	DB_NAME := os.Getenv("DB_NAME")
	DB_TABLA := os.Getenv("DB_TABLA")

	// Seleccionar la base de datos
	_, err := db.Exec("USE " + DB_NAME)
	if err != nil {
		return err
	}

	// Crear la tabla si no existe
	query := fmt.Sprintf(`
	CREATE TABLE IF NOT EXISTS %s (
			Id INT AUTO_INCREMENT PRIMARY KEY,
			Nombre VARCHAR(100) NOT NULL,
			Imagen LONGTEXT NOT NULL,
			Direccion VARCHAR(100) NOT NULL
		)
	`, DB_TABLA)
	_, err = db.Exec(query)
	if err != nil {
		return err
	}
	fmt.Println("Tabla creada o ya existente.")
	return nil
}

func Crear_Habilidad(post Habilidades) error {
	// Cargar las variables de entorno
	Cargar_Env()

	DB_TABLA := os.Getenv("DB_TABLA")

	query := fmt.Sprintf("INSERT INTO %s (Nombre, Imagen, Direccion) VALUES (?, ?, ?)", DB_TABLA)
	_, err := db.Exec(query, post.Nombre, post.Imagen, post.Direccion)
	return err

}

// Función para leer todas las habilidades
func Leer_Habilidades() ([]Habilidades, error) {

	// Cargar las variables de entorno
	Cargar_Env()

	DB_TABLA := os.Getenv("DB_TABLA")

	query := "SELECT Id, Nombre, Imagen, Direccion FROM " + DB_TABLA
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []Habilidades
	for rows.Next() {
		var post Habilidades
		var id int // Variable para capturar el Id (aunque no lo uses luego)
		if err := rows.Scan(&id, &post.Nombre, &post.Imagen, &post.Direccion); err != nil {
			return nil, fmt.Errorf("Error al escanear la fila: %v", err)
		}
		posts = append(posts, post)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("Error al iterar sobre las filas: %v", err)
	}

	return posts, nil
}

// Función para leer habilidades por una lista de IDs
func Leer_Habilidades_Por_IDs(ids []int) ([]Habilidades, error) {

	// Cargar las variables de entorno
	Cargar_Env()

	DB_TABLA := os.Getenv("DB_TABLA")

	// Crear la consulta dinámica con placeholders para los IDs
	placeholders := make([]string, len(ids))
	for i := range ids {
		placeholders[i] = "?"
	}
	query := fmt.Sprintf("SELECT Id, Nombre, Imagen, Direccion FROM %s WHERE Id IN (%s)", DB_TABLA, strings.Join(placeholders, ", "))

	// Convertir los IDs a un slice de `interface{}` para usar con Query
	args := make([]interface{}, len(ids))
	for i, id := range ids {
		args[i] = id
	}

	rows, err := db.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []Habilidades
	for rows.Next() {
		var post Habilidades
		var id int
		if err := rows.Scan(&id, &post.Nombre, &post.Imagen, &post.Direccion); err != nil {
			return nil, fmt.Errorf("Error al escanear la fila: %v", err)
		}
		posts = append(posts, post)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("Error al iterar sobre las filas: %v", err)
	}

	return posts, nil
}

// Handler para recibir el webhook (crear una habilidad)
func webhookCrear(w http.ResponseWriter, r *http.Request) {
	var post Habilidades
	// Decodificar el cuerpo de la solicitud JSON
	err := json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(Response{
			Estado:    false,
			Respuesta: "Solicitud no válida",
		})
		return
	}

	// Guardar el post en la base de datos
	err = Crear_Habilidad(post)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(Response{
			Estado:    false,
			Respuesta: fmt.Sprintf("Error al guardar la habilidad: %v", err),
		})
		return
	}

	// Enviar una respuesta de éxito
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(Response{
		Estado:    true,
		Respuesta: "Habilidad guardada exitosamente",
	})
}

// Handler para obtener todos los posts
func webhookLeer(w http.ResponseWriter, r *http.Request) {
	posts, err := Leer_Habilidades()
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(Response{
			Estado:    false,
			Respuesta: fmt.Sprintf("Error al obtener la información: %v", err),
		})
		return
	}

	// Codificar los posts en formato JSON y enviar la respuesta
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Response{
		Estado:    true,
		Respuesta: posts,
	})
}

// Handler para leer habilidades por IDs
func webhookLeerPorIDs(w http.ResponseWriter, r *http.Request) {
	var request struct {
		IDs []int `json:"ids"`
	}

	// Decodificar la solicitud JSON
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(Response{
			Estado:    false,
			Respuesta: "Solicitud inválida: " + err.Error(),
		})
		return
	}

	// Llamar a la función para obtener habilidades por IDs
	posts, err := Leer_Habilidades_Por_IDs(request.IDs)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(Response{
			Estado:    false,
			Respuesta: fmt.Sprintf("Error al obtener la información: %v", err),
		})
		return
	}

	// Responder con las habilidades obtenidas
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Response{
		Estado:    true,
		Respuesta: posts,
	})
}

func main() {
	// Inicializar conexión a MariaDB
	if err := initDB(); err != nil {
		log.Fatalf("Error al conectar a MySQL: %v\n", err)
	}
	defer db.Close()
	fmt.Println("Conexión a MariaDB exitosa.")

	// Crear base de datos
	if err := createDatabase(); err != nil {
		log.Fatalf("Error al crear la base de datos: %v\n", err)
	}

	// Crear tabla
	if err := createTable(); err != nil {
		log.Fatalf("Error al crear la tabla: %v\n", err)
	}

	fmt.Println("Base de datos y tabla listas.")

	// Rutas para los webhooks
	http.HandleFunc("/api/Crear_Habilidad/Crear", webhookCrear)         // Crear post
	http.HandleFunc("/api/Crear_Habilidad/Leer_Lista", webhookLeer)     // Leer posts
	http.HandleFunc("/api/Crear_Habilidad/Leer_Ids", webhookLeerPorIDs) // Leer por Ids

	Cargar_Env()

	PORT := os.Getenv("PORT")

	// Iniciar el servidor
	log.Println("Servidor receptor escuchando en http://localhost:" + PORT)
	log.Fatal(http.ListenAndServe(":"+PORT, nil))
}
