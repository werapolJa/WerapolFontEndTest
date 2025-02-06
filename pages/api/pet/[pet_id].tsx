import type { NextApiRequest, NextApiResponse } from "next";
import connectionPool from "@/utils/db";

type Pet = {
  pet_id: number;
  pettype_id: number;
  pet_name: string;
  experience: "0-2" | "3-5" | "5+";
  breed: string;
  pet_sex: "M" | "F";
  age: number;
  color: string;
  weight: number;
  about?: string;
  create_at: string;
  update_at: string;
};

type ResponseData = { data: Pet[] } | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { message: string }>
) {
  if (req.method === "GET") {
    try {
      let query = `
        SELECT pet_name, pettype_id, breed, pet_sex, age, color, weight, about, "image_pet"
        FROM pet
        WHERE pet_id = $1
      `;

      const { pet_id } = req.query;

      if (pet_id && isNaN(Number(pet_id))) {
        return res.status(400).json({ message: "Invalid pet ID." });
      }

      const result = await connectionPool.query(query, [pet_id]);

      if (result.rows.length === 0) {
        return res.status(200).json({ data: [] });
      }

      // Return the pet data
      return res.status(200).json({ data: result.rows });
    } catch (error) {
      console.error("Error fetching pet:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  if (req.method === "PUT") {
    const { pet_id } = req.query;
    const {
      pet_name,
      pettype_id,
      breed,
      pet_sex,
      age,
      color,
      weight,
      image_pet,
      about,
    } = req.body;

    console.log(req.body);

    if (!pet_id) {
      return res.status(400).json({ message: "Missing pet_id" });
    }

    // Validate required fields
    if (
      !pet_name ||
      !pettype_id ||
      !breed ||
      !pet_sex ||
      !age ||
      !color ||
      !weight ||
      !about
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields for pet data" });
    }

    const client = await connectionPool.connect();

    try {
      // Check if pet_id exists
      const checkPetQuery = `SELECT * FROM pet WHERE pet_id = $1`;
      const result = await client.query(checkPetQuery, [pet_id]);
      const petData = result.rows;

      if (petData.length === 0) {
        return res.status(404).json({ message: "Pet not found" });
      }

      // Update the pet information
      const petUpdateQuery = `
        UPDATE pet
        SET pet_name = $1, pettype_id = $2, breed = $3, pet_sex = $4, age = $5, color = $6, weight = $7, "image_pet" = $8, about = $9
        WHERE pet_id = $10
        RETURNING *;
      `;

      const petResult = await client.query(petUpdateQuery, [
        pet_name,
        pettype_id,
        breed,
        pet_sex,
        age,
        color,
        weight,
        image_pet,
        about,
        pet_id,
      ]);

      if (petResult.rowCount === 0) {
        return res.status(400).json({ message: "Failed to update pet data" });
      }

      return res.status(200).json({ message: "Pet updated successfully!" });
    } catch (error) {
      console.error("Error updating pet:", error);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      client.release();
    }
  }

  if (req.method === "DELETE") {
    const { pet_id } = req.query;

    if (!pet_id) {
      return res.status(400).json({ message: "Missing pet_id" });
    }

    const client = await connectionPool.connect();

    try {
      const checkPetQuery = `SELECT * FROM pet WHERE pet_id = $1`;
      const result = await client.query(checkPetQuery, [pet_id]);
      const petData = result.rows;

      if (petData.length === 0) {
        return res
          .status(404)
          .json({ message: "Pet not found or unauthorized" });
      }

      const deletePetQuery = `DELETE FROM pet WHERE pet_id = $1`;
      const deleteResult = await client.query(deletePetQuery, [pet_id]);

      if (deleteResult.rowCount === 0) {
        return res.status(400).json({ message: "Failed to delete pet data" });
      }

      return res.status(200).json({ message: "Pet deleted successfully!" });
    } catch (error) {
      console.error("Error deleting pet:", error);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      client.release();
    }
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
