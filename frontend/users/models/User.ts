import { IUser } from "../ts/interfaces/API/IAPI";

class User {
    private id: number;
    private uuid4: string;
    private name: string;
    private surname?: string;
    private login: string;
    private email?: string;

    constructor({ id, uuid4, name, surname, login, email}: IUser) {
        this.id = id;
        this.uuid4 = uuid4;
        this.name = name;
        this.surname = surname;
        this.login = login;
        this.email = email
    }

    public getId(): number {
        return this.id;
    }

    public getUuid4(): string {
        return this.uuid4;
    }

    public getName(): string {
        return this.name;
    }

    public getSurname(): string {
        return this.surname || '';
    }

    public getLogin(): string {
        return this.login;
    }

    public getEmail(): string {
        return this.email || '';
    }
}

export default User;
