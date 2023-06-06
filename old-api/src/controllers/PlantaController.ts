import { Request, Response } from "express";
import { Planta } from "../entities/Planta";

export const createPlanta = async (req: Request, res: Response) => {
  const { nombre, descripcion } = req.body;

  const plantaInsert = await Planta.save({
    nombre: nombre,
    descripcion: descripcion,
  });

  if (plantaInsert)
    return res.status(200).json({ message: "Planta agregada." });
  return res.status(404).json({ error: "Hubo un error al crear la planta." });
};

export const getPlantaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const plantaFound = await Planta.findOneBy({ id: Number(id) });

  if (plantaFound) return res.status(200).json(plantaFound);

  return res.status(404).json({ error: "No existe la planta." });
};

export const getAllPlantas = async (req: Request, res: Response) => {
  const plantasFound = await Planta.find();

  if (plantasFound && plantasFound.length > 0)
    return res.status(200).json(plantasFound);

  return res.status(404).json({ error: "No se encontraron coincidencias." });
};

export const updatePlanta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  const plantaFound = await Planta.findOneBy({
    id: Number(id),
  });

  if (!plantaFound)
    return res.status(404).json({
      message: "Planta no existe.",
    });

  const plantaUpdated = await Planta.update(
    { id: Number(id) },
    {
      nombre: nombre,
      descripcion: descripcion,
    }
  );

  if (plantaUpdated.affected == 0)
    return res.status(404).json({ error: "Hubo un error al actualizar." });

  return res.status(200).json({ message: "Planta actualizada correctamente." });
};

export const deletePlanta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const plantaDeleted = await Planta.delete({
    id: Number(id),
  });

  if (plantaDeleted) {
    if (plantaDeleted.affected == 0)
      return res.status(404).json({ error: "Hubo un error al actualizar." });

    return res.status(200).json({ message: "Planta eliminada correctamente." });
  }
  return res.status(404).json({ error: "Planta no existe." });
};
