const getImagesButton = document.querySelector("#get-images");
const firstScreen = document.querySelector("#first-screen");
const imagesGrid = document.querySelector("#images-grid");
const amountofImages = 9;

let images;

getImagesButton.addEventListener("click", async () => {
  if (!images) {
    images = await fetch(
      `https://picsum.photos/v2/list?limit=${amountofImages}`
    ).then((res) => res.json());

    const imageElements = images.map((image) => {
      const img = document.createElement("img");
      img.src = image.download_url;
      return img;
    });

    imageElements.forEach((img) => {
      imagesGrid.appendChild(img);
    });

    imagesGrid.hidden = false;
    firstScreen.hidden = true;

    console.log(imageElements);
  }
});
