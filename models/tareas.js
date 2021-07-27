const Tarea = require("./tarea");
require('colors');

class Tareas {

    constructor() {
        this._tareas = {};
    }

    get listadoArr() {

        const listado = [];
        Object.keys(this._tareas).forEach( key => {
            const tarea = this._tareas[key];
            listado.push( tarea );
        });

        return listado;
    }


    crearTarea( desc = "") {
        const tareaNew = new Tarea(desc)

       this._tareas[tareaNew.id] = tareaNew;
    }

    borrarTarea( id = '' ) {

        if ( this._tareas[id] ) {
            delete this._tareas[id];
        }

    }

    mostrarTareas( flag ) {

        console.log("\n")

        if(flag == null){
            Object.keys(this._tareas).forEach( (element, i) => {
                const tarea = this._tareas[element]
                const index = `${i + 1}`.green
                const done = tarea.done ? `completada`.green  : `faltante`.red
                console.log(`${index} :: ${tarea.desc} ::  ${done}`);
            });
        }
        else {
            Object.keys(this._tareas).forEach((element, i) => {
                const tarea = this._tareas[element]
            
                if(tarea.done === flag){
                    const index = `${i + 1}`.green
                    const done = tarea.done ? `completada`.green  : `faltante`.red
                    console.log(`${index} :: ${tarea.desc} ::  ${done}`);
                }
            }); 
        }

    }

    recrearTareas (dataArray = []) {
        dataArray.forEach( tarea => {
            this._tareas[tarea.id] = tarea
        })
    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {
            const tareaChange = this._tareas[id];
            this._tareas[id].done = !tareaChange.done
        })
    }
}


module.exports = Tareas