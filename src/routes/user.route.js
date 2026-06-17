import express,{Router} from "express";
import { createNewUser, getAllUsers, searchSpecificUserByEmail,searchSpecificUserByName } from "../controllers/user.controller.js";
const router = Router();

router.route("/get-all-users").get(getAllUsers);
router.route("/get-specific-user/:email").get(searchSpecificUserByEmail);
router.route("/get-specific-user-by-name/:name").get(searchSpecificUserByName);
router.route("/create-new-user").post(createNewUser);

export default router;