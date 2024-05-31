import { Sequelize, Model, InferAttributes, InferCreationAttributes, DataTypes, DATE } from "sequelize";
import bcrypt from 'bcrypt';

class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
    declare id?: number;
    declare uuid4?: string;
    declare name?: string;
    declare surname?: string;
    declare login?: string;
    declare password?: string;
    declare password_hash?: string;
    declare reset_password?: boolean;
    declare email?: string;
    declare telephone?: string;
    declare created_by?: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;

    static initialize(sequelize: Sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                uuid4: DataTypes.STRING,
                name: DataTypes.STRING,
                surname: DataTypes.STRING,
                login: DataTypes.STRING,
                password: DataTypes.VIRTUAL,
                password_hash: DataTypes.STRING,
                reset_password: DataTypes.BOOLEAN,
                email: DataTypes.STRING,
                telephone: DataTypes.STRING,
                created_by: DataTypes.INTEGER,
            }, {
                sequelize,
                modelName: 'Users',
                tableName: 'users',
            },
        );

        this.addHook('beforeSave', async (user) => {
                //@ts-ignore
            if (user.password) {
                //@ts-ignore
                user.password_hash = await bcrypt.hash(user.password, 12);
            }
        });

        return this;
    }

    checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password_hash!);
    }

    //@ts-ignore
    static associate(model) {
        this.belongsTo(model.Users, { foreignKey: 'created_by', as: 'createdBy' });
    }
}

export default Users;
