/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from "next";

import path from "path";
import fs from "fs";

import { Wine, UpdateWineInput } from "../../../types/wine";

const winesFilePath = path.join(process.cwd(), "data", "wines.json");

function readWines(): Wine[] {
  try {
    const fileContent = fs.readFileSync(winesFilePath, "utf-8");

    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading wines file:", error);

    return [];
  }
}

function writeWines(wines: Wine[]): void {
  try {
    fs.writeFileSync(winesFilePath, JSON.stringify(wines, null, 2));
  } catch (error) {
    console.error("Error writing wines file:", error);
    throw new Error("Failed to save wines");
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid wine ID" });
  }

  if (req.method === "GET") {
    try {
      const wines = readWines();
      const wine = wines.find((w) => w.id === id);

      if (!wine) {
        return res.status(404).json({ error: "Wine not found" });
      }

      res.status(200).json(wine);
    } catch (error) {
      console.error("Error fetching wine:", error);
      res.status(500).json({ error: "Failed to fetch wine" });
    }
  } else if (req.method === "PUT") {
    try {
      const wines = readWines();
      const wineIndex = wines.findIndex((w) => w.id === id);

      if (wineIndex === -1) {
        return res.status(404).json({ error: "Wine not found" });
      }

      const updateData: UpdateWineInput = req.body;
      const existingWine = wines[wineIndex];

      // Actualizar el vino
      const updatedWine: Wine = {
        ...existingWine,
        ...updateData,
        id: existingWine.id, // Mantener el ID original
        winery: existingWine.winery, // Mantener la bodega
        createdAt: existingWine.createdAt, // Mantener fecha de creación
        updatedAt: new Date().toISOString(), // Actualizar fecha de modificación
      };

      wines[wineIndex] = updatedWine;
      writeWines(wines);

      res.status(200).json(updatedWine);
    } catch (error) {
      console.error("Error updating wine:", error);
      res.status(500).json({ error: "Failed to update wine" });
    }
  } else if (req.method === "DELETE") {
    try {
      const wines = readWines();
      const wineIndex = wines.findIndex((w) => w.id === id);

      if (wineIndex === -1) {
        return res.status(404).json({ error: "Wine not found" });
      }

      const deletedWine = wines[wineIndex];

      wines.splice(wineIndex, 1);
      writeWines(wines);

      res
        .status(200)
        .json({ message: "Wine deleted successfully", wine: deletedWine });
    } catch (error) {
      console.error("Error deleting wine:", error);
      res.status(500).json({ error: "Failed to delete wine" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
