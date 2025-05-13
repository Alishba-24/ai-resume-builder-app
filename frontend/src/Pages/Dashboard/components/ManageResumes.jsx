import { useState, useEffect, useContext, useRef  } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Download, Trash2 } from "lucide-react";
import { getAllResumes, deleteResume } from "../../../../services/api";
import FreeTemplate from "../../Resumes/Templates/free/FreeTemplate";
import PaidTemplate from "../../Resumes/Templates/paid/PaidTemplate";
import { ResumeContext } from "../../../context/ResumeContext";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ManageResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewResume, setPreviewResume] = useState(null);
  const navigate = useNavigate();
  const { setResumeInfo } = useContext(ResumeContext);
  const contentRef = useRef(null);


  // Fetch resumes on mount
  useEffect(() => {
  fetchResumes();
}, []);


const fetchResumes = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await getAllResumes(token);

    if (response?.data && Array.isArray(response.data)) {
      const defaultTemplateType = localStorage.getItem("templateType") || "free";

      const resumesWithTemplateType = response.data.map((resume) => ({
        ...resume,
        templateType: resume.templateType || defaultTemplateType,  
      }));

      setResumes(resumesWithTemplateType);
    } else {
      toast.error("Invalid response format");
    }
  } catch (error) {
    toast.error("Failed to fetch resumes");
    console.error("Fetch error:", error);
  } finally {
    setLoading(false);
  }
};



  const handlePreviewResume = (resume) => {
    setPreviewResume(resume);
  };

  const handleDeleteResume = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteResume(id, token);
      toast.success("Resume deleted successfully");
      fetchResumes();
    } catch (error) {
      toast.error("Failed to delete resume");
      console.error("Delete error:", error);
    }
  };

  const handleEditResume = () => {
    if (previewResume) {

      setResumeInfo(previewResume); 
    localStorage.setItem("templateType", previewResume.templateType);

      navigate(`/dashboard/edit-resume/${previewResume._id}`);
    }
  };

   const handleDownloadPdf = async () => {
   const input = contentRef.current;
   html2canvas(input, { scale: 3 }).then((canvas) => {
     const imgData = canvas.toDataURL("image/png");
     const pdf = new jsPDF("p", "mm", "a4");
     const pageWidth = pdf.internal.pageSize.getWidth();
     const pageHeight = pdf.internal.pageSize.getHeight();
     let imgWidth = pageWidth - 20; // 10mm margin from both sides
     let imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
     let position = 10; // Start position for first image
     if (imgHeight > pageHeight - 40) {
       let pagesRequired = Math.ceil(imgHeight / (pageHeight - 40));
       for (let i = 0; i < pagesRequired; i++) {
         let cropHeight = Math.min(pageHeight - 40, imgHeight - i * (pageHeight - 40));
         pdf.addImage(imgData, "PNG", 10, position, imgWidth, cropHeight);
         pdf.text(`Page ${i + 1}`, pageWidth / 2, pageHeight - 10);
         if (i < pagesRequired - 1) {
           pdf.addPage();
           position = 10;
         }
       }
     } else {
       pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
     }
     // Custom Text Formatting
     pdf.setTextColor("black");
     pdf.setFont("helvetica", "bold");
     pdf.setFontSize(12);
     pdf.text("Doctor's Report", pageWidth / 2 - 20, 10);
     pdf.setFont("times", "italic");
     pdf.setFontSize(12);
     pdf.text(" " + new Date().toLocaleDateString(), 10, pageHeight - 10);
     pdf.save("report.pdf");
   });
 };

  const handleBackToResumes = () => {
    setPreviewResume(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {!previewResume ? (
        <div>
          <h1 className="text-xl font-bold mb-4">Manage Your Resumes</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {resumes.length > 0 ? (
              resumes.map((resume) => (
                <div
                  key={resume._id}
                  className="relative bg-white dark:border-2 dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition p-3 cursor-pointer flex flex-col justify-between"
                  style={{ height: "300px" }}
                >
                  <img
                    src={
                      resume.image ||
                      "https://cdn.pixabay.com/photo/2016/11/05/11/15/resume-1799954_1280.png"
                    }
                    alt="Resume Preview"
                    className="h-50 object-cover w-full rounded"
                    onClick={() => handlePreviewResume(resume)}
                  />

                  <div className="mt-2">
                    <h2
                      className="text-lg font-semibold truncate"
                      onClick={() => handlePreviewResume(resume)}
                    >
                      {resume.jobTitle || "Untitled Resume"}
                    </h2>
                  </div>

                  <button
                    className="absolute bottom-2 right-2 text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteResume(resume._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            ) : (
              <p>No resumes found.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
  <button
    className="p-2 border rounded"
    onClick={handleBackToResumes}
  >
    ← Back to Resumes
  </button>

  <div className="flex gap-2">
    <button
      className="p-2 border rounded  text-black hover:bg-blue-700 transition"
      onClick={handleEditResume}
    >
      ✏️ Edit
    </button>

    <button
      onClick={handleDownloadPdf}
      className="p-2 border rounded text-green-600 hover:text-green-800 transition"
      title="Download PDF"
    >
      <Download />
    </button>
  </div>
</div>


          {/* Render the selected resume preview */}
          {previewResume.templateType === "paid" ? (
            <div ref={contentRef}>
              <PaidTemplate data={previewResume} />
            </div>
            ) : (
            <div ref={contentRef}>
              <FreeTemplate data={previewResume} />
            </div>
            )}

        </div>
      )}
    </div>
  );
};

export default ManageResumes;
