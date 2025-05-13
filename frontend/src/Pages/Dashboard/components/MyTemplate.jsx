import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TemplateCard from "./TemplateCard";
import FreeTemplate from "../../Resumes/Templates/free/FreeTemplate";
import PaidTemplate from "../../Resumes/Templates/paid/PaidTemplate";
import { createOrUpdateResume, createCheckoutSession, verifyPayment, checkIfUserAlreadyPaid  } from "../../../../services/api";
import { toast } from "sonner";
import { ResumeContext } from "../../../context/ResumeContext";
import { loadStripe } from "@stripe/stripe-js";


const templates = [
  {
    id: 1,
    title: "Classic Resume",
    image: "https://cdn.pixabay.com/photo/2016/11/05/11/15/resume-1799954_1280.png",
    isPaid: false,
    component: FreeTemplate,
  },
  {
    id: 2,
    title: "Modern Resume",
    image: "https://cdn.pixabay.com/photo/2016/11/05/11/15/resume-1799954_1280.png",
    isPaid: true,
    component: PaidTemplate,
  },
];

const MyTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const navigate = useNavigate();
  const stripePromise = loadStripe("pk_test_51R1ul3Rx9qoLIstGJwoCaNMmzaHIwmoxbfWgn2Gr2Cb7BlUvcrpSvhKYR9WaiAeqDf7AH54Fxr4ODHYfnypNo0kv00RjgYQuIq");  // Your actual key here


  const checkIfPaid = async (token) => {
  try {
    const res = await checkIfUserAlreadyPaid(token);
    console.log("🔍 checkIfUserAlreadyPaid Response:", res.data); // ← ADD THIS
    return res.data.success === true;
  } catch (err) {
    console.error("❌ Error verifying payment", err);
    return false;
  }
};





  const handleTemplateSelection = (component, type) => {
  setResumeInfo((prev) => ({
    ...prev,
    selectedTemplateType: type,
  }));

  localStorage.setItem("templateType", type);

  // Just preview the template
  setSelectedTemplate(() => component);
};

const handleEditClick = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Login required to edit resume");
    return;
  }

  const templateType = resumeInfo.selectedTemplateType || localStorage.getItem("templateType");

  // ✅ Check payment only if it's a paid template
  if (templateType === "paid") {
    const alreadyPaid = await checkIfPaid(token);
  //  res.data?.success;
    if (!alreadyPaid) {
      try {
        const stripe = await stripePromise;
        const res = await createCheckoutSession("template_premium");
        const sessionUrl = res.data.url;
        window.location.href = sessionUrl;
        return;
      } catch (err) {
        toast.error("Payment failed");
        return;
      }
    }
  }

  // ✅ Continue to resume creation
  const resumeId = resumeInfo?._id || null;
  const initialResumeData = {
    firstname: "",
    lastname: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    templateType,
  };

  try {
    const response = await createOrUpdateResume(token, initialResumeData, resumeId);
    const newResumeId = response?.data?._id;
    if (newResumeId) {
      toast.success("Resume Created. Redirecting...");
      setTimeout(() => {
        navigate(`/dashboard/edit-resume/${newResumeId}`);
      }, 500);
    } else {
      toast.error("Failed to create resume");
    }
  } catch (error) {
    toast.error("Server error while creating resume");
    console.error("Error creating resume:", error.message);
  }
};



  return (
    <div className="p-4">
      {!selectedTemplate ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              title={template.title}
              image={template.image}
              isPaid={template.isPaid}
              onClick={() =>
                handleTemplateSelection(template.component, template.isPaid ? "paid" : "free")
              }
            />
          ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <button className="p-2 border rounded" onClick={() => setSelectedTemplate(null)}>
              ← Back to Templates
            </button>       
            <div>
            <button
              className="p-2 border rounded bg-primary dark:bg-gray-800 text-white"
              onClick={handleEditClick}
            >
              ✏️ Edit
            </button>
             </div>
          </div>
          {/* Dynamically render selected template */}
          {React.createElement(selectedTemplate)}
        </div>
      )}
    </div>
  );
};

export default MyTemplates;