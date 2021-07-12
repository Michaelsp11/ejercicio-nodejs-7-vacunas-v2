const morganFreeman = require("morgan");
const express = require("express");
const { error404, errorGeneral } = require("./errores");
const app = require("./init");
const {
  listarCentros,
  listarCentrosPorIdCiudad,
  personasVacunadas,
} = require("../db/controladores/centros");

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

app.get("/vacunacion/vacunados/centro/:idCentro", async (req, res, next) => {
  const { idCentro } = req.params;
  const vacunados = await personasVacunadas(idCentro);
  res.json(vacunados);
});


app.use(error404);
app.use(errorGeneral);
