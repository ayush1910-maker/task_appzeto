import sequelize from "../db/db.js";

import User from "./user.model.js";
import Plan from "./plan.model.js";
import Subscription from "./subscription.model.js";

/* ================= ASSOCIATIONS ================= */

// USER ↔ SUBSCRIPTION
User.hasMany(Subscription, {
  foreignKey: "user_id",
  as: "subscriptions",
});

Subscription.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// PLAN ↔ SUBSCRIPTION
Plan.hasMany(Subscription, {
  foreignKey: "plan_id",
  as: "subscriptions",
});

Subscription.belongsTo(Plan, {
  foreignKey: "plan_id",
  as: "plan",   // 🔥 THIS ALIAS MUST MATCH INCLUDE
});

export { sequelize, User, Plan, Subscription };