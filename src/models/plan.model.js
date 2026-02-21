import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";

const Plan = sequelize.define(
  "Plan",   // ✅ Model name singular
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duration_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "plans",  // ✅ table alag
    timestamps: true,
  }
);

export default Plan;