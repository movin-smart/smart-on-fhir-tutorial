// utils/sections.ts
export type SectionKey = 'H&P' | 'SOAP' | 'Procedure' | 'Counseling' | 'Discharge Summary';

export interface SectionDetail {
  name: string;
  sections: string[];
}

export const sections: Record<SectionKey, SectionDetail> = {
    'H&P': {
      'name': 'Health and Physical',
      'sections': ['Chief Complaint', 'History of Present Illness as a paragraph', 'Past Medical History', 'Medication']
    },
    'SOAP': {
      'name': 'Subjective, Objective, Assessment, and Plan',
      'sections': ['Subjective', 'Objective', 'Assessment', 'Plan']
    },
    'Procedure': {
      'name': 'Procedure',
      'sections': ['Procedure Information', 'Indications', 'Description of Procedure', 'Findings', 'Complications', 'Post-procedure Plan']
    },
    'Counseling': {
      'name': 'Counseling',
      'sections': ['Reason for Counseling', 'Assessment', 'Counseling Provided', 'Patient Understanding', 'Follow-up Plan']
    },
    'Discharge Summary': {
      'name': 'Discharge Summary',
      'sections': ['Admission Date', 'Discharge Date', 'Reason for Admission', 'Hospital Course', 'Discharge Diagnosis', 'Discharge Medications', 'Follow-up Appointments', 'Discharge Instructions']
    }
  };
