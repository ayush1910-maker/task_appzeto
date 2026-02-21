// import Plan from "../models/plan.model.js"
import {Plan} from "../models/index.js";

const createPlan = async (req, res) => {
  try {

    if (req.user.role !== "Admin") {
      return res.status(403).json({
        status: false,
        message: "Only Admin can create plan"
      });
    }

    const { name, price, duration_days } = req.body;

    const existedPlan = await Plan.findOne({ where: { name } });

    if (existedPlan) {
      return res.json({
        status: false,
        message: "Plan already exists"
      });
    }

    const plan = await Plan.create({
      name,
      price,
      duration_days
    });

    return res.json({
      status: true,
      message: "Plan created successfully",
      data: plan
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    });
  }
};

export {
    createPlan
}