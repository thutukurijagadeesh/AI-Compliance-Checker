import pdfplumber
from docx import Document
import spacy
from typing import Dict, List

nlp = spacy.load("en_core_web_sm")

def extract_text_from_pdf(file_path: str) -> str:
    """Extract text from PDF file."""
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

def extract_text_from_docx(file_path: str) -> str:
    """Extract text from DOCX file."""
    doc = Document(file_path)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text

def extract_key_clauses(text: str) -> List[str]:
    """Extract key clauses from contract text using NLP."""
    doc = nlp(text)
    clauses = []

    # Look for sentences containing key terms
    key_terms = [
        "data processing", "personal data", "privacy", "consent", "breach",
        "security", "retention", "transfer", "rights", "liability",
        "termination", "confidentiality", "intellectual property"
    ]

    for sent in doc.sents:
        sent_text = sent.text.lower()
        if any(term in sent_text for term in key_terms):
            clauses.append(sent.text.strip())

    return clauses[:10]  # Limit to top 10

def identify_risks(text: str) -> List[Dict[str, str]]:
    """Identify compliance risks for GDPR and HIPAA."""
    doc = nlp(text)
    risks = []

    # GDPR risks
    gdpr_risks = {
        "data processing without consent": "GDPR violation - processing personal data without lawful basis",
        "international data transfer": "GDPR risk - data transfers may require adequacy or safeguards",
        "data breach notification": "GDPR requirement - must notify breaches within 72 hours",
        "data subject rights": "GDPR requirement - must respond to data subject requests",
        "data retention": "GDPR risk - excessive data retention without justification"
    }

    # HIPAA risks
    hipaa_risks = {
        "phi disclosure": "HIPAA violation - unauthorized disclosure of protected health information",
        "security breach": "HIPAA requirement - must implement security safeguards",
        "patient rights": "HIPAA requirement - must provide access to medical records",
        "business associate agreement": "HIPAA requirement - contracts with business associates"
    }

    text_lower = text.lower()

    for risk_term, description in {**gdpr_risks, **hipaa_risks}.items():
        if risk_term.replace(" ", "") in text_lower.replace(" ", "") or any(word in text_lower for word in risk_term.split()):
            risks.append({
                "risk": risk_term,
                "description": description,
                "severity": "High" if "breach" in risk_term or "violation" in description else "Medium"
            })

    return risks[:10]  # Limit to top 10

def process_document(file_path: str, file_type: str) -> Dict:
    """Process uploaded document and return analysis."""
    if file_type == "pdf":
        text = extract_text_from_pdf(file_path)
    elif file_type == "docx":
        text = extract_text_from_docx(file_path)
    else:
        raise ValueError("Unsupported file type")

    clauses = extract_key_clauses(text)
    risks = identify_risks(text)

    return {
        "key_clauses": clauses,
        "risks": risks,
        "text_length": len(text)
    }
