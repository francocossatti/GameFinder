"use client"
import React, { useEffect } from "react"
import axios from 'axios';

const apiUrl = 'https://api.igdb.com/v4/games';

// Configuración de Axios con el encabezado de autorización
const axiosConfig = {
  headers: {
    'Client-ID': 'gs1lb9y1c0zgzvul8u6ppc8otr2k21', // Reemplaza con tu Client ID
    'Authorization': 'Bearer  2lds3kvld6zerw0xtszfaga5791im6', // Reemplaza con tu Access Token
  },
};

// Componente o función principal de Next.js
function MiComponente() {
  // Función para realizar la llamada a la API
  const llamarAPI = async () => {
    try {
      // Parámetros de la solicitud
      const params = {
        fields: 'name,popularity',
        sort: 'popularity:desc',
        limit: 10,
      };

      // Realizar la llamada a la API utilizando Axios
      const respuesta = await axios.get(apiUrl, { params, ...axiosConfig });

      // Imprimir la respuesta en la consola
      console.log(respuesta.data);
    } catch (error) {
      // Manejar errores, por ejemplo, imprimir en la consola
      console.error('Error al llamar a la API:', error);
    }
  };

  // Llamar a la API cuando el componente se monta
  useEffect(() => {
    llamarAPI();
  }, []); // Asegúrate de importar useEffect si no lo has hecho

  // Renderizar tu componente
  return (
    <div>
      {/* Contenido de tu componente */}
    </div>
  );
}

export default MiComponente;