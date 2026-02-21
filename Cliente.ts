class Cliente { 
    constructor( 
        public id: number, 
        public nombre: string, 
        public dni: string, 
        public tipo: string ) 
        {
    } mostrarDatos(): void { 
        console.log(`ID: ${this.id}, Nombre: ${this.nombre}, DNI: ${this.dni}, Tipo: ${this.tipo}`); 
    }
 }