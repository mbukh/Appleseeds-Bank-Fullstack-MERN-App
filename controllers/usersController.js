import asyncHandler from "../middleware/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/User.js";
import Account from "../models/Account.js";

//@desc Get Users + Query
//@route GET /api/v1/users
//@access Public
export const getUsers = asyncHandler(async (req, res, next) => {
    Object.entries(req.query).forEach(
        ([key, value]) => value === "" && delete req.query[key]
    );

    const {
        name,
        email,
        minAge,
        maxAge,
        passportId,
        minCash,
        maxCash,
        minCredit,
        maxCredit,
        active,
    } = {
        ...req.query,
        ...req.body,
    };

    let query = {};
    if (passportId) query.passportId = passportId.toUpperCase();
    if (name) query.name = new RegExp(name, "i");
    if (email) query.email = email.toLowerCase();
    if (minAge !== undefined) query.age = { $gte: minAge };
    if (maxAge !== undefined) query.age = { ...query.age, $lte: maxAge };
    if (minCash !== undefined) query.totalCash = { $gte: minCash };
    if (maxCash !== undefined) query.totalCash = { ...query.totalCash, $lte: maxCash };
    if (minCredit !== undefined) query.totalCredit = { $gte: minCredit };
    if (maxCredit !== undefined)
        query.totalCredit = { ...query.totalCredit, $lte: maxCredit };
    if (active !== undefined) query.active = active;

    const users = await User.find(query).populate({ path: "accounts" });
    if (!users || users.length === 0) {
        throw new ErrorResponse(`No users found matching search criteria`, 404);
    }

    res.status(200).json({
        success: true,
        data: users,
    });
});

// @desc    Create a User
// @route   POST /api/v1/users
// @access  Public
export const createUser = asyncHandler(async (req, res, next) => {
    let user = await User.create(req.body);

    const account = await Account.create({ owner: user.id });

    user = await User.findByIdAndUpdate(
        user.id,
        {
            $push: { accounts: account.id },
        },
        { new: true }
    ).populate({ path: "accounts" });

    res.status(200).json({
        success: true,
        data: user,
    });
});

// @desc    Update a User
// @route   PUT /api/v1/users/:id
// @access  Public
export const updateUser = asyncHandler(async (req, res, next) => {
    const { active, name, age, passportId, email } = req.body;

    let query = {};
    if (active !== undefined) query.active = active;
    if (name !== undefined) query.name = name;
    if (age !== undefined) query.age = age;
    if (passportId !== undefined) query.passportId = passportId;
    if (email !== undefined) query.email = email;

    const user = await User.findByIdAndUpdate(req.params.id, query, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: user,
    });
});

// @desc    Get a single User
// @route   GET /api/v1/users/:id
// @access  Public
export const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).populate({ path: "accounts" });

    if (!user) {
        throw new ErrorResponse(
            `User with id enging ...'${req.params.id.slice(-6)}' not found`,
            404
        );
    }

    res.status(200).json({
        success: true,
        data: user,
    });
});

// @desc    Delete a User
// @route   DELETE /api/v1/users/:id
// @access  Public
export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        throw new ErrorResponse(
            `User with id ending ...'${req.params.id.slice(-6)}' not found`,
            404
        );
    }

    const accounts = await Account.deleteMany({ owner: user._id });
    if (!accounts.acknowledged) {
        throw new ErrorResponse(`Error occurred while deleting user accounts`, 400);
    }

    user.deleteOne();

    res.status(200).json({
        success: true,
        data: "User and accounts removed",
    });
});
