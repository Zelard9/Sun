document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get("id");

    if (!carId) {
        document.getElementById("car-details").innerHTML = "<p>Авто не знайдено</p>";
        return;
    }

    try {
        const response = await fetch('./response.json');
        const response_json = await response.json();
        const cars = response_json.cars;

        const car = cars.find(item => item.id == carId);

        if (!car) {
            document.getElementById("car-details").innerHTML = "<p>Авто не знайдено</p>";
            return;
        }

        // Генеруємо слайди для Glide.js
        let imagesHTML = "";
        if (car.img && Array.isArray(car.img) && car.img.length > 0) {
            imagesHTML = car.img.map(imgSrc => 
                `<li class="glide__slide"><img src="${imgSrc}" alt="${car.type}" class="car-image"></li>`
            ).join("");
        } else if (car.img) {
            imagesHTML = `<li class="glide__slide"><img src="${car.img}" alt="${car.type}" class="car-image"></li>`;
        }

        document.getElementById("car-details").innerHTML = `
            <a href="./index.html">Home</a>
            <div class="glide">
                <div class="glide__track" data-glide-el="track">
                    <ul class="glide__slides">
                        ${imagesHTML}
                    </ul>
                </div>
                <div class="glide__arrows" data-glide-el="controls">
                    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&#10094;</button>
                    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">&#10095;</button>
                </div>
            </div>
            <h2>${car.car} - ${car.type}</h2>
            <p><strong>Пробіг:</strong> ${car.mileage} км</p>
            <p><strong>Об'єм двигуна:</strong> ${car.capacity}</p>
            <p><strong>Тип палива:</strong> ${car.fuel}</p>
            <p><strong>Ціна:</strong> ${car.price}$</p>
        `;

        // Додаємо затримку перед ініціалізацією Glide.js, щоб переконатися, що елементи завантажилися
        setTimeout(() => {
            new Glide('.glide', {
                type: 'carousel',
                startAt: 0,
                perView: 1,
                autoplay: 3000,
                hoverpause: true,
                animationDuration: 800,
                gap: 10,
            }).mount();
        }, 100);
    } catch (error) {
        console.error("Помилка при завантаженні даних:", error);
        document.getElementById("car-details").innerHTML = "<p>Помилка при завантаженні даних</p>";
    }
});
