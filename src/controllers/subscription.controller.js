// import Subscription from "../models/subscription.model.js"
// import Plan from "../models/plan.model.js";

import {Plan , Subscription} from "../models/index.js"

const subscribe = async (req, res) => {
  try {
    const { planId } = req.body;

    // 1️⃣ Auth Check
    if (!req.user?.id) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    // 2️⃣ Validate planId
    if (!planId) {
      return res.status(400).json({
        status: false,
        message: "planId is required",
      });
    }

    // 3️⃣ Check Active Subscription
    const existingSubscription = await Subscription.findOne({
      where: {
        user_id: req.user.id,
        status: "ACTIVE",
      },
    });

    if (existingSubscription) {
      return res.status(400).json({
        status: false,
        message: "Already have active plan",
      });
    }

    // 4️⃣ Find Plan
    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return res.status(404).json({
        status: false,
        message: "Plan not found",
      });
    }

    // 5️⃣ Date Calculation
    const startDate = new Date();
    const expiryDate = new Date(
      startDate.getTime() + plan.duration_days * 24 * 60 * 60 * 1000
    );

    // 6️⃣ Create Subscription
    const subscription = await Subscription.create({
      user_id: req.user.id,
      plan_id: plan.id,   // safer than planId directly
      start_date: startDate,
      expiry_date: expiryDate,
      status: "ACTIVE",
      payment_status: "SUCCESS",
    });

    return res.status(201).json({
      status: true,
      message: "Subscription created successfully",
      data: subscription,
    });

  } catch (error) {
    console.error("Subscribe Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const upgrade = async (req, res) => {
  try {
    const { planId } = req.body;

    // 1️⃣ Auth Check
    if (!req.user?.id) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    // 2️⃣ Validate planId
    if (!planId) {
      return res.status(400).json({
        status: false,
        message: "planId is required",
      });
    }

    // 3️⃣ Check Active Subscription
    const existingSubscription = await Subscription.findOne({
      where: {
        user_id: req.user.id,
        status: "ACTIVE",
      },
    });

    if (!existingSubscription) {
      return res.status(400).json({
        status: false,
        message: "No active subscription found",
      });
    }

    // 4️⃣ Find New Plan
    const newPlan = await Plan.findByPk(planId);

    if (!newPlan) {
      return res.status(404).json({
        status: false,
        message: "Plan not found",
      });
    }

    // 5️⃣ Prevent Same Plan Upgrade
    if (existingSubscription.plan_id === newPlan.id) {
      return res.status(400).json({
        status: false,
        message: "You are already subscribed to this plan",
      });
    }

    // 6️⃣ Deactivate Old Subscription
    await existingSubscription.update({
      status: "UPGRADED",
    });

    // 7️⃣ Create New Subscription
    const startDate = new Date();
    const expiryDate = new Date(
      startDate.getTime() + newPlan.duration_days * 24 * 60 * 60 * 1000
    );

    const upgradedSubscription = await Subscription.create({
      user_id: req.user.id,
      plan_id: newPlan.id,
      start_date: startDate,
      expiry_date: expiryDate,
      status: "ACTIVE",
      payment_status: "SUCCESS",
    });

    return res.status(200).json({
      status: true,
      message: "Plan upgraded successfully",
      data: upgradedSubscription,
    });

  } catch (error) {
    console.error("Upgrade Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const cancel = async (req, res) => {
  try {
    // 1️⃣ Auth Check
    if (!req.user?.id) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    // 2️⃣ Find Active Subscription
    const subscription = await Subscription.findOne({
      where: {
        user_id: req.user.id,
        status: "ACTIVE",
      },
    });

    if (!subscription) {
      return res.status(400).json({
        status: false,
        message: "No active subscription found",
      });
    }

    // 3️⃣ Cancel Subscription
    await subscription.update({
      status: "CANCELLED",
      expiry_date: new Date(), // immediate cancel
    });

    return res.status(200).json({
      status: true,
      message: "Subscription cancelled successfully",
      data: subscription,
    });

  } catch (error) {
    console.error("Cancel Error:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const fetch_subscription = async (req, res) => {
  try {
    // 1️⃣ Auth Check
    if (!req.user?.id) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    // 2️⃣ Find Active Subscription with Plan Details
    const subscription = await Subscription.findOne({
      where: {
        user_id: req.user.id,
        status: "ACTIVE",
      },
      include: [
        {
          model: Plan,
          as: "plan",
          attributes: ["id", "name", "price", "duration_days"],
        },
      ],
    });

    if (!subscription) {
      return res.status(404).json({
        status: false,
        message: "No active subscription found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Subscription fetched successfully",
      data: subscription,
    });

  } catch (error) {
    console.error("Fetch Subscription Error:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export {
    subscribe,
    upgrade,
    cancel,
    fetch_subscription
}