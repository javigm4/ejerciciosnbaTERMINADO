// Importaciones
import { Nba } from "./Nba.js";
import "./style.css";

// Crear el selector principal
export const crearSelectores = async () => {
  const selector = document.createElement("select");
  selector.classList.add("styled-select");

  // Obtener las claves (sources) y crear las opciones del selector
  const claves = await obtenerSources();
  crearOpciones(claves, selector);

  document.body.appendChild(selector);

  // Evento para manejar el cambio en el selector
  selector.addEventListener("change", () => {
    const elementoSeleccionado = selector.value;
    crearCartas(elementoSeleccionado);
  });
};

// Configuración del fetch para sources
const url1 = "http://localhost:3000/sources";
const options1 = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "23d49c55f5msh4b301c63fc79be9p10a5e6jsn1f207790f863",
    "x-rapidapi-host": "nba-latest-news.p.rapidapi.com",
  },
};

// Obtener las fuentes (sources) para el selector
export const obtenerSources = async () => {
  try {
    const response = await fetch(url1, options1);
    const sources = await response.json();
    return sources; // Retornamos las fuentes
  } catch (error) {
    console.error("Error al obtener las fuentes:", error);
    return [];
  }
};

// Crear opciones en el selector
export const crearOpciones = (array, select) => {
  array.forEach((opcion) => {
    const option = document.createElement("option");
    option.value = opcion.id; // Usamos 'id' como valor
    option.textContent = opcion.name; // Usamos 'name' como texto visible
    select.appendChild(option);
  });

  // Opción para "Todos"
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "Todos";
  select.appendChild(allOption);
};

// Configuración del fetch para artículos
const url2 = "https://nba-latest-news.p.rapidapi.com/articles";
const options2 = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "23d49c55f5msh4b301c63fc79be9p10a5e6jsn1f207790f863",
    "x-rapidapi-host": "nba-latest-news.p.rapidapi.com",
  },
};

// Crear contenedor global para las cartas
let containerCard;

// Crear las cartas según la selección
export const crearCartas = async (elementoSeleccionado) => {
  try {
    if (!containerCard) {
      containerCard = document.createElement("div");
      containerCard.classList.add("card-container");
      document.body.appendChild(containerCard);
    }

    containerCard.innerHTML = ""; // Limpia el contenedor antes de agregar nuevas cartas

    const response = await fetch(url2, options2);
    const info = await response.json();

    // Crear array de cartas
    const arrayCartas = info.map((card) => {
      const nuevaCarta = new Nba(card.title, card.source, card.url);
      nuevaCarta.setSource(card.source);
      nuevaCarta.setTitle(card.title);
      nuevaCarta.setUrl(card.url);
      return nuevaCarta;
    });

    // Filtrar las cartas según el elemento seleccionado
    const cartasFiltradas = arrayCartas.filter((card) => {
      return card.getSource() === elementoSeleccionado || elementoSeleccionado === "all";
    });

    // Crear las cartas visualmente
    cartasFiltradas.forEach((carta) => {
      const tituloCarta = document.createElement("span");
      tituloCarta.classList.add("card-title");
      tituloCarta.textContent = carta.getTitle(); // Usamos getTitle() para obtener el título
      containerCard.appendChild(tituloCarta);
    });

    if (cartasFiltradas.length === 0) {
      containerCard.textContent = "No hay resultados para la selección.";
    }
  } catch (error) {
    console.error("Error al crear las cartas:", error);
  }
};

// Crear un contenedor genérico (si fuera necesario)
export const crearDivs = () => {
  const container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);

  const containerFiltro = document.createElement("div");
  containerFiltro.classList.add("container-filter");
  container.appendChild(containerFiltro);
};

// Iniciar la aplicación
crearSelectores();
