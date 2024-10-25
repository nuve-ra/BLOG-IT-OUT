import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    personal_info: {
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        hashed_password: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        profile_img: { type: String, default: '' }
    },
    google_auth: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
