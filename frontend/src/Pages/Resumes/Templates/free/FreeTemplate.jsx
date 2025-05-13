import PersonalDetailsPreview from "./PersonalDetailsPreview";
import EducationPreview from "./EducationPreview";
import SkillsPreview from "./SkillsPreview";
import ResumeExpirence from "./ResumeExpirence";
import ResumeSummary from "./ResumeSummary";
import { useContext } from "react";
import { ResumeContext } from "../../../../context/ResumeContext";

const FreeTemplate = ({ data }) => {
  const { resumeInfo } = useContext(ResumeContext);
  const finalData = data || resumeInfo; // use passed data or fallback to context

  return (
    <div className="shadow-lg p-8 dark:bg-gray-800 bg-gray-50">
      <PersonalDetailsPreview resumeInfo={finalData} />
      <ResumeSummary resumeInfo={finalData} />
      <ResumeExpirence resumeInfo={finalData} />
      <EducationPreview resumeInfo={finalData} />
      <SkillsPreview resumeInfo={finalData} />
    </div>
  );
};

export default FreeTemplate;
