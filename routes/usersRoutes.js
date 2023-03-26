import express from "express";

import {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
} from "../controllers/usersController.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
