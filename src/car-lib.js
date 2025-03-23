class CarLibrary {
    constructor(cars) {
      this.cars = cars;
    }
  
    // Отримати весь список авто
    getAllCars() {
      return this.cars;
    }
  
    // Отримати авто за ID
    getCarById(id) {
      return this.cars.find(car => car.id === id) || null;
    }
  
    // Пошук авто за параметрами
    searchCars({ car, minPrice, maxPrice, minMileage, maxMileage }) {
      return this.cars.filter(c => 
        (!car || c.car.toLowerCase() === car.toLowerCase()) &&
        (!minPrice || c.price >= minPrice) &&
        (!maxPrice || c.price <= maxPrice) &&
        (!minMileage || c.mileage >= minMileage) &&
        (!maxMileage || c.mileage <= maxMileage)
      );
    }
  
    // Додати нове авто
    addCar(newCar) {
      newCar.id = this.cars.length ? Math.max(...this.cars.map(c => c.id)) + 1 : 1;
      this.cars.push(newCar);
      return newCar;
    }
  
    // Видалити авто за ID
    deleteCar(id) {
      const index = this.cars.findIndex(car => car.id === id);
      if (index !== -1) {
        return this.cars.splice(index, 1)[0];
      }
      return null;
    }
  }
  
  // Експорт для використання в інших модулях
  if (typeof module !== "undefined") {
    module.exports = CarLibrary;
  }
  