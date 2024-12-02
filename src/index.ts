import express from 'express';
import mysql from 'mysql';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const client = new OpenAI({
apiKey:process.env.OPENAPI_API_KEY
});


client.beta.assistants.create(
  {
    model:"gpt-4",
    name:"Asistente de calificaciones",
    description:"Eres un asistente para crear consultas sql a una tabla que se llama estudiantes, debes responder sólo con el código sql de la consulta solicitada",
  }
);

client.beta.threads.create();


const conn = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"12345678"
    }
)

conn.connect((error:any) => {
  if(error)throw error;
  console.log("conectado a la base");
})