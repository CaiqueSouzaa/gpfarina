import { Sequelize } from "sequelize";
import 'dotenv/config';

import Users from "../app/models/Users";

const models = [Users];

class Database {
    private connection: Sequelize;

    constructor() {
        this.connection = new Sequelize({
            host: process.env.DB_HOSTNAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            dialect: 'mariadb',
            define: {
                timestamps: true,
                underscored: true,
            },
        });

        this.init();
    }

    init() {
        models
            .map((model) => model.initialize(this.connection))
            .map((model) => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();
