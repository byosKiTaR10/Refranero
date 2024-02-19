// Definición de la clase Campeón
class Campeon {
    constructor(nombre, damageType, posicion, health, damageAmount) {
        this.nombre = nombre; 
        this.damageType = damageType; 
        this.posicion = posicion; 
        this.health = health; 
        this.damageAmount = damageAmount;
    }

    // Método para calcular la puntuación del campeón
    calcularPuntuacion() {
        // Por ejemplo, podrías calcular la puntuación como la suma de los atributos
        return this.fuerza + this.agilidad + this.resistencia;
    }

    // Otros métodos y funcionalidades relacionados con el campeón pueden ir aquí
}

// Ejemplo de creación de una instancia de Campeón
const campeonEjemplo = new Campeon("Ezreal", 8, 6, 7);
console.log(campeonEjemplo.calcularPuntuacion()); // Salida: 21
