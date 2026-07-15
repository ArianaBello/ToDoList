// !info: Ingresa
export interface ITaskRequest {
    name: string,
    description: string,
    date: string | Date,
    priority: PriorityEnum,
}

export enum PriorityEnum {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

// !info: Devolvemos
export interface ITaskResponse {
    id: number,
    name: string,
    description: string,
    date: string | Date,
    priority: PriorityEnum,
}