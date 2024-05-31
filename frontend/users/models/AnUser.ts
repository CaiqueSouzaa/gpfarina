import { ICreatedBy, IAnUser } from '../ts/interfaces/API/IAPI';

class AnUser {
    private id: number;
    private uuid4: string;
    private name: string;
    private surname?: string;
    private login: string;
    private reset_password: boolean;
    private email?: string;
    private telephone?: string;
    private createdBy?: ICreatedBy;
    private createdAt: Date;
    private updatedAt: Date;

    constructor({ id, uuid4, name, surname, login, reset_password, email, telephone, createdBy, createdAt, updatedAt }: IAnUser) {
        this.id = id;
        this.uuid4 = uuid4;
        this.name = name;
        this.surname = surname;
        this.login = login;
        this.reset_password = reset_password;
        this.email = email;
        this.telephone = telephone;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public getId(): number {
        return this.id;
    }

    public getUUID4(): string {
        return this.uuid4;
    }

    public getName(): string {
        return this.name;
    }

    public getSurname(): string | undefined {
        return this.surname;
    }

    public getLogin(): string {
        return this.login;
    }

    public getResetPassword(): boolean {
        return this.reset_password;
    }

    public getEmail(): string | undefined {
        return this.email;
    }

    public getTelephone(): string | undefined {
        return this.telephone;
    }
}

export default AnUser;
