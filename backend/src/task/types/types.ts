// !info: Ingresa
export interface ITaskRequest {
    name: string,
    description: string,
    date: string | Date,
}

// !info: Devolvemos
export interface ITaskResponse {
    id: number,
    name: string,
    description: string,
    date: string | Date,
}