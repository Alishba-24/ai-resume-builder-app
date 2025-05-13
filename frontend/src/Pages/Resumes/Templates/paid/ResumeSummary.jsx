import React from 'react'

function ResumeSummary({ resumeInfo }) {
  return (
    <div>
        <p className='text-xs'>{resumeInfo.summary}</p>
    </div>
  )
}

export default ResumeSummary