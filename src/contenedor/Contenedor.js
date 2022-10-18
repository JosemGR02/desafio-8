
class Contenedor {
    constructor() {
        this.elementos = [];
    }

    obtenerTodos() {
        return this.elementos;
    }

    guardar(elemento) {
        elemento.id = !this.elementos.length ? 1 : this.elementos[this.elementos.length - 1].id + 1;
        this.elementos.push(elemento);
        return elemento;
    }

    obtenerXid(id) {
        return this.elementos.find(elemento => elemento.id === id);
    }

    actualizar(id, newData) {
        const elementoIndex = this.elementos.findIndex((elemento) => elemento.id == id);

        if (elementoIndex === - 1) return {error: true};

        const elementoEncontrado = this.elementos[elementoIndex];

        for (const key in newData) {
            if (elementoEncontrado.hasOwnProperty(key)) {
                elementoEncontrado[key] = newData[key];
            }
        }
        return this.elementos[elementoIndex];
        }

        eliminar(id) {
            this.elementos.filter(elemento => elemento.id != id)
            return { success: true}
        }
    }


module.exports = Contenedor;

