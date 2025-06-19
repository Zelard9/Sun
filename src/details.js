// document.addEventListener("DOMContentLoaded", async () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const carId = urlParams.get("id");
  
//     const container = document.getElementById("car-details");
//     if (!container) return;
  
//     if (!carId) {
//       container.innerHTML = "<p>Оголошення не знайдено</p>";
//       return;
//     }
  
//     try {
//       const response = await fetch('./response.json');
//       const response_json = await response.json();
//       const items = response_json.cars;
  
//       const item = items.find(item => item.id == carId);
//       if (!item) {
//         container.innerHTML = "<p>Оголошення не знайдено</p>";
//         return;
//       }
  
//       // Галерея
//       let imagesHTML = "";
//       if (item.img && Array.isArray(item.img) && item.img.length > 0) {
//         imagesHTML = item.img.map(src => `
//           <li class="glide__slide">
//             <img src="${src}" alt="${item.type}" class="car-image">
//           </li>`).join("");
//       } else if (item.img) {
//         imagesHTML = `<li class="glide__slide"><img src="${item.img}" alt="${item.type}" class="car-image"></li>`;
//       }
  
//       // Вставляємо HTML з житловими характеристиками
//       container.innerHTML = `
        
//         <div class="glide">
//           <div class="glide__track" data-glide-el="track">
//             <ul class="glide__slides">${imagesHTML}</ul>
//           </div>
//           <div class="glide__arrows" data-glide-el="controls">
//             <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&#10094;</button>
//             <button class="glide__arrow glide__arrow--right" data-glide-dir=">">&#10095;</button>
//           </div>
//         </div>
//         <h2>${item.car} - ${item.type}</h2>
//         <p><strong>Адреса:</strong> вул. ${item.address}</p>
//         <p><strong>Кімнат:</strong> ${item.rooms}</p>
//         <p><strong>Площа:</strong> ${item.area} м²</p>
//         <p><strong>Поверх:</strong> ${item.floor}</p>
//         <p><strong>Стан:</strong> ${item.condition}</p>
//         <p><strong>Тип угоди:</strong> ${item.offer_type}</p>
//         <p><strong>Ціна:</strong> ${item.price}$</p>
//       `;
  
//       // Glide
//       setTimeout(() => {
//         new Glide('.glide', {
//           type: 'carousel',
//           startAt: 0,
//           perView: 1,
//           autoplay: 3000,
//           hoverpause: true,
//           animationDuration: 800,
//           gap: 10,
//         }).mount();
//       }, 100);
  
//     } catch (error) {
//       console.error("Помилка при завантаженні:", error);
//       container.innerHTML = "<p>Помилка при завантаженні оголошення</p>";
//     }
//   });
  