import expressRouter from 'express';

const mailRouter = expressRouter.Router();
import {MailController} from "../controller/mail.controller";

mailRouter.post("/", MailController.apiPostSendMail);

export {mailRouter }
