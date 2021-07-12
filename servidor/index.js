const morganFreeman = require("morgan");
const express = require("express");
const { error404, errorGeneral } = require("./errores");
const app = require("./init");
const {
  listarCentros,
  listarCentrosPorIdCiudad,
  personasVacunadas,
  listarPersonasVacunadasPorCiudad,
} = require("../db/controladores/centros");
const { getInfoCentro } = require("../db/controladores/vacunas");
const { listaPersona } = require("../db/controladores/personas");

app.use(morganFreeman("dev"));
app.use(express.json());

app.get("/vacunacion/centros/ciudad/:idCiudad", async (req, res, next) => {
  const { idCiudad } = req.params;
  const centros = await listarCentrosPorIdCiudad(idCiudad);
  if (!centros) {
    const nuevoError = new Error(`No existe la ciudad con el id ${idCiudad}`);
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  res.json(centros);
});
app.get("/vacunacion/vacunados/ciudad/:idCiudad", async (req, res, next) => {
  const { idCiudad } = req.params;
  const personas = await listarPersonasVacunadasPorCiudad(idCiudad);
  if (!personas) {
    const nuevoError = new Error(
      `No hay personas en la ciudad con la Id ${idCiudad}`
    );
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  res.json(personas);
});
app.get("/vacunacion/centros/centro/:idCentro", async (req, res, next) => {
  const { idCentro } = req.params;
  const centro = await getInfoCentro(idCentro);
  res.json(centro);
});
app.get("/vacunacion/vacunados/persona/:dni", async (req, res, next) => {
  const { dni } = req.params;
  const persona = await listaPersona(dni.toUpperCase());
  res.json(persona);
});
app.get("/vacunacion/vacunados/centro/:idCentro", async (req, res, next) => {
  const { idCentro } = req.params;
  const vacunados = await personasVacunadas(idCentro);
  res.json(vacunados);
});

app.use(error404);
app.use(errorGeneral);
