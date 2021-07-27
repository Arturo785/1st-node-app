require('colors');

const {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist} = require('./helpers/inquirer');
const { saveData, readFile } = require('./helpers/manageFile');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const allData = readFile();

    console.log(allData);

    if(allData){
        tareas.recrearTareas(allData);
    }

    do{
        opt = await inquirerMenu(); 

        switch(opt) {
            case '1':
                //create
                const desc = await leerInput("Descripcion: ");
                tareas.crearTarea(desc)
                saveData(tareas.listadoArr)
            break;

            case '2':
                tareas.mostrarTareas();
            break;

            case '3':
                tareas.mostrarTareas(true);
            break;
                
            case '4':
                tareas.mostrarTareas(false);
            break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids)
                saveData(tareas.listadoArr);
            break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                const ok = await confirmar("¿Estas seguro?");
                if(ok){
                    console.log("Borrada");
                    tareas.borrarTarea(id);
                    saveData(tareas.listadoArr);
                }
            break;

        }
        await pausa();
    } while( opt !== '0');
}


main();