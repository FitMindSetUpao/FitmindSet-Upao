import { Meta } from "./meta.model";

export interface Habito{
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    metas: Meta[];
}