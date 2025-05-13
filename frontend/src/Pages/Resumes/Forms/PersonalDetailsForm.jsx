import { useContext, useState, useEffect } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useParams } from 'react-router-dom';
import * as api from '../../../../services/api';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

function PersonalDetailsForm({ enableText }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const { resumeId: paramResumeId } = useParams();
  const resumeId = resumeInfo?._id || paramResumeId;

  // Load initial form data if resumeInfo is available in context
  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        firstname: resumeInfo.firstname || '',
        lastname: resumeInfo.lastname || '',
        jobTitle: resumeInfo.jobTitle || '',
        address: resumeInfo.address || '',
        phone: resumeInfo.phone || '',
        email: resumeInfo.email || '',
      });
    }
  }, [resumeInfo]);

  // Fetch resume details if not available in context
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

    if (!resumeInfo || !resumeInfo.firstname) {
      fetchResume();
    }
  }, [resumeId, resumeInfo, setResumeInfo]);

  
  const handleInputChange = (e) => {
    enableText(false);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setResumeInfo((prev) => ({ ...prev, [name]: value }));
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
      const dataToSend = {
        ...resumeInfo,
        firstname: formData.firstname,
        lastname: formData.lastname,
        jobTitle: formData.jobTitle,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
      };

      const response = await api.createOrUpdateResume(token, dataToSend, resumeId); // Use createOrUpdateResume instead of create
      setResumeInfo(response.data);

      setFormData({
        firstname: response.data.firstname || '',
        lastname: response.data.lastname || '',
        jobTitle: response.data.jobTitle || '',
        address: response.data.address || '',
        phone: response.data.phone || '',
        email: response.data.email || '',
      });

      enableText(true);
      toast.success('Details Saved');
    } catch (error) {
      console.error(error);
      toast.error('Error saving details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <h2>Get started with the basic information</h2>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 gap-3 mt-5">
          {['firstname', 'lastname', 'jobTitle', 'address', 'phone', 'email'].map((field, index) => (
            <div key={index} className={field === 'jobTitle' || field === 'address' ? 'col-span-2' : ''}>
              <label className="text-sm capitalize">{field.replace(/([A-Z])/g, ' $1')}:</label>
              <Input name={field} value={formData[field]} required onChange={handleInputChange} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-end">
          <Button disabled={loading} type="submit">
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetailsForm;
