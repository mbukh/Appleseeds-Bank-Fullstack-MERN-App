import asyncHandler from "../middleware/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Account from "../models/Account.js";
import User from "../models/User.js";

// @desc    Get Accounts + Query
// @route   GET /api/v1/accounts
// @access Public
export const getAccounts = asyncHandler(async (req, res, next) => {
    const {
        passportId,
        minCash = null,
        maxCash = null,
        minCredit = null,
        maxCredit = null,
    } = { ...req.query, ...req.body };

    let query = {};
    if (passportId) {
        const user = await User.findOne({ passportId });
        if (!user) {
            throw new ErrorResponse(
                `No accounts found for passportId ${passportId}`,
                404
            );
        }
        query.owner = user.id;
    }
    if (minCash !== null) query.cash = { $gte: minCash };
    if (maxCash !== null) query.cash = { ...query.cash, $lte: maxCash };
    if (minCredit !== null) query.credit = { $gte: minCredit };
    if (maxCredit !== null) query.credit = { ...query.credit, $lte: maxCredit };

    const accounts = await Account.find(query);

    if (!accounts || accounts.length === 0) {
        throw new ErrorResponse(`No accounts found matching search criteria`, 404);
    }

    res.status(200).json({
        success: true,
        data: accounts,
    });
});

// @desc    Create Account
// @route   POST /api/v1/accounts
// @access Public
export const createAccount = asyncHandler(async (req, res, next) => {
    const { passportId } = req.body;

    let user = await User.findOne({ passportId });
    if (!user) {
        throw new ErrorResponse(`Account with passportId '${passportId}' not found`, 404);
    }

    const account = await Account.create({ owner: user.id });

    user = await User.findByIdAndUpdate(
        user.id,
        {
            $push: { accounts: account.id },
        },
        { new: true }
    );
    res.status(200).json({
        success: true,
        data: `Account with id ending ...${account.id.slice(
            -6
        )} was added successfully to user with passportId ${user.passportId}`,
    });
});

// @desc    Get Account By Id
// @route   GET /api/v1/accounts/:id
// @access Public
export const getAccount = asyncHandler(async (req, res, next) => {
    const account = await Account.findById(req.params.id);
    if (!account) {
        throw new ErrorResponse(
            `Account with id ending ...'${req.params.id.slice(-6)}' not found`,
            404
        );
    }

    res.status(200).json({
        success: true,
        data: account,
    });
});

// @desc    update a account cash
// @route   PUT /api/v1/accounts/:id
// @access Public
export const updateBalance = asyncHandler(async (req, res, next) => {
    const { credit = 0, cash = 0 } = req.body;

    let account = await Account.findById(req.params.id);
    if (!account) {
        new ErrorResponse(
            `Owner of an account with id ending ...'${req.params.id.slice(
                -6
            )}' not found`,
            404
        );
    }
    const { cash: prevCash, credit: prevCredit } = account;

    // runValidators will not work with $inc
    account = await Account.findByIdAndUpdate(
        account.id,
        { credit: prevCredit + credit, cash: prevCash + cash },
        { new: true, runValidators: true }
    );
    if (!account) {
        throw new ErrorResponse(
            `Account with id ending ...'${req.params.id.slice(-6)}' not found`,
            404
        );
    }

    await Account.updateUserBalance(account.owner);

    res.status(200).json({
        success: true,
        data: `Balance was Changed`,
    });
});

// @desc    Delete a account
// @route   DELETE /api/v1/accounts/:id
// @access Public
export const deleteAccount = asyncHandler(async (req, res, next) => {
    const accountID = req.params.id;

    const account = await Account.findById(accountID);
    if (!account) {
        throw new ErrorResponse(
            `Account that ends with '${accountID.slice(-6)}' not found`,
            404
        );
    }

    let user = await User.findById(account.owner);
    if (user.accounts.length === 1) {
        throw new ErrorResponse(
            `Account with id ending ...'${accountID.slice(
                -6
            )}' cannot be deleted because it is the last user's account`,
            403
        );
    }

    user = await User.findByIdAndUpdate(
        account.owner,
        { $pull: { accounts: accountID } },
        { new: true }
    );

    await account.deleteOne(); // delete the account document

    await Account.updateUserBalance(account.owner);

    res.status(200).json({
        success: true,
        data: `Account with id ending ...'${accountID.slice(
            -6
        )}' was deleted successfully`,
    });
});
