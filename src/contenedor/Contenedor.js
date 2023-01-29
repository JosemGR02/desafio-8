
import fs from "fs";

class ContenedorFileSystem {
    constructor(archivonombre) {
        this.filePath = `./src/db/${archivonombre}.json`;
    }

    async obtenerTodos() {
        try {
        const archivo = await fs.promises.readFile(this.filePath, "utf8");
        const elementos = JSON.parse(archivo);

        return elementos;
        }
        catch (error) {
            if (error.code === "ENOENT") {
                await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
                return [];
            }
        console.log(error, "error, no se pudo obtener los elementos");
        }
    }

    async guardar(elemento) {
        try {
        const elementos = await this.obtenerTodos();

        const id = elementos.length === 0 ? 1 : elementos[elementos.length - 1].id + 1;

        elemento.id = id;

        elementos.push(elemento);

        await fs.promises.writeFile(this.filePath, JSON.stringify(elementos, null, 3));

        return elemento;
        }

        catch (error) {
        console.log(error, "error, no se pudo guardar el elemento");
        }
    }

    async obtenerXid(id) {
        try {
        const elementos = await this.obtenerTodos();

        const foundElement = elementos.find((elemento) => elemento.id == id);

        return foundElement;
        } 

        catch (error) {
        console.log(error,"error, no se pudo obtener el elemento");
        }
    }

    async actualizar(id, nuevosDatos) {
        try {
        const elementos = await this.obtenerTodos();

        const elementoEncontradoIndex = elementos.findIndex(
            (element) => element.id == id
        );

        if (elementoEncontradoIndex === -1) return null;

        const elementoEncontrado = elementos[elementoEncontradoIndex];

        elementos[elementoEncontradoIndex] = {
            ...elementoEncontrado,
            ...nuevosDatos,
        };

        await fs.promises.writeFile(
            this.filePath,
            JSON.stringify(elementos, null, 3)
        );

        return elementoEncontrado;
        } catch (error) {
        console.log(error,"error, no se pudo actualizar el elemento");
        }
    }

    async eliminarXid(id) {
        try {
        const elementos = await this.obtenerTodos();

        const elementoEncontrado = elementos.find((elemento) => elemento.id == id);

        if (!elementoEncontrado) return "error, no se encontro el elemento";

        const filtrarElementos = elementos.filter((elemento) => elemento.id != id);

        await fs.promises.writeFile(this.filePath, JSON.stringify(filtrarElementos, null, 3));
        } 

        catch (error) {
        console.log(error,"error, no se pudo eliminar el elemento");
        }
    }

    async eliminarTodo() {
        try {
        await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
        } catch (error) {
        console.log(error,"error, no se pudo eliminar todo");
        }
    }
}

export { ContenedorFileSystem };