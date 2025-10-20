document.addEventListener('DOMContentLoaded', function() {
    const pageInput = document.getElementById('input');
    const limitInput = document.getElementById('input2');
    const requestBtn = document.getElementById('button');
    const resultDiv = document.getElementById('result');
    const galleryDiv = document.getElementById('gallery');

    loadLastImages();

    requestBtn.addEventListener('click', function() {
        // Сбрасываем ошибки
        resultDiv.textContent = '';
        
        const page = pageInput.value.trim();
        const limit = limitInput.value.trim();
        
        // Валидация
        const validation = validateInputs(page, limit);
        
        if (!validation.isValid) {
            showError(validation.errorType);
            return;
        }
        
        // Делаем запрос
        fetchImages(validation.page, validation.limit);
    });

    function validateInputs(page, limit) {
        const pageNum = Number(page);
        const limitNum = Number(limit);
        
        const isPageValid = page !== '' && !isNaN(pageNum) && pageNum >= 1 && pageNum <= 10;
        const isLimitValid = limit !== '' && !isNaN(limitNum) && limitNum >= 1 && limitNum <= 10;
        
        if (!isPageValid && !isLimitValid) {
            return { isValid: false, errorType: 'both' };
        }
        if (!isPageValid) {
            return { isValid: false, errorType: 'page' };
        }
        if (!isLimitValid) {
            return { isValid: false, errorType: 'limit' };
        }
        
        return { isValid: true, page: pageNum, limit: limitNum };
    }

    function showError(errorType) {
        const errors = {
            'both': 'Номер страницы и лимит вне диапазона от 1 до 10',
            'page': 'Номер страницы вне диапазона от 1 до 10', 
            'limit': 'Лимит вне диапазона от 1 до 10'
        };
        resultDiv.textContent = errors[errorType];
    }

    function fetchImages(page, limit) {
        const url = `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Ошибка сети');
                return response.json();
            })
            .then(images => {
                displayImages(images);
                saveToLocalStorage(images);
            })
            .catch(error => {
                resultDiv.textContent = 'Ошибка при загрузке данных: ' + error.message;
            });
    }

    function displayImages(images) {
        if (!images || images.length === 0) {
            galleryDiv.innerHTML = '<p>Картинки не найдены</p>';
            return;
        }
        
        galleryDiv.innerHTML = images.map(image => `
            <div style="border: 1px solid #ddd; margin: 10px; padding: 10px; display: inline-block;">
                <img src="${image.thumbnailUrl}" alt="${image.title}" style="max-width: 150px;">
                <p style="margin: 5px 0; font-size: 12px; max-width: 150px;">${image.title}</p>
            </div>
        `).join('');
    }

    function saveToLocalStorage(images) {
        try {
            localStorage.setItem('lastImages', JSON.stringify(images));
        } catch (error) {
            console.log('Ошибка сохранения:', error);
        }
    }

    function loadLastImages() {
        try {
            const savedImages = localStorage.getItem('lastImages');
            if (savedImages) {
                const images = JSON.parse(savedImages);
                displayImages(images);
            }
        } catch (error) {
            console.log('Ошибка загрузки:', error);
        }
    }
});