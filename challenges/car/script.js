
class vehicle {
    constructor(a, b, c) {
        this.make = a
        this.model = b
        this.year = c
    }
    honk() {
        return "Beep"
    }
    toString() {
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}`
    }
}
let myFirstVehicle = new vehicle("Honda", "Monster Truck", 1999);
class car extends vehicle {
    constructor(a, b, c) {
        super(a, b, c)
    }
    numWheels = 4
}
let myFirstCar = new car("Honda", "Monster Truck", 1999);
class motorcycle extends vehicle {
    constructor(a, b, c) {
        super(a, b, c)
    }
    numWheels = 2

    revEngine() {
        return "VROOM!!!"
    }
}
let myFirstMotorcycle = new motorcycle("Honda", "Nighthawk", 2000);
class garage {
    constructor(capacity) {
        this.vehicles = []
        this.capacity = capacity
    }


    add(newVehicle) {
        if (!(newVehicle instanceof vehicle)) {
            return "Only vehicles are allowed in here!";
        }
        if (this.vehicles.length >= this.capacity) {
            return "Sorry, we're full.";
        }
        this.vehicles.push(newVehicle);
        return "Vehicle added!";
    }

}