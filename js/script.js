// Selección de elementos HTML
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const imageContainer = document.getElementById("image-container");

// Clave de API y URLs de la API
const apiKey = "kdJ5ngiGtb41nhsdc4WwwSiefUyn6ybrr4pm73xAjWYDIteG5R4JCqwr";
const randomApiUrl = "https://api.pexels.com/v1/curated?per_page=60"; // URL para obtener imágenes aleatorias
const searchApiUrl = "https://api.pexels.com/v1/search"; // URL para buscar imágenes

// Función para cargar imágenes aleatorias
async function getRandomImages() {
  const response = await fetch(randomApiUrl, {
    headers: {
      Authorization: apiKey,
    },
  });
  const data = await response.json();
  return data.photos;
}

// Función para cargar imágenes según la consulta
async function searchImages(query) {
  const response = await fetch(`${searchApiUrl}?query=${query}`, {
    headers: {
      Authorization: apiKey,
    },
  });
  const data = await response.json();
  return data.photos;
}

// Función para mostrar imágenes en el contenedor
function displayImages(images) {
  imageContainer.innerHTML = ""; // Limpia el contenedor de imágenes inexistentes
  images.forEach((image) => {
    const imageCard = document.createElement("div"); // Crea un contenedor para cada imagen
    imageCard.classList.add("image-card");

    // Crear elementos para mostrar el título y el fotógrafo

    const photographerPara = document.createElement("p");
    photographerPara.textContent = image.photographer; // Agrega el nombre del fotógrafo
    photographerPara.classList.add("photographer");

    const img = document.createElement("img"); // Crea un elemento de imagen
    img.src = image.src.medium; // Asigna la fuente de la imagen desde la API
    img.alt = image.photographer; // Asigna un texto alternativo a la imagen
    imageCard.appendChild(img); // Agrega la imagen al contenedor
    imageCard.appendChild(photographerPara); // Agrega el fotógrafo al contenedor
    imageContainer.appendChild(imageCard); // Agrega el contenedor al contenedor principal
  });
}

// Carga imágenes aleatorias al cargar la página
window.addEventListener("load", async () => {
  const randomImages = await getRandomImages(); // Obtiene imágenes aleatorias
  displayImages(randomImages); // Muestra las imágenes aleatorias en la página
});

// Escucha el evento de clic en el botón de búsqueda
searchButton.addEventListener("click", async () => {
  const query = searchInput.value; // Obtiene el valor de búsqueda del input
  if (query.trim() !== "") {
    // Verifica si la búsqueda no está vacía
    const searchResult = await searchImages(query); // Busca imágenes relacionadas con la consulta
    displayImages(searchResult); // Muestra las imágenes de la búsqueda en la página
  }
});

// Función para ejecutar la búsqueda
async function performSearch() {
  const query = searchInput.value.trim();
  if (query !== "") {
    const searchResult = await searchImages(query);
    displayImages(searchResult);
  }
}

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    performSearch(); // Realiza la búsqueda cuando se presiona "Enter"
  }
});

// Función para mostrar una imagen en tamaño real en una ventana emergente
function openImageInLightbox(imageUrl) {
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");

  const img = document.createElement("img");
  img.src = imageUrl;

  lightbox.appendChild(img);
  document.body.appendChild(lightbox);

  lightbox.addEventListener("click", () => {
    document.body.removeChild(lightbox);
  });
}

// Escucha el evento "click" en las imágenes para abrirlas en la ventana emergente
imageContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    const imageUrl = event.target.src;
    openImageInLightbox(imageUrl);
  }
});
