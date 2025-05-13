import { useContext, useEffect, useState } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { BrainCircuit, LoaderCircle } from 'lucide-react';
import * as api from '../../../../services/api';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function SummaryForm({ enableText }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const { resumeId: paramResumeId } = useParams();
  const resumeId = resumeInfo?._id || paramResumeId;
  const [summary, setSummary] = useState({ summary: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo) {
      setSummary({ summary: resumeInfo.summary || '' });
    }
  }, [resumeInfo]);

  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem('token');
      if (!resumeId || !token) return;
      try {
        const data = await api.getResumeDetail(resumeId, token);
        setResumeInfo(data.data);
      } catch (err) {
        console.error('Failed to fetch resume info:', err);
      }
    };
    if (!resumeInfo || !resumeInfo.summary) {
      fetchResume();
    }
  }, [resumeId, resumeInfo, setResumeInfo]);

  const handleInputChange = (e) => {
    enableText(false);
    const { name, value } = e.target;
    setSummary((prev) => ({ ...prev, [name]: value }));
    setResumeInfo((prev) => ({ ...prev, [name]: value }));
  };

  const generateSummaryFromAI = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const data = await api.generateAISummary(resumeInfo?.jobTitle, token);
      if (data.generatedSummary) {
        setSummary({ summary: data.generatedSummary });
        setResumeInfo((prev) => ({ ...prev, summary: data.generatedSummary }));
        toast.success('AI Summary generated!');
      } else {
        toast.error('Failed to generate summary');
      }
    } catch (err) {
      console.error('AI error:', err);
      toast.error('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to update.');
      setLoading(false);
      return;
    }

    try {
      const updatedData = {
        ...resumeInfo,
        summary: summary.summary,
      };

      const response = await api.createOrUpdateResume(token, updatedData, resumeId);
      setResumeInfo(response.data);
      setSummary({ summary: response.data.summary || '' });
      enableText(true);
      toast.success('Summary Updated');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summary</h2>
      <h2>Add a summary for your job title</h2>
      <form className="mt-7" onSubmit={onSave}>
        <div className="flex justify-between items-end">
          <label>Add Summary</label>
          <Button
            onClick={generateSummaryFromAI}
            size="sm"
            variant="outline"
            type="button"
            className="border-primary text-primary flex gap-2"
            disabled={loading}
          >
            <BrainCircuit className="h-4 w-4" />
            Generate from AI
          </Button>
        </div>
        <Textarea
          name="summary"
          required
          value={summary.summary}
          className="mt-5"
          onChange={handleInputChange}
        />
        <div className="mt-7 flex justify-end">
          <Button disabled={loading} type="submit">
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SummaryForm;
