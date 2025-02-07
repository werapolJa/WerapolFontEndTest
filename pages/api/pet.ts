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

// Update the response type to an array of Pet objects
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pet[] | { message: string }>
) {
  if (req.method === "GET") {
    try {
      const result = await connectionPool.query(
        "select pet_id, pettype_id ,pet_name, breed,pet_sex,age,color,weight,about,create_at,update_at FROM pet ORDER BY create_at DESC;"
      );
      const pets = result.rows;

      res.status(200).json(pets);
    } catch (error) {
      console.error("Error fetching pets:", error);
      res.status(500).json({ message: "Failed to fetch pets" });
    }
  }

  if (req.method === "POST") {
    // ดึงข้อมูลจาก body
    const {
      pettype_id,
      pet_name,
      breed,
      pet_sex,
      age,
      color,
      weight,
      image_pet,
      about,
    } = req.body;
    console.log(req.body);
    // ตรวจสอบว่ามีข้อมูล
    if (!pet_name) {
      return res
        .status(400)
        .json({ message: "Missing required fields for pet data" });
    }

    if (!pet_name) {
      return res.status(400).json({ message: "Pet name is required" });
    }

    const client = await connectionPool.connect();

    try {
      // สร้างตัวแปล เก็บ query เพื่อนำไปใช้
      const petInsertQuery = `
      insert into pet (pet_name, pettype_id, breed, pet_sex, age, color, weight, image_pet,about)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;

      const petResult = await client.query(petInsertQuery, [
        pet_name,
        pettype_id,
        breed,
        pet_sex,
        age,
        color,
        weight,
        image_pet,
        about,
      ]);

      // ถ้าไม่สามารถเพิ่มข้อมูลได้ (ไม่มีผลลัพธ์)
      if (petResult.rowCount === 0) {
        return res.status(400).json({ message: "Failed to add pet data" });
      }

      // ส่งข้อมูลกลับไปหลังจากเพิ่มสำเร็จ
      return res.status(201).json({
        message: "Pet added successfully!",
      });
    } catch (error) {
      console.error("Error inserting pet data:", error);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      // ถ้าไม่ใช้
      // การเชื่อมต่ออาจถูกล็อกไว้และไม่สามารถนำไปใช้ซ้ำได้ ส่งผลให้ connection pool อาจเต็มและทำให้ระบบไม่สามารถสร้างการเชื่อมต่อใหม่ได้
      client.release();
    }
  }
}
