import React from "react";

interface PDFViewerProps {
  url: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  return (
    <div
      className="pdfviewer-container"
      style={{
        position: "relative",
        width: "100%",
        height: "80vh",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <iframe
        src={`${url}#toolbar=1`}
        title="PDF Viewer"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
};
