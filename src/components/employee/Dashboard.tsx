import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReportCard from "./ReportCard";

// ✅ Correct Vite-compatible import setup for pdf.js
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

// tell pdfjs where to find the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function Dashboard() {
  const [openUpload, setOpenUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  const reports = [
    { id: "r1", title: "CBC Report", date: "2025-10-10", summary: "Hb low, WBC normal" },
    { id: "r2", title: "Lipid Profile", date: "2025-08-01", summary: "LDL slightly high" },
  ];

  // 🔹 Handle File Select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);

    if (selected && selected.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    } else {
      setPreview("");
    }
  };

  // 🔹 Function to Read PDF Text
  const extractPdfText = async (pdfFile: File) => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += `\n\n--- Page ${pageNum} ---\n${pageText}`;
    }

    console.log("📄 Extracted PDF Text:");
    console.log(fullText);
  };

  // 🔹 Handle Upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    console.group("📄 Upload Report Data");
    console.log("File Name:", file.name);
    console.log("File Type:", file.type);
    console.log("File Size:", `${(file.size / 1024).toFixed(2)} KB`);
    console.log("Date:", date);
    console.log("Report Type:", type);
    console.groupEnd();

    if (file.type === "application/pdf") {
      console.log("🔍 Reading PDF...");
      await extractPdfText(file);
    } else if (file.type.startsWith("image/")) {
      console.log("🖼️ Image file detected (PDF text extraction skipped)");
    }

    alert(`Uploaded (stub): ${file.name}`);
    setOpenUpload(false);
    setFile(null);
    setPreview("");
    setDate("");
    setType("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <Typography variant="h4" className="font-bold text-gray-800">
            Your Reports
          </Typography>
          <Typography className="text-sm text-gray-500">
            Upload and let Gemini explain your medical reports ✨
          </Typography>
        </div>

        <div className="flex gap-3">
          <Button
            variant="contained"
            onClick={() => setOpenUpload(true)}
            sx={{
              backgroundColor: "#EA580C",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              px: 2.5,
              py: 1,
              "&:hover": { backgroundColor: "#c2410c" },
            }}
          >
            Upload Report
          </Button>

          <Button
            component={Link}
            to="/add-vitals"
            variant="outlined"
            sx={{
              borderColor: "#EA580C",
              color: "#EA580C",
              textTransform: "none",
              borderRadius: "8px",
              px: 2.5,
              py: 1,
              "&:hover": { borderColor: "#c2410c", color: "#c2410c" },
            }}
          >
            Add Vitals
          </Button>
        </div>
      </div>

      {/* Reports Grid */}
      <Grid container spacing={3}>
        {reports.map((r) => (
          <Grid item xs={12} sm={6} md={4} key={r.id}>
            <ReportCard report={r} />
          </Grid>
        ))}
      </Grid>

      {/* Timeline Link */}
      <div className="mt-10 text-center">
        <Link to="/timeline" className="text-blue-600 hover:underline text-sm font-medium">
          View Timeline →
        </Link>
      </div>

      {/* Upload Modal */}
      <Dialog open={openUpload} onClose={() => setOpenUpload(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Report</DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleUpload} className="space-y-4 mt-2">
            <input type="file" accept="application/pdf,image/*" onChange={handleFileChange} />

            {file && (
              <Card
                sx={{
                  p: 2,
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {file.type.startsWith("image/") ? (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: "250px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "#EA580C",
                    }}
                  >
                    <PictureAsPdfIcon sx={{ fontSize: 60 }} />
                    <Typography variant="body2">{file.name}</Typography>
                  </div>
                )}
              </Card>
            )}

            <TextField
              type="date"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              label="Report Type (e.g., CBC, X-Ray)"
              fullWidth
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </form>

          <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            Roman Urdu: “File select karein — Gemini khud PDF/image padh lega.”
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenUpload(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#EA580C", "&:hover": { backgroundColor: "#c2410c" } }}
            onClick={handleUpload}
          >
            Upload & Analyze
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
