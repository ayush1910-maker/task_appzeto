import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";

const Subscription = sequelize.define(
  "Subscription",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "EXPIRED", "CANCELLED"),
      defaultValue: "ACTIVE",
    },
    payment_status: {
      type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"),
      defaultValue: "PENDING",
    },
  },
  {
    tableName: "subscriptions",
    timestamps: true,
  }
);

export default Subscription;