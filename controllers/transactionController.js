import asyncHandler from "../middleware/asyncHandler.js";

import ErrorResponse from "../utils/ErrorResponse.js";

import Account from "../models/Account.js";

//@desc Get Users + Query
//@route GET /api/v1/users
//@access Public
export const createTransaction = asyncHandler(async (req, res, next) => {
    const { sender, receiver, amount } = req.body;

    if (!sender || !receiver || !amount) {
        throw new ErrorResponse(
            `Sender, receiver and amount are mandatory to make a transaction`,
            400
        );
    }

    const checkAccount = async (accountId) => {
        let result = await Account.findById(accountId);
        if (!result) {
            throw new ErrorResponse(
                `Sender account with id ending ...${accountId.slice(-6)} not found`,
                404
            );
        }
        return result;
    };
    let senderAccount = await checkAccount(sender);
    let receiverAccount = await checkAccount(receiver);

    const checkTransactionResult = (result) => {
        if (!result) {
            throw new ErrorResponse(
                `Transaction failed by account with id ending ...${sender.slice(-6)}`,
                400
            );
        }
        return result;
    };
    senderAccount = checkTransactionResult(
        await Account.findByIdAndUpdate(
            sender,
            { $inc: { cash: -amount } },
            { new: true }
        )
    );
    receiverAccount = checkTransactionResult(
        await Account.findByIdAndUpdate(
            receiver,
            { $inc: { cash: amount } },
            { new: true }
        )
    );

    res.status(200).json({
        success: true,
        data: {
            sender: { id: senderAccount.id, cash: senderAccount.cash },
            receiver: { id: receiverAccount.id, cash: receiverAccount.cash },
        },
    });
});
