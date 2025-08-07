# Backend Socios - API REST para Gestión de Socios

## 📋 Descripción

Este es un **backend API REST** desarrollado en **Node.js** y **Express** que proporciona servicios para la gestión de socios de una cooperativa. El sistema permite registrar dos tipos de socios:

- **Socios Individuales**: Personas físicas que se afilian a la cooperativa
- **Socios Empresa**: Empresas o entidades comerciales que se afilian

El backend utiliza **Supabase** como base de datos y está configurado para trabajar con el frontend de la cooperativa.

## 🚀 Características Principales

- ✅ **Registro de Socios Individuales** con validación de datos
- ✅ **Registro de Socios Empresa** con información del gerente y la empresa
- ✅ **Validación de cédulas duplicadas** para evitar registros duplicados
- ✅ **CORS configurado** para comunicación segura con el frontend
- ✅ **Manejo de errores** robusto
- ✅ **Base de datos en Supabase** para persistencia de datos

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **Supabase** - Base de datos y autenticación
- **CORS** - Middleware para permitir peticiones cross-origin
- **dotenv** - Gestión de variables de entorno

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn
- Cuenta en Supabase

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd backend-socios
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   SUPABASE_URL=tu_url_de_supabase
   SUPABASE_KEY=tu_clave_de_supabase
   PORT=5000
   ```

4. **Iniciar el servidor**
   ```bash
   npm start
   ```

El servidor estará disponible en `http://localhost:5000`

## 📡 Endpoints de la API

### 1. Verificar Estado del Servidor
```
GET /
```
**Respuesta:** Mensaje de confirmación de que el backend está funcionando

### 2. Registrar Socio Individual
```
POST /registrar-socio-individual
```

**Datos requeridos:**
```json
{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "cedula": "1234567890",
  "telefono": "8091234567",
  "email": "juan@ejemplo.com",
  "direccion": "Calle Principal #123",
  "ciudad": "Santo Domingo",
  "estado_provincia": "Distrito Nacional",
  "pais": "República Dominicana",
  "afiliacion_ciudad": "Santo Domingo"
}
```

**Respuesta exitosa:**
```json
{
  "message": "Socio registrado correctamente"
}
```

### 3. Registrar Socio Empresa
```
POST /registrar-socio-empresa
```

**Datos requeridos:**
```json
{
  "tipo_socio_empresa": "Empresa",
  "nombres_gerente": "María",
  "apellidos_gerente": "García",
  "cedula_gerente": "0987654321",
  "telefono_gerente": "8099876543",
  "email_gerente": "maria@empresa.com",
  "direccion_gerente": "Av. Independencia #456",
  "municipio_gerente": "Santo Domingo Este",
  "provincia_gerente": "Santo Domingo",
  "razon_social_empresa": "Empresa Ejemplo S.A.",
  "rnc_empresa": "123456789",
  "registro_mercantil": "RM-2024-001",
  "actividad_economica": "Comercio",
  "direccion_empresa": "Calle Comercial #789",
  "telefono_empresa": "8095551234",
  "email_empresa": "info@empresa.com"
}
```

**Respuesta exitosa:**
```json
{
  "message": "Socio empresa registrado correctamente"
}
```

## 🗄️ Estructura de la Base de Datos

El proyecto utiliza Supabase con las siguientes tablas:

### Tabla: SocioIndividual
- `id` (Primary Key)
- `nombres`
- `apellidos`
- `cedula` (Unique)
- `telefono`
- `email`
- `direccion`
- `ciudad`
- `estado_provincia`
- `pais`
- `afiliacion_ciudad`
- `fecha_creacion`

### Tabla: SocioEmpresa
- `id` (Primary Key)
- `tipo_socio_empresa`
- `nombres_gerente`
- `apellidos_gerente`
- `cedula_gerente`
- `telefono_gerente`
- `email_gerente`
- `direccion_gerente`
- `municipio_gerente`
- `provincia_gerente`
- `razon_social_empresa`
- `rnc_empresa`
- `registro_mercantil`
- `actividad_economica`
- `direccion_empresa`
- `telefono_empresa`
- `email_empresa`
- `fecha_creacion`

## 🔧 Configuración de CORS

El backend está configurado para aceptar peticiones desde:
- **Origen:** `https://www.coopebred.com`
- **Métodos:** GET, POST
- **Headers:** Content-Type, Authorization

## 📁 Estructura del Proyecto

```
backend-socios/
├── server.js          # Servidor principal y rutas
├── supabaseClient.js  # Configuración de Supabase
├── index.js           # Archivo de entrada (no utilizado)
├── package.json       # Dependencias y scripts
├── .env              # Variables de entorno (crear)
└── README.md         # Este archivo
```

## 🚀 Scripts Disponibles

- `npm start` - Inicia el servidor en modo producción
- `npm test` - Ejecuta las pruebas (no implementado)

## ⚠️ Validaciones Implementadas

### Para Socios Individuales:
- ✅ Campos requeridos: nombres, apellidos, cedula, telefono, email
- ✅ Verificación de cédula duplicada
- ✅ Validación de formato de datos

### Para Socios Empresa:
- ✅ Todos los campos del gerente son requeridos
- ✅ Información de la empresa obligatoria
- ✅ Manejo de campos opcionales (RNC)

## 🔒 Seguridad

- **CORS configurado** para dominio específico
- **Validación de datos** en todos los endpoints
- **Manejo de errores** para evitar información sensible
- **Variables de entorno** para credenciales

## 🐛 Solución de Problemas

### Error: "SUPABASE_URL y SUPABASE_KEY son requeridos"
- Verifica que el archivo `.env` existe y contiene las variables correctas
- Asegúrate de que las credenciales de Supabase sean válidas

### Error: "La cédula ya está registrada"
- El sistema no permite cédulas duplicadas
- Verifica si el socio ya existe en la base de datos

### Error de CORS
- Verifica que el frontend esté haciendo peticiones desde el dominio configurado
- Revisa la configuración de CORS en `server.js`

## 📞 Soporte

Para reportar problemas o solicitar nuevas funcionalidades, contacta al equipo de desarrollo.

---

**Desarrollado para la Cooperativa** 🏦 