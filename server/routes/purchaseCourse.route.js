import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCheckoutSession, get_Course_Details_With_Purchase_Status, stripeWebhook } from '../controller/coursePurchase.controller.js';

const purchaseRouter = express.Router();

purchaseRouter.post('/checkout/create-checkout-session', isAuthenticated, createCheckoutSession);
purchaseRouter.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

purchaseRouter.get('/getCourseDetails/:courseId',isAuthenticated,get_Course_Details_With_Purchase_Status);

export default purchaseRouter;