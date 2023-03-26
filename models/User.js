import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        passportId: {
            type: String,
            required: [true, "Please Insert your passportId"],
            trim: true,
            match: [/^[0-9a-z]{8,12}$/gi, "Must consist at least 8-12 letters or digits"],
            uppercase: true,
            unique: true,
        },
        name: {
            type: String,
            required: [true, "Please add a name"],
            trim: true,
            maxlength: [35, "Name can not be more than 35 characters"],
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "Please add a Email"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
            unique: true,
        },
        age: {
            type: Number,
            required: [true, "Please Insert Age"],
            min: [18, "You need to be over 18 to open an account"],
        },
        accounts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Account",
            },
        ],
        totalCash: {
            type: Number,
            default: 0,
        },
        totalCredit: {
            type: Number,
            min: [0, "Total credit must not be a negative number"],
            default: 0,
        },
        active: {
            type: Boolean,
            default: true,
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

export default mongoose.model("User", UserSchema);
