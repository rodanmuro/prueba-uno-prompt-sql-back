# Prueba de concepto

Se usa este proyecto como prueba de concepto para llamar a la API de OpenAI y generar una consulta sql acorde a la petición entregada.

Esta prueba necesita de la creación de una base de datos sql local; en dicha base de datos se crea una tabla llamada estudiantes, con la estructura mostrada en el archivo estudiantes.sql

En las pruebas realizadas se pudo notar que en ocasiones la consulta es devuelta con cambios de línea y el encabezado "sql", por lo cual fue necesario hacer explícito en el prompt de configuración, que dichos datos no fueran retornados en la consulta, además de concatenarlo en la petición final; además de eso en ocasiones, seleccionaba sólo nombre y apellido
