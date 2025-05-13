import { useContext, useState, useEffect } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { LoaderCircle, Trash2 } from 'lucide-react';
import * as api from '../../../../services/api';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

function ExperienceForm() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const { resumeId: paramResumeId } = useParams();
  const resumeId = resumeInfo?._id || paramResumeId;

  const [experienceList, setExperienceList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.experience?.length) {
      setExperienceList(resumeInfo.experience);
    } else {
      setExperienceList([{
        title: '',
        company: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        workSummary: '',
      }]);
    }
  }, [resumeInfo]);

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updated = [...experienceList];
    updated[index][name] = type === 'checkbox' ? checked : value;
    setExperienceList(updated);
    setResumeInfo((prev) => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
    setExperienceList([
      ...experienceList,
      { title: '', company: '', city: '', state: '', startDate: '', endDate: '', currentlyWorking: false, workSummary: '' },
    ]);
  };

  const removeExperience = (index) => {
    const updated = experienceList.filter((_, i) => i !== index);
    setExperienceList(updated);
    setResumeInfo((prev) => ({ ...prev, experience: updated }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    if (!token || !resumeId) {
      toast.error('Missing token or resume ID.');
      return;
    }

    try {
      const response = await api.createOrUpdateResume(
        token,
        { ...resumeInfo, experience: experienceList },
        resumeId
      );
      setResumeInfo(response.data);
      toast.success('Experience Saved Successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save experience');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Experience</h2>
      <form onSubmit={onSave} className="space-y-6 mt-4">
        {experienceList.map((exp, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 relative border p-4 rounded-md">
            <Input name="title" value={exp.title} placeholder="Job Title" onChange={(e) => handleChange(index, e)} />
            <Input name="company" value={exp.company} placeholder="Company" onChange={(e) => handleChange(index, e)} />
            <Input name="city" value={exp.city} placeholder="City" onChange={(e) => handleChange(index, e)} />
            <Input name="state" value={exp.state} placeholder="State" onChange={(e) => handleChange(index, e)} />
            <Input name="startDate" type="date" value={exp.startDate} onChange={(e) => handleChange(index, e)} />
            <Input name="endDate" type="date" value={exp.endDate} onChange={(e) => handleChange(index, e)} />
            <label className="flex items-center space-x-2 col-span-2">
              <input type="checkbox" name="currentlyWorking" checked={exp.currentlyWorking} onChange={(e) => handleChange(index, e)} />
              <span>Currently Working</span>
            </label>
            <Textarea name="workSummary" value={exp.workSummary} onChange={(e) => handleChange(index, e)} placeholder="Work Summary" className="col-span-2" />
            
            {experienceList.length > 1 && (
              <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center">
          <Button type="button" onClick={addExperience}>Add More</Button>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ExperienceForm;
