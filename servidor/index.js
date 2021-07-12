const morganFreeman = require("morgan");
const express = require("express");
const { error404, errorGeneral } = require("./errores");
const app = require("./init");
const {
  listarCentros,
  listarCentrosPorIdCiudad,
} = require("../db/controladores/centros");
const { listarVacunasCentro, getInfoCentro } = require("../db/controladores/vacunas");

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
app.get("/vacunacion/centros/centro/:idCentro" , async (req, res, next) => {
  const { idCentro } = req.params;
  const centro = await getInfoCentro(idCentro);
  res.json(centro);

});

app.use(error404);
app.use(errorGeneral);
