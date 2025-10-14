const btn = document.querySelector("button");

function useRequest(limit) {
    const xhr = new XMLHttpRequest();
    const url = `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`;
      
    xhr.open('GET', url, true);
      
    xhr.onload = function() {
    if (xhr.status === 200) {
        const photos = JSON.parse(xhr.responseText);
        displayPhotos(photos);
    } else {
        document.getElementById('result').textContent = 'Ошибка при загрузке данных';
    }
    };
      
    xhr.onerror = function() {
    document.getElementById('result').textContent = 'Ошибка сети';
    };
      
    xhr.send();
 }

function displayPhotos(photos) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
      
    photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.thumbnailUrl;   
    gallery.appendChild(img);
    });
}

let srav = function () {
    let num = document.querySelector('input').value;
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = '';
    document.getElementById('gallery').innerHTML = '';
    
  if(num > 10){
    resultDiv.textContent = 'число вне диапазона от 1 до 10';
  }
  else if(num < 1){
    resultDiv.textContent = 'число вне диапазона от 1 до 10';
  }
  else{
    useRequest(num)
  }
};


btn.addEventListener("click", srav); 