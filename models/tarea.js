const {v4: uuidv4} = require('uuid');


class Tarea {

    constructor( desc ) {
        this.id = uuidv4();
        this.desc = desc;
        this.done = false;
    }

}


module.exports = Tarea;