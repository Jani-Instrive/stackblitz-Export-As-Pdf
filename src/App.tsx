import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import './style.css';

export const App = () => {
  const [isExporting, setIsExporting] = useState(false);
  const exportContainerRef = useRef();

  const contentToPrint = (
    <div id="content-to-print">
      <h1>This will be in the PDF</h1>
      <p>This content will also be included in the PDF.</p>
      <div className="no-pdf">
        <p>This content will not be included in the PDF.</p>
      </div>
    </div>
  );

  const exportPDF = () => {
    setIsExporting(true);
  };

  useEffect(() => {
    if (isExporting && exportContainerRef.current) {
      html2pdf()
        .from(exportContainerRef.current)
        .set({
          margin: 10,
          filename: 'export.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .save()
        .finally(() => {
          setIsExporting(false);
        });
    }
  }, [isExporting]);

  return (
    <div>
      <button onClick={exportPDF}>Export as PDF</button>
      {isExporting && (
        <div
          ref={exportContainerRef}
          style={{
            visibility: 'hidden',
            position: 'absolute',
            left: '-10000px',
            top: '-10000px',
          }}
        >
          {contentToPrint}
        </div>
      )}
    </div>
  );
};
