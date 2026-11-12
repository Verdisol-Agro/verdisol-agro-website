import { Router, type IRouter } from "express";
import contactEnquiriesRouter from "./contact-enquiries";
import healthRouter from "./health";
import mediaRouter from "./media";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactEnquiriesRouter);
router.use(mediaRouter);

export default router;
