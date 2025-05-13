import { useContext } from "react";
import { ResumeContext } from "../../../context/ResumeContext";
import FormSection from "../../Resumes/Forms/FormSection";
import FreeTemplate from "../../Resumes/Templates/free/FreeTemplate";
import PaidTemplate from "../../Resumes/Templates/paid/PaidTemplate";

const EditResume = () => {
  const { resumeInfo } = useContext(ResumeContext);

  const selectedType =
  resumeInfo?.selectedTemplateType ||
  resumeInfo?.templateType || 
  localStorage.getItem("templateType") || 
  "free"; // fallback

const TemplateComponent = selectedType === "paid" ? PaidTemplate : FreeTemplate;


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
      <FormSection />
      <div className="relative">
        <TemplateComponent />
      </div>
    </div>
  );
};

export default EditResume;
