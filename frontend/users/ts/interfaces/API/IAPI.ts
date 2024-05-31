export interface ICreatedBy {
    id: number;
    uuid4: string;
    name: string;
    surname?: string;
    login: string;
};

export interface IAnUser {
    id: number;
    uuid4: string;
    name: string;
    surname?: string;
    login: string;
    reset_password: boolean;
    email?: string;
    telephone?: string;
    createdBy?: ICreatedBy;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUser {
    id: number;
    uuid4: string;
    name: string;
    surname?: string;
    login: string;
    email?: string;
}

export interface ICreateUser {
    name: string;
    surname?: string;
    login: string;
    password: string;
    reset_password: string;
    email?: string;
    telephone?: string;
}