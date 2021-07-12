const CentroVacunacion = require("../modelos/CentroVacunacion");
const Ciudad = require("../modelos/Ciudad");
const Persona = require("../modelos/Persona");

const listarCentros = async (nombreCiudad) => {
  const ciudad = await Ciudad.findOne({
    nombre: nombreCiudad,
  }).populate("puntosVacunacion");
  return ciudad.puntosVacunacion;
};

const personasVacunadas = async (idCentro) => {
  const personas = await Persona.find({
    centroVacunacion: idCentro,
  });
  return personas;
};

const listarCentrosPorIdCiudad = async (idCiudad) => {
  const ciudad = await Ciudad.findOne({
    _id: idCiudad,
  }).populate("puntosVacunacion");
  return ciudad.puntosVacunacion;
};

const crearCentros = async () => {
  CentroVacunacion.insertMany([
    {
      nombre: "Sant Isidor- Centre vacunal CAPSBE",
      localizacion: {
        coordenadas: [41, 2],
        direccion: "Carrer del Comte Borrell, 305",
      },
      vacunas: [],
    },
    {
      nombre: "Fira de Barcelona",
      localizacion: {
        coordenadas: [41, 2],
        direccion: "Avinguda Rius i Taulet, 12",
      },
      vacunas: [],
    },
    {
      nombre: "Facultat de Geografia i Història UB",
      localizacion: {
        coordenadas: [41, 2],
        direccion: "Carrer Montalegre, 6",
      },
      vacunas: [],
    },
    {
      nombre: "La Maquinista",
      localizacion: {
        coordenadas: [41, 2],
        direccion: "Carrer del Pont de Potosí, 2, Planta 0",
      },
      vacunas: [],
    },
  ]);
};

module.exports = {
  listarCentros,
  crearCentros,
  listarCentrosPorIdCiudad,
  personasVacunadas,
};
