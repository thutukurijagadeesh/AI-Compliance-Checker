import React from 'react';

const AnalysisResults = ({ results }) => {
  if (!results) return null;

  // Function to highlight key terms in clauses
  const highlightKeyTerms = (text) => {
    const keyTerms = [
      'data processing', 'personal data', 'privacy', 'consent', 'breach',
      'security', 'retention', 'transfer', 'rights', 'liability',
      'termination', 'confidentiality', 'intellectual property',
      'gdpr', 'hipaa', 'compliance', 'regulation'
    ];

    let highlightedText = text;
    keyTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <div className="mt-5">
      <h3 className="mb-4">Analysis Results for {results.filename}</h3>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Key Clauses Extracted</h5>
            </div>
            <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {results.key_clauses && results.key_clauses.length > 0 ? (
                <div className="list-group list-group-flush">
                  {results.key_clauses.map((clause, index) => (
                    <div key={index} className="list-group-item">
                      <small className="text-muted">Clause {index + 1}:</small>
                      <p className="mb-0">{highlightKeyTerms(clause)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">No key clauses identified in the document.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Compliance Risks Identified</h5>
            </div>
            <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {results.risks && results.risks.length > 0 ? (
                <div className="list-group list-group-flush">
                  {results.risks.map((risk, index) => (
                    <div key={index} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <strong className="text-danger">{risk.risk}</strong>
                          <p className="mb-1 small">{risk.description}</p>
                        </div>
                        <span className={`badge ${risk.severity === 'High' ? 'bg-danger' : 'bg-warning'}`}>
                          {risk.severity} Risk
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-success">No major compliance risks identified.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="card">
          <div className="card-body">
            <h6>Document Summary</h6>
            <div className="row">
              <div className="col-sm-6">
                <p className="mb-1"><strong>Filename:</strong> {results.filename}</p>
                <p className="mb-0"><strong>Text Length:</strong> {results.text_length} characters</p>
              </div>
              <div className="col-sm-6">
                <p className="mb-1"><strong>Key Clauses Found:</strong> {results.key_clauses ? results.key_clauses.length : 0}</p>
                <p className="mb-0"><strong>Risks Identified:</strong> {results.risks ? results.risks.length : 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
