import { Request, Response } from "express";

import { dataSource } from "../db.config";
import { Variable } from "../entities/Variable";

const repo = dataSource.getRepository(Variable);

export const createVariable = async (req: Request, res: Response) => {
  try {
    const { magnitud, unidad, cantidad, plantaId } = req.body;

    const variableInsert = await Variable.save({
      plantaId: plantaId,
      magnitud: magnitud,
      unidad: unidad,
      cantidad: Number(cantidad),
    });

    if (variableInsert) {
      return res.status(200).json({ message: "Registro agregado." });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Hubo un error al agregar el registro." });
  }
};

export const getOneRegistro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const registroFound = await Variable.findOne({ where: { id: Number(id) } });

  if (registroFound) return res.status(200).json(registroFound);

  return res.status(404).json({ error: "No se encontró coincidencia." });
};

export const getAllByPlanta = async (req: Request, res: Response) => {
  const { planta } = req.params;
  const registroFound = await Variable.findOne({
    where: { plantaId: Number(planta) },
  });

  if (registroFound) return res.status(200).json(registroFound);

  return res.status(404).json({ error: "No se encontró coincidencias." });
};

export const getAllRegistros = async (req: Request, res: Response) => {
  const registrosFound = await repo
    .createQueryBuilder("variable")
    .leftJoinAndSelect("variable.planta", "planta")
    .addSelect(["*"])
    .getMany();

  if (registrosFound && registrosFound.length > 0)
    return res.status(200).json(registrosFound);

  return res.status(404).json({ error: "No se encontraron coincidencias." });
};

export const updateRegistro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { magnitud, unidad, cantidad, plantaId } = req.body;

  const registroFound = await Variable.findOne({
    where: { id: Number(id) },
  });

  if (!registroFound)
    return res.status(404).json({
      error: "No se encontró coincidencia.",
    });

  const registroUpdated = await Variable.update(
    {
      id: registroFound.id,
    },
    {
      plantaId: plantaId,
      magnitud: magnitud,
      unidad: unidad,
      cantidad: Number(cantidad),
    }
  );

  if (registroUpdated.affected == 0) {
    return res.status(404).json({ error: "Hubo un error al actualizar." });
  }

  return res.status(200).json({ message: "Registro actualizado." });
};

export const deleteRegistro = async (req: Request, res: Response) => {
  const { id } = req.params;

  const registroFound = await Variable.findOne({
    where: { id: Number(id) },
  });

  if (!registroFound)
    return res.status(404).json({
      error: "No se encontró coincidencia.",
    });

  const registroDeleted = await Variable.delete({
    id: registroFound.id,
  });

  if (registroDeleted.affected == 0) {
    return res.status(404).json({ error: "Hubo un error al eliminar." });
  }

  return res.status(200).json({ message: "Registro eliminado." });
};
