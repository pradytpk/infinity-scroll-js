let photoArrarys = [];
let count = 5;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash Api
const apiKey = "BwH-XwYWSifXtFUOLMDHGalFaLgqxQb9q-nPcGAaD3g";
let apiUrl = `https://api.unsplash.com/photos/random?count=${count}&client_id=${apiKey}`;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Check if all image are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded == totalImages) {
    loader.hidden = true;
    ready = true;
  }
}
// Helper Function to set attributes on DOM Elements
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elemnt for links and photos
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArrarys.length;
  // run function for each object in photosArray
  photoArrarys.forEach((photo) => {
    // create <a> to link to upslash
    const item = document.createElement("a");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener chek when each is finished loading
    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from Unsplash api
async function getImages() {
  try {
    const response = await fetch(apiUrl);
    photoArrarys = await response.json();
    displayPhotos();
  } catch (error) {
    getImages();
    console.log(error);
  }
}

// to check the scrolling reach near bottom page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getImages();
  }
});
// onLoad
getImages();
