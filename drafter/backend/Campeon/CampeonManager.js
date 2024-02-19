class CampeonManager {
    constructor() {
        // Inicializamos la lista de campeones
        this.campeones = [];
    }

    // Método para agregar un nuevo campeón
    agregarCampeon(campeon) {
        this.campeones.push(campeon);
    }

    // Método para obtener todos los campeones
    obtenerTodosLosCampeones() {
        return this.campeones;
    }

    // Método para agregar varios campeones de una vez
    agregarVariosCampeones(variosCampeones) {
        this.campeones.push(...variosCampeones);
    }

    // Otros métodos y funcionalidades relacionados con la gestión de campeones pueden ir aquí
}
const todosLosCampeones = [
    { nombre: "Ezreal", damageType: "AD", posicion: ["ADC"], damageAmount: 4 },
    { nombre: "Ahri", damageType: "AP", posicion: ["MID"], damageAmount: 4 },
    { nombre: "Ekko", damageType: "AP", posicion: ["MID, JUNGLA"], damageAmount: 4 },
    { nombre: "Yone", damageType: "AD", posicion: ["MID, TOP"], damageAmount: 4 },
    { nombre: "Yasuo", damageType: "AD", posicion: ["MID, ADC, TOP"], damageAmount: 4 },
    { nombre: "Maokai", damageType: "AP", posicion: ["JUNGLA, SUPPORT"], damageAmount: 2 },
    // Agrega más campeones aquí
];