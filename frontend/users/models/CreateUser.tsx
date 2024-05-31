import { ReactNode } from "react";
import UserController from "../controllers/UserController";

class CreateUser {
    private name: string;
    private login: string;
    private password: string;
    private reset_password: string;
    private surname?: string;
    private email?: string;
    private telephone?: string;

    constructor({ name, surname, login, password, reset_password, email, telephone }: { name: string, surname?: string, login: string, password: string, reset_password: string, email?: string, telephone?: string }) {
        this.name = name.trim();
        this.surname = surname?.trim();
        this.login = login.trim();
        this.password = password;
        this.reset_password = reset_password;
        this.email = email?.trim();
        this.telephone = telephone?.trim();
    }

    public validations(): ReactNode {
        const style = {
            color: 'red',
            backgroundColor: '#000000',
            padding: '5px',
            borderRadius: '4px',
            cursor: 'pointer',
        };
        if (!this.checkName()) {
            return <span>Campo <label htmlFor="input-name" style={style}>[Nome]</label> é obrigatório</span>;
        } else if (!this.checkLogin()) {
            return <span>Campo <label htmlFor="input-login" style={style}>[Login]</label> deve possuir 5 ou mais caracteres</span>;
        } else if (!this.checkPassword()) {
            return <span>Campo <label htmlFor="input-password" style={style}>[Senha]</label> deve possuir 5 ou mais caracteres</span>;
        } else if (!this.checkResetPassword()) {
            return <span>Valor atribuido ao campor <label htmlFor="input-reset-password" style={style}>"Redefinir senha após primeiro acesso"</label> não válido</span>;
        } else if (!this.checkEmail()) {
            return <span>E-mail não válido. Certifique-se de que o e-mail possua <label htmlFor="input-email" style={style}>"@grupofarina.com.br"</label></span>
        } else {
            return '';
        }
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

    public getPassword(): string {
        return this.password;
    }

    public getResetPassword(): string {
        return this.reset_password;
    }

    public getEmail(): string | undefined {
        return this.email;
    }

    public getTelephone(): string | undefined {
        return this.telephone;
    }

    public async checkHasLogin() {
        if (! await UserController.checkLogin(this.getLogin())) {
            return 'Nome de login não disponível para uso';
        } else {
            return '';
        }
    }

    /**
     * 
     * @returns boolean - Retorno informado se o nome de usuário é válido
     */
    private checkName(): boolean {
        if (this.name.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @returns  boolean - Retorno informado se o nome de login de usuário é válido
     */
    private checkLogin(): boolean {
        if (this.login.length >= 5) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @returns  boolean - Retorno informado se a senha de login de usuário é válida
     */
    private checkPassword(): boolean {
        if (this.password.length >= 5) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @returns  boolean - Retorno informado se a valor de redefinir senha de usuário é válida
     */
    private checkResetPassword(): boolean {
        switch (this.reset_password) {
            case 'true':
                return true;
                break;
            case 'false':
                return true;
                break;
            default:
                return false;
                break;
        }
    }

    /**
     * 
     * @returns  boolean - Retorno informado se o e-mail de usuário é válido
     */
    private checkEmail(): boolean {
        if (this.email) {
            if (this.email.match(/^[a-zA-Z0-9.]+@grupofarina\.com\.br$/)) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
}

export default CreateUser;