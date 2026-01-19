const output = document.getElementById("output");

const loadingDiv = document.createElement("div");
loadingDiv.id = "loading";
loadingDiv.innerText = "Loading...";
output.appendChild(loadingDiv);

const errorDiv = document.createElement("div");
errorDiv.id = "error";
errorDiv.style.color = "red";
output.appendChild(errorDiv);

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" }
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to download image: ${url}`);
  });
}

function downloadImages() {
  loadingDiv.style.display = "block";
  errorDiv.innerText = "";

  const promises = images.map(img => downloadImage(img.url));

  Promise.all(promises)
    .then((imgs) => {
      loadingDiv.style.display = "none";

      imgs.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      loadingDiv.style.display = "none";
      errorDiv.innerText = error;
    });
}

downloadImages();
