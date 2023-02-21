export const imageResizer = async (imgFile, width, height, type) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(imgFile);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result; //result is base64-encoded Data URI
      img.onload = async (element) => {
        resolve(drawToCanvas(element, width, height, type));
      };
    };
  });

async function drawToCanvas(element, width, height, type) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  //draw in canvas
  const ctx = canvas.getContext("2d");
  ctx.drawImage(element.target, 0, 0, canvas.width, canvas.height);

  const base64 = ctx.canvas.toDataURL(`${type}`, 1);
  // const fileName = `${new Date().getTime()}.${type.split("/")[1]}`;

  // const result = await urlToFile(base64, fileName, type);
  //get the base64-encoded Data URI from the resized image
  return { base64 };
}

export function urlToFile(dataUrl, filename, type) {
  return new Promise((resolve, reject) => {
    return fetch(dataUrl)
      .then((res) => res.arrayBuffer())
      .then((buffer) => resolve(new File([buffer], filename, { type: type })));
  });
}
