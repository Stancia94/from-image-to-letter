
let symbolForDraw = '0';
const saveModal = document.querySelector('.save');
const applicantForm = document.getElementById('form-symbol');
applicantForm.addEventListener('submit', (event) => {
  symbolForDraw = applicantForm.elements[0].value;
  saveModal.style.opacity = 1;
  setTimeout(() => saveModal.style.opacity = 0, 1100);
  event.preventDefault();
});

function getImageUrl(selectedFile) {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.error = (error) => {
      reject(error);
    };

  });
}

const inputFileElement = document.getElementById("files");
const holst = document.querySelector('#text');
holst.innerHTML = '';

inputFileElement.addEventListener('change', event => {
  const selectedFile = inputFileElement.files[0];
  getImageUrl(selectedFile).then(urlResult => {
    const img = new Image();
    const canvas = document.getElementById('image');
    const context = canvas.getContext('2d');
    const arraySymbol = [];
    img.src = urlResult;
    img.onload = () => {
      canvas.setAttribute('height', 200);
      canvas.setAttribute('width', 200);
      context.drawImage(img, 0, 0, 200, 200);
      const imageData = context.getImageData(0, 0, 200, 200);
      let red, green, blue;
      for (let i = 0; i < imageData.data.length; i += 4) {
        red = imageData.data[i];
        green = imageData.data[i + 1];
        blue = imageData.data[i + 2];
        if (red < 50 || green < 50 || blue < 50) {
          arraySymbol.push(symbolForDraw);
        }
        else {
          arraySymbol.push(' ');
        }
        if (i % (200 * 4) == 0) {
          arraySymbol.push('\n')
        }
      }
      context.putImageData(imageData, 0, 0);
      holst.innerHTML += arraySymbol.join('');
    };
  }).catch(error => {
    console.log(error);
  })
});


