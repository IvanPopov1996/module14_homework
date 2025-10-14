const btn = document.querySelector("button");

const srav = function(){
  const width = parseInt(document.getElementById('input').value);
  const height = parseInt(document.getElementById('input2').value); 
  const gallery = document.getElementById('gallery');
  const result = document.getElementById('result'); 

  if(width < 100 || width > 300 || isNaN(width)){
    result.textContent = 'одно из чисел вне диапазона от 100 до 300';
  }
  else if(height < 100 || height > 300 || isNaN(height)){ 
    result.textContent = 'одно из чисел вне диапазона от 100 до 300';
  }
  else{ 
    fetch(`https://dummyimage.com/${width}x${height}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сети');
        }
        
        const img = document.createElement('img');
        img.src = response.url;
        img.alt = `Изображение ${width}x${height}`;
        gallery.innerHTML = '';
        gallery.appendChild(img);
        result.textContent = '';
      })
      .catch(error => {
        result.textContent = 'Произошла ошибка при загрузке изображения';
        console.error('Error:', error);
      });
  }
}

btn.addEventListener('click', srav);