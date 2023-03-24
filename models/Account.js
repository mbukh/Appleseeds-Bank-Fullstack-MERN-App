import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
    {
        owner: {
            type: String,
            ref: "User",
            required: [true, "Account must have an owner"],
        },
        credit: {
            type: Number,
            min: [0, "Account credit must not be a negative number"],
            default: 0,
        },
        cash: {
            type: Number,
            default: 0,
        },
    },

    {
        timestamps: true,
        toJSON: {
            // virtuals: true,
            // Hide the _id and the __v field from the frontend
            transform: function (_, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        toObject: {
            // virtuals: true,
            // Hide the _id and the __v field from the frontend
            transform: function (_, ret) {
                // ret.id = ret._id;
                // delete ret._id;
                delete ret.__v;
            },
        },
    }
);

// Static method to get the user total balance
AccountSchema.statics.updateUserBalance = async function (ownerId) {
    const aggregationArr = await this.aggregate([
        {
            $match: { owner: ownerId },
        },
        {
            $group: {
                _id: "$owner",
                totalCash: { $sum: "$cash" },
                totalCredit: { $sum: "$credit" },
            },
        },
    ]);

    const { totalCash, totalCredit } = aggregationArr[0];

    const user = await this.model("User").findByIdAndUpdate(
        ownerId,
        {
            totalCash: totalCash,
            totalCredit: totalCredit,
        },
        { new: true }
    );
    if (!user) {
        throw new ErrorResponse(
            `Balance update failed for a user with id ending ...${ownerId.sliced(-6)} `,
            404
        );
    }

    return user;
};

export default mongoose.model("Account", AccountSchema);
