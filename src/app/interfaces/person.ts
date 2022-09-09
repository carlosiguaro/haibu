interface Address {
    calle: string;
    numero: number;
    comuna: string;
}
export interface IPerson {
    nombre:string;
    apellido:string;
    telefono:number;
    rut:string;
    fechaNacimiento:string;
    direccion:Address
    activo:number;
    validRut?: boolean;
    validFechaNacimiento?: boolean;
}
