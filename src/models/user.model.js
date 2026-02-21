import sequelize from "../db/db.js"
import { DataTypes } from "sequelize"

const User = sequelize.define("users" , 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("User", "Admin"),
            allowNull: false,
            defaultValue: "User",
        },
    },
    {
        tableName: "users",
        timestamps: true
    }
)

export default User