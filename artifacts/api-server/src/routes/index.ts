import { Router, type IRouter } from "express";
import contactEnquiriesRouter from "./contact-enquiries";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactEnquiriesRouter);

export default router;
