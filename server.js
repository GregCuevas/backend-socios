import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { supabaseClient } from "./supabaseClient.js";

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para verificar si el backend funciona
app.get("/", (req, res) => {
  res.send("Backend funcionando con módulos ECMAScript");
});

// Ruta para registrar un nuevo socio individual
app.post("/registrar-socio-individual", async (req, res) => {
  const datosSocio = req.body;
  const { data, error } = await supabaseClient
    .from("SocioIndividual")
    .insert([datosSocio]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ data });
});

// **Nueva ruta** para registrar un nuevo socio empresa
app.post("/registrar-socio-empresa", async (req, res) => {
  const datosEmpresa = req.body;
  const { data, error } = await supabaseClient
    .from("SocioEmpresa")
    .insert([datosEmpresa]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ data });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
