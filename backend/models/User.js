import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        memberId: {
            type: String,
            required: true,
            unique: true,
            immutable: true, // ne peut plus être modifié une fois créé
            uppercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            trim: true,
            default: "",
        },
        password: {
            type: String,
            required: true, // toujours stocké haché, jamais en clair
        },
        role: {
            type: String,
            enum: ["admin", "member"],
            default: "member",
        },
        isFirstLogin: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // ajoute createdAt / updatedAt automatiquement
    }
);

// Ne jamais renvoyer le hash du mot de passe dans un JSON, même par erreur
userSchema.set("toJSON", {
    transform: (_doc, ret) => {
        delete ret.password;
        return ret;
    },
});

export default mongoose.model("User", userSchema);