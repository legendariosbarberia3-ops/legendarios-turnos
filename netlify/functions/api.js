exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" })
    };
  }

  try {
    const respuesta = await fetch(
      "https://script.google.com/macros/s/AKfycbwc2WszgmhSppO300chTmqttzRFDTQkv-Af721oHO0StT6bz0gOM6W91vQLqsHpDyfB/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: event.body
      }
    );

    const resultado = await respuesta.text();

    return {
      statusCode: respuesta.status,
      headers: { "Content-Type": "application/json" },
      body: resultado
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error de conexión con las reservas" })
    };
  }
};
