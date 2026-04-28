import React, { useState, useRef } from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { FiCheckCircle, FiDownload, FiEye, FiFilePlus, FiFileText, FiPlus, FiTrash2, FiUploadCloud } from 'react-icons/fi';

const Documents = () => {
  const [docs, setDocs] = useState([
    { id: 1, name: "musharof_cv_2024.pdf", size: "1.2 MB", date: "Apr 12, 2024", type: "Resume" },
    { id: 2, name: "cover_letter_google.pdf", size: "450 KB", date: "Apr 15, 2024", type: "Cover Letter" },
    { id: 3, name: "btech_certificate.pdf", size: "2.4 MB", date: "Jan 10, 2024", type: "Certificate" },
    { id: 4, name: "aws_solutions_arch.pdf", size: "1.1 MB", date: "Mar 05, 2024", type: "Certificate" }
  ]);

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newDoc = {
        id: Date.now(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        type: file.type.includes('pdf') ? 'PDF' : file.type.includes('word') ? 'DOCX' : 'Image'
      };
      setDocs(prev => [newDoc, ...prev]);
      // Reset input
      event.target.value = '';
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocs(prev => prev.filter(doc => doc.id !== id));
    }
  };

  return (
    <>
      <Breadcrumb pageName="Documents" />

      <div className="rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
          <h3 className="font-medium text-black dark:text-white">All Documents</h3>
          <button 
            onClick={handleUploadClick}
            className="flex items-center gap-2 rounded-full bg-primary py-2 px-6 text-sm font-medium text-white hover:bg-secondary transition-all shadow-lg shadow-primary/20"
          >
             <FiPlus size={18} /> Upload New
          </button>
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept=".pdf,.doc,.docx,.jpg,.png"
        />

        <div className="p-6.5">
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {docs.map((doc) => (
                <div key={doc.id} className="p-5 rounded-2xl border border-stroke dark:border-strokedark hover:border-primary/30 transition-all group bg-bg-soft/50 dark:bg-primary/5">
                   <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                         {doc.type === 'Resume' ? <FiFileText size={24} /> : 
                          doc.type === 'Certificate' ? <FiCheckCircle size={24} /> : <FiFilePlus size={24} />}
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="text-muted hover:text-primary transition-colors" title="Download"><FiDownload size={16} /></button>
                         <button onClick={() => handleDelete(doc.id)} className="text-muted hover:text-danger transition-colors" title="Delete"><FiTrash2 size={16} /></button>
                      </div>
                   </div>
                   <h5 className="font-bold text-black dark:text-white truncate" title={doc.name}>{doc.name}</h5>
                   <p className="text-xs text-muted mb-4">{doc.type} • {doc.size}</p>
                   
                   <div className="flex items-center justify-between text-xs pt-3 border-t border-stroke dark:border-strokedark">
                      <span className="text-muted">{doc.date}</span>
                      <button className="text-primary font-medium flex items-center gap-1 hover:text-secondary transition-colors">
                         <FiEye size={12} /> View
                      </button>
                   </div>
                </div>
              ))}
           </div>
           
           <div 
             onClick={handleUploadClick}
             className="mt-10 p-12 border-2 border-dashed border-stroke dark:border-strokedark rounded-2xl text-center cursor-pointer hover:bg-bg-soft dark:hover:bg-primary/5 transition-all group"
           >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                 <FiUploadCloud size={32} />
              </div>
              <h4 className="text-xl font-bold text-black dark:text-white mb-2">Click to upload or drag and drop</h4>
              <p className="text-sm text-muted">Support for PDF, DOCX, JPG (Max 5MB)</p>
           </div>
        </div>
      </div>
    </>
  );
};

export default Documents;
