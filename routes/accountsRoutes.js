import express from "express";

import {
    getAccounts,
    createAccount,
    deleteAccount,
    getAccount,
    updateBalance,
} from "../controllers/accountsController.js";

// Include other resource routers
const router = express.Router({ mergeParams: true });

router.route("/").get(getAccounts).post(createAccount);
router.route("/:id").get(getAccount).put(updateBalance).delete(deleteAccount);

export default router;
