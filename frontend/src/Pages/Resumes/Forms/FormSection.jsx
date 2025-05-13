import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '../../../components/ui/button'

// Importing all forms
import PersonalDetailsForm from './PersonalDetailsForm'
import SummaryForm from './SummaryForm'
import ExperienceForm from './ExperienceForm'
import EducationForm from './EducationForm'
import SkillsForm from './SkillsForm'

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(0)
  const [enableText, setEnableText] = useState(false)
  const navigate = useNavigate()

  // List of forms in order
  const formList = [
    <PersonalDetailsForm enableText={(v) => setEnableText(v)} />,
    <SummaryForm enableText={(v) => setEnableText(v)} />,
    <ExperienceForm enableText={(v) => setEnableText(v)} />,
    <EducationForm enableText={(v) => setEnableText(v)} />,
    <SkillsForm enableText={(v) => setEnableText(v)} />,
  ]

  const handleNextClick = () => {
    if (activeFormIndex === formList.length - 1) {
      // Last form, now redirect to Manage Resumes
      navigate('/dashboard/manage-resumes') // Navigate to Manage Resumes component
    } else {
      setActiveFormIndex((prev) => prev + 1)
    }
  }

  const handlePreviousClick = () => {
    if (activeFormIndex > 0) {
      setActiveFormIndex((prev) => prev - 1)
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => navigate(-1)} // Go back to the previous page
          className='flex gap-2'>
          <ArrowLeft /> Back
        </Button>
        <div className='flex gap-2'>
          {activeFormIndex > 0 && (
            <Button onClick={handlePreviousClick} size='sm'>
              <ArrowLeft /> Previous
            </Button>
          )}
          <Button
            disabled={!enableText}
            onClick={handleNextClick}
            className='flex gap-2'
            size='sm'>
            {activeFormIndex === formList.length - 1 ? 'Finish' : 'Next'} <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Show current form */}
      <div>{formList[activeFormIndex]}</div>
    </div>
  )
}

export default FormSection
