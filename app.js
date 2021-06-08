const firstScreen = document.querySelector("#first-screen");
const imagesGrid = document.querySelector("#images-grid");
const amountofImages = 9;

let currentPage = 1;
let loading = false;

function getImageUrls(page = 1) {
  return fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=${amountofImages}`
  ).then((res) => res.json());
}

function renderImages(container, images) {
  const imageElements = images.map((image) => {
    const img = document.createElement("img");
    img.src = image.download_url;
    return img;
  });

  imageElements.forEach((img) => {
    container.appendChild(img);
  });
}

async function getAndRenderImages(page = 1) {
  const images = await getImageUrls(page);
  renderImages(imagesGrid, images);
}

getAndRenderImages(1);

document.addEventListener("scroll", (e) => {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    if (!loading) {
      loading = true;
      currentPage = currentPage + 1;
      getAndRenderImages(currentPage).then(() => {
        loading = false;
      });
    }
  }
});
