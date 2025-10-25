import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentUpload from './components/DocumentUpload';
import AnalysisResults from './components/AnalysisResults';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysisComplete = (analysisResults) => {
    setResults(analysisResults);
    setLoading(false);
  };

  const handleUploadStart = () => {
    setLoading(true);
    setResults(null);
  };

  return (
    <div className="App">
      <div className="container-fluid bg-primary text-white py-4">
        <div className="container">
          <h1 className="display-4 mb-0">AI Compliance Checker</h1>
          <p className="lead mb-0">Regulatory compliance analysis for contracts</p>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-body p-5">
                <DocumentUpload
                  onAnalysisComplete={handleAnalysisComplete}
                  onUploadStart={handleUploadStart}
                  loading={loading}
                />

                {loading && (
                  <div className="text-center mt-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Analyzing...</span>
                    </div>
                    <p className="mt-2">Extracting key clauses and analyzing compliance risks...</p>
                  </div>
                )}

                {results && !loading && (
                  <AnalysisResults results={results} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
