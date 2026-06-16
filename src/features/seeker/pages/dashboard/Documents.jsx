import React, { useRef, useState } from "react";
import {
  FiCheckCircle,
  FiDownload,
  FiEye,
  FiFilePlus,
  FiFileText,
  FiPlus,
  FiTrash2,
  FiUploadCloud,
} from "react-icons/fi";
import Breadcrumb from "../../../../components/ui/Breadcrumb";

const Documents = () => {
  const [docs, setDocs] = useState([
    {
      id: 1,
      name: "musharof_cv_2024.pdf",
      size: "1.2 MB",
      date: "Apr 12, 2024",
      type: "Resume",
    },
    {
      id: 2,
      name: "cover_letter_google.pdf",
      size: "450 KB",
      date: "Apr 15, 2024",
      type: "Cover Letter",
    },
    {
      id: 3,
      name: "btech_certificate.pdf",
      size: "2.4 MB",
      date: "Jan 10, 2024",
      type: "Certificate",
    },
    {
      id: 4,
      name: "aws_solutions_arch.pdf",
      size: "1.1 MB",
      date: "Mar 05, 2024",
      type: "Certificate",
    },
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
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        type: file.type.includes("pdf")
          ? "PDF"
          : file.type.includes("word")
          ? "DOCX"
          : "Image",
      };

      setDocs((prev) => [newDoc, ...prev]);
      event.target.value = "";
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      setDocs((prev) => prev.filter((doc) => doc.id !== id));
    }
  };

  return (
    <>
      <Breadcrumb pageName="Documents" />

      <div className="rounded border border-[#EADFD9] bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EADFD9] px-6 py-4">
          <h3 className="text-lg font-semibold text-[#0A0A0A]">
            All Documents
          </h3>

          <button
            onClick={handleUploadClick}
            className="flex items-center gap-2 rounded-full bg-[#FF6B35] px-6 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-[#FF9566]"
          >
            <FiPlus size={18} />
            Upload New
          </button>
        </div>

        {/* Hidden Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.png"
        />

        <div className="p-6">
          {/* Document Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="group rounded border border-[#EADFD9] bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                {/* Top */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#FFF7F3] text-[#FF6B35]">
                    {doc.type === "Resume" ? (
                      <FiFileText size={22} />
                    ) : doc.type === "Certificate" ? (
                      <FiCheckCircle size={22} />
                    ) : (
                      <FiFilePlus size={22} />
                    )}
                  </div>

                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      className="rounded-lg p-2 text-[#6F6F76] transition hover:bg-blue-50 hover:text-blue-600"
                      title="Download"
                    >
                      <FiDownload size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="rounded-lg p-2 text-[#6F6F76] transition hover:bg-red-50 hover:text-red-500"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <h5
                  className="truncate font-bold text-[#0A0A0A]"
                  title={doc.name}
                >
                  {doc.name}
                </h5>

                <p className="mb-4 mt-1 text-xs text-[#6F6F76]">
                  {doc.type} • {doc.size}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-[#EFE7E1] pt-3 text-xs">
                  <span className="text-[#6F6F76]">{doc.date}</span>

                  <button className="flex items-center gap-1 font-medium text-[#FF6B35] transition hover:text-[#C84F1F]">
                    <FiEye size={12} />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Area */}
          <div
            onClick={handleUploadClick}
            className="group mt-10 cursor-pointer rounded border-2 border-dashed border-[#D8C9C0] bg-[#F7F5F2] p-12 text-center transition-all hover:border-orange-400 hover:bg-[#FFF7F3]"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#FF6B35] shadow-sm transition-transform group-hover:scale-110">
              <FiUploadCloud size={32} />
            </div>

            <h4 className="mb-2 text-xl font-bold text-[#0A0A0A]">
              Click to upload or drag and drop
            </h4>

            <p className="text-sm text-[#6F6F76]">
              Support for PDF, DOCX, JPG (Max 5MB)
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documents;
