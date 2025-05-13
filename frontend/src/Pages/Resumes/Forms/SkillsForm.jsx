import { useContext, useState, useEffect } from "react";
import { ResumeContext } from "../../../context/ResumeContext";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { LoaderCircle, BrainCircuit, Trash2 } from "lucide-react";
import * as api from "../../../../services/api";
import { toast } from "sonner";

function SkillsForm() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [skills, setSkills] = useState(resumeInfo.skills || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.skills) setSkills(resumeInfo.skills);
  }, [resumeInfo]);

  const handleSkillChange = (index, field, value) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: field === "rating" ? parseInt(value) : value };
    setSkills(updated);
    setResumeInfo({ ...resumeInfo, skills: updated });
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", rating: 50 }]);
  };

  const removeSkill = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
    setResumeInfo({ ...resumeInfo, skills: updated });
  };

  const generateSkillsFromAI = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const data = await api.suggestAISkills(resumeInfo?.jobTitle, token);
      if (data.skills && Array.isArray(data.skills)) {
        const formatted = data.skills.map((s) =>
          typeof s === "string" ? { name: s, rating: 60 } : s
        );
        setSkills(formatted);
        setResumeInfo({ ...resumeInfo, skills: formatted });
        toast("Skills generated from AI");
      } else {
        toast("Failed to generate skills");
      }
    } catch (err) {
      console.error("AI error:", err);
      toast("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSaveSkills = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to update.");
      return;
    }

    try {
      const cleaned = skills.filter((s) => s.name.trim() !== '');
      const response = await api.createOrUpdateResume(token, {
        ...resumeInfo,
        skills: cleaned,
      }, resumeInfo?._id);

      setResumeInfo(response.data);
      toast("Skills Updated Successfully");
    } catch (err) {
      console.error(err);
      toast("Failed to update skills");
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <form onSubmit={onSaveSkills}>
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={generateSkillsFromAI}
            size="sm"
            variant="outline"
            type="button"
            disabled={loading}
            className="flex gap-2 border-primary text-primary"
          >
            <BrainCircuit className="h-4 w-4" />
            Generate Skills from AI
          </Button>
        </div>

        {skills.map((skill, index) => (
          <div key={index} className="grid grid-cols-3 gap-3 mb-4 items-end">
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={skill.name}
                onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                placeholder="e.g., JavaScript"
              />
            </div>
            <div>
              <Label>Rating</Label>
              <Input
                name="rating"
                type="number"
                min={0}
                max={100}
                value={skill.rating}
                onChange={(e) => handleSkillChange(index, "rating", e.target.value)}
                placeholder="0–100"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeSkill(index)}
              className="w-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        ))}

        <div className="flex gap-4 mt-4 justify-end">
          <Button type="button" onClick={addSkill}>Add Skill</Button>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save Skills"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SkillsForm;
