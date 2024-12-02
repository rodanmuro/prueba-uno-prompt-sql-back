import express from 'express';
import mysql from 'mysql';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const client = new OpenAI({
  apiKey: process.env.OPENAPI_API_KEY
});

const tablaEstudiantes = fs.readFileSync("./src/estudiantes.sql", "utf-8");

async function iniciarChat(mensaje: string) {
  const response = await client.chat.completions.create(
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres un asistente de consultas de bases de datos; la tabla a consultar tiene la siguiente estructura "
            + tablaEstudiantes + "; debes retornar como respuesta solamente la consulta sql necesaria acorde con el mensaje enviado por el usuario; no uses la subcadena sql ni los saltos de linea"
        },
        {
          role: "user",
          content: mensaje + ". recuerda que solamente me debes retornar como respuesta la consulta sql necesaria. no uses en la respuesta la subcadena sql ni los saltos de linea "
        }
      ]
    }
  );

  console.log(response);

  const query: string = response.choices[0].message.content as string;
  console.log(query);

  const conn = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "12345678",
      database: "openai-api"
    }
  )

  console.log("-------");

  conn.connect((error: any) => {
    if (error) throw error;
    console.log("conectado a la base");
    conn.query(query, (err, result, fields) => {
      if (err) throw err;

      console.log(result);

      conn.end((err: any) => {
        if (err) throw err;
        console.log("Conexión cerrada");
      });
    })
  })

  console.log("-------");
}

const mensaje = "cual es el mejor en math";
iniciarChat(mensaje);

