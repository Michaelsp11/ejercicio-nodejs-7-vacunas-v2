const Persona = require("../modelos/Persona");

const crearPersonaVacunada = async (
  dni,
  idCentro,
  idVacuna,
  primeraDosis,
  segundaDosis
) => {
  const persona = await Persona.create({
    dni,
    centroVacunacion: idCentro,
    vacuna: idVacuna,
  });
  if (primeraDosis) {
    persona.dosis.push(primeraDosis);
  }
  if (segundaDosis) {
    persona.dosis.push(segundaDosis);
  }
  persona.save();
  return persona;
};
const listaPersonas = async () => {
  const personas = await Persona.find();
  return personas;
};
const listaPersona = async (dniParametro) => {
  const persona = await Persona.find({
    dni: dniParametro,
  }).populate("vacuna centroVacunacion");
  return persona;
};
module.exports = {
  crearPersonaVacunada,
  listaPersonas,
  listaPersona,
};
