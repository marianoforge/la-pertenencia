/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from "next";

import path from "path";
import fs from "fs";

import { Wine, CreateWineInput } from "../../../types/wine";

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
  if (req.method === "GET") {
    try {
      const wines = readWines();
      const { category, region, minPrice, maxPrice, featured, search } =
        req.query;

      let filteredWines = wines;

      // Aplicar filtros
      if (category) {
        filteredWines = filteredWines.filter(
          (wine) => wine.tipo === category
        );
      }

      if (region) {
        filteredWines = filteredWines.filter((wine) => wine.region === region);
      }

      if (minPrice) {
        filteredWines = filteredWines.filter(
          (wine) => wine.price >= Number(minPrice)
        );
      }

      if (maxPrice) {
        filteredWines = filteredWines.filter(
          (wine) => wine.price <= Number(maxPrice)
        );
      }

      if (featured !== undefined) {
        filteredWines = filteredWines.filter(
          (wine) => wine.featured === (featured === "true")
        );
      }

      if (search) {
        const searchTerm = String(search).toLowerCase();

        filteredWines = filteredWines.filter(
          (wine) =>
            wine.marca.toLowerCase().includes(searchTerm) ||
            wine.bodega.toLowerCase().includes(searchTerm) ||
            (wine.description && wine.description.toLowerCase().includes(searchTerm)) ||
            wine.winery.toLowerCase().includes(searchTerm)
        );
      }

      res.status(200).json(filteredWines);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wines" });
    }
  } else if (req.method === "POST") {
    try {
      const wines = readWines();
      const newWineData: CreateWineInput = req.body;

      // Validación básica
      if (!newWineData.marca || !newWineData.bodega || !newWineData.price || newWineData.price <= 0) {
        return res.status(400).json({ error: "Missing required fields: marca, bodega, and valid price are required" });
      }

      // Crear nuevo vino
      const newWine: Wine = {
        ...newWineData,
        id: String(Date.now()), // ID simple basado en timestamp
        winery: "La Pertenencia",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      wines.push(newWine);
      writeWines(wines);

      res.status(201).json(newWine);
    } catch (error) {
      res.status(500).json({ error: "Failed to create wine" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
