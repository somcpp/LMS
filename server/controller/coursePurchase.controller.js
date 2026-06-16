import Stripe from "stripe";
import { Course } from "../models/course.model.js";
import { CoursePurshase } from "../models/purchaseCourse.model.js";
import { User } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        message: "Course not found!",
      });
    }

    //create a new course purchase record
    const newPurchase = new CoursePurshase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: 'pending',
    });

    // create a stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-progress/${courseId}`, // once payment successful redirect to course progress page
      cancel_url: `http://localhost:5173/course-detail/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"], // Optionally restrict allowed countries
      },
    });
    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    // Save the purchase record
    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url, // Return the Stripe checkout URL
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Some error occured while processing payment"
    })
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    console.log("checkout.session.completed received");

    try {
      const session = event.data.object;

      const purchase = await CoursePurshase.findOne({
        paymentId: session.id,
      }).populate("courseId");

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      // Prevent duplicate processing
      if (purchase.status === "completed") {
        return res.status(200).send();
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }

      purchase.status = "completed";

      await purchase.save();

      // Enroll student
      await User.findByIdAndUpdate(purchase.userId, {
        $addToSet: {
          enrolledCourses: purchase.courseId._id,
        },
      });

      // Add student to course
      await Course.findByIdAndUpdate(purchase.courseId._id, {
        $addToSet: {
          enrolledStudents: purchase.userId,
        },
      });

      console.log(
        `User ${purchase.userId} enrolled in course ${purchase.courseId._id}`,
      );
    } catch (error) {
      console.error("Error handling checkout.session.completed:", error);

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  return res.status(200).send();
};

export const get_Course_Details_With_Purchase_Status = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    }

    const purchased = await CoursePurshase.findOne({ userId, courseId });
    let coursePurchased = false;
    if(purchased && purchased.status === "completed") {
      coursePurchased = true;
    }
    return res.status(200).json({
      course,
      purchased: coursePurchased
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Something Went wrong while fetching course Details",
    });
  }
};

// export const getAllPurchasedCourses = async (_,res) => {
//   try {
//     const purchasedCourses = 
//   } catch (error) {
    
//   }
// }