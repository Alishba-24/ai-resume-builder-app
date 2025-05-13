import { useContext, useState, useEffect } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { LoaderCircle, Trash2 } from 'lucide-react';
import * as api from '../../../../services/api';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

function EducationForm() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const { resumeId: paramResumeId } = useParams();
  const resumeId = resumeInfo?._id || paramResumeId;

  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.education?.length) {
      setEducationList(resumeInfo.education);
    } else {
      setEducationList([{
        universityName: '',
        degree: '',
        major: '',
        description: '',
        startDate: '',
        endDate: '',
      }]);
    }
  }, [resumeInfo]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...educationList];
    updated[index][name] = value;
    setEducationList(updated);
    setResumeInfo((prev) => ({ ...prev, education: updated }));
  };

  const addEducation = () => {
    setEducationList([
      ...educationList,
      { universityName: '', degree: '', major: '', description: '', startDate: '', endDate: '' },
    ]);
  };

  const removeEducation = (index) => {
    const updated = educationList.filter((_, i) => i !== index);
    setEducationList(updated);
    setResumeInfo((prev) => ({ ...prev, education: updated }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token || !resumeId) {
      toast.error('Missing token or resume ID.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.createOrUpdateResume(
        token,
        { ...resumeInfo, education: educationList },
        resumeId
      );
      setResumeInfo(response.data);
      toast.success('Education Updated Successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save education');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <form onSubmit={onSave} className="space-y-6 mt-5">
        {educationList.map((edu, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 relative border p-4 rounded-md">
            <Input name="universityName" value={edu.universityName} onChange={(e) => handleInputChange(index, e)} placeholder="University Name" required />
            <Input name="degree" value={edu.degree} onChange={(e) => handleInputChange(index, e)} placeholder="Degree" required />
            <Input name="major" value={edu.major} onChange={(e) => handleInputChange(index, e)} placeholder="Major" />
            <Textarea name="description" value={edu.description} onChange={(e) => handleInputChange(index, e)} placeholder="Description" className="col-span-2" />
            <Input name="startDate" type="date" value={edu.startDate} onChange={(e) => handleInputChange(index, e)} required />
            <Input name="endDate" type="date" value={edu.endDate} onChange={(e) => handleInputChange(index, e)} required />

            {educationList.length > 1 && (
              <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center">
          <Button type="button" onClick={addEducation}>Add More</Button>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EducationForm;
  