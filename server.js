import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { supabase } from "./supabaseClient.js";

const app = express();
app.use(
  cors({
    origin: "https://www.coopebred.com", // Reemplaza con el dominio de tu frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); // Middleware para interpretar JSON

// Ruta para verificar si el backend está funcionando
app.get("/", (req, res) => {
  res.send("Backend funcionando con módulos ECMAScript");
});

// Función para manejar la inserción de un socio individual
app.post("/registrar-socio-individual", async (req, res) => {
  const {
    nombres,
    apellidos,
    cedula,
    telefono,
    email,
    direccion,
    ciudad,
    estado_provincia,
    pais,
    afiliacion_ciudad,
  } = req.body;

  // Validar que los campos requeridos estén presentes
  if (!nombres || !apellidos || !cedula || !telefono || !email) {
    return res.status(400).json({
      error:
        "Los campos nombres, apellidos, cedula, telefono y email son requeridos",
    });
  }

  // Verificar si la cédula ya está registrada en la base de datos
  const { data: existingData, error: existingError } = await supabase
    .from("SocioIndividual")
    .select("*")
    .eq("cedula", cedula);

  if (existingError) {
    return res.status(500).json({ error: existingError.message });
  }

  if (existingData && existingData.length > 0) {
    return res.status(400).json({
      error: "La cédula ya está registrada en el sistema.",
    });
  }

  // Crear objeto con los datos del socio
  const socioData = {
    nombres,
    apellidos,
    cedula,
    telefono,
    email,
    direccion,
    ciudad,
    estado_provincia,
    pais,
    afiliacion_ciudad,
    fecha_creacion: new Date().toISOString(),
  };

  // Iniciar transacción
  const { data, error } = await supabase
    .from("SocioIndividual")
    .insert([socioData], { returning: "minimal" }); // Solo se inserta si todo es correcto

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: "Socio registrado correctamente" });
});

// Ruta para registrar un nuevo socio empresa con transacciones
app.post("/registrar-socio-empresa", async (req, res) => {
  const {
    tipo_socio_empresa,
    nombres_gerente,
    apellidos_gerente,
    cedula_gerente,
    telefono_gerente,
    email_gerente,
    direccion_gerente,
    municipio_gerente,
    provincia_gerente,
    razon_social_empresa,
    rnc_empresa,
    registro_mercantil,
    actividad_economica,
    direccion_empresa,
    telefono_empresa,
    email_empresa,
  } = req.body;

  // Crear objeto con los datos del socio empresa
  const datosEmpresa = {
    tipo_socio_empresa,
    nombres_gerente,
    apellidos_gerente,
    cedula_gerente,
    telefono_gerente,
    email_gerente,
    direccion_gerente,
    municipio_gerente,
    provincia_gerente,
    razon_social_empresa,
    rnc_empresa: rnc_empresa ? rnc_empresa : null,
    registro_mercantil,
    actividad_economica,
    direccion_empresa,
    telefono_empresa,
    email_empresa,
    fecha_creacion: new Date().toISOString(),
  };

  try {
    // Iniciar transacción para asegurar que la inserción sea atómica
    const { data, error } = await supabase
      .from("SocioEmpresa")
      .insert([datosEmpresa], { returning: "minimal" });

    if (error) {
      throw error; // Se lanza el error y el proceso se detiene
    }

    return res
      .status(200)
      .json({ message: "Socio empresa registrado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Escuchar en el puerto configurado en el .env o en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
