import PersonalDetailsPreview from "./PersonalDetailsPreview";
import EducationPreview from "./EducationPreview";
import SkillsPreview from "./SkillsPreview";
import ResumeExpirence from "./ResumeExpirence";
import ResumeSummary from "./ResumeSummary";
import { useContext } from "react";
import { ResumeContext } from "../../../../context/ResumeContext";

const PaidTemplate = ({ data }) => {
  const { resumeInfo } = useContext(ResumeContext);
  const finalData = data || resumeInfo;

  return (
    <div
      className="shadow-xl p-10 dark:bg-gray-800 bg-gray-50 border-l-8"
      style={{ borderColor: finalData?.themeColor }}
    >
      <PersonalDetailsPreview resumeInfo={finalData} />
      <ResumeSummary resumeInfo={finalData} />
      <ResumeExpirence resumeInfo={finalData} />
      <EducationPreview resumeInfo={finalData} />
      <SkillsPreview resumeInfo={finalData} />
    </div>
  );
};

export default PaidTemplate;
