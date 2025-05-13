import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 

    firstname: { type: String },
    lastname: { type: String },
    jobTitle: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    themeColor: { type: String, default: "#000000" },
    summary: { type: String },

    experience: [
        {
            title: { type: String },
            company: { type: String },
            city: { type: String },
            state: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            currentlyWorking: { type: Boolean },
            workSummary: { type: String }
        }
    ],

    education: [
        {
            universityName: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            degree: { type: String },
            major: { type: String },
            description: { type: String }
        }
    ],

    skills: [
        {
            name: { type: String },
            rating: { type: Number }
        }
    ],
    template_id: 
    { 
        type: String 
    }

}, { timestamps: true });

export default mongoose.model("Resume", ResumeSchema);
