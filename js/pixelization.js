const canvas = document.querySelector('.canvas');
const context = canvas.getContext("2d");
const range = document.querySelector('.pix');
const playBtn = document.querySelector('.play');
let img, pixelArr, w, h;

range.oninput = () => {
    pixelization(range.value)
}

// download image
function handleFiles(files){
    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = function(){
        let image = new Image();
        image.src = reader.result;
        image.onload = () =>{
            img = image;
            drawPicture(image)
            playBtn.disabled = false;
        }
    }
}


// draw image on canvas
function drawPicture(img){
    context.clearRect(0, 0, canvas.width, canvas.height)
    w = img.width
    h = img.height
    canvas.width = w;
    canvas.height = h;
    context.drawImage(img, 0, 0);
    pixelArr = context.getImageData(0, 0, w, h)
}

// range oninput pixelization process
function pixelization(value){
    let sample_size = +value;
    let w = img.width;
    let h = img.height;
    
    for (let y = 0; y < h; y += sample_size) {
        for (let x = 0; x < w; x += sample_size) {
          let p = (x + (y*w)) * 4;
          context.fillStyle = `rgba(${pixelArr.data[p]}, ${pixelArr.data[p + 1]}, 
                               ${pixelArr.data[p + 2]}, ${pixelArr.data[p + 3]})`;
          context.fillRect(x, y, sample_size, sample_size);
        }
    }
}



