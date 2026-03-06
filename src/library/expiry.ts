// Expiry date calculation utilities

import { Student } from './storage';

export type ExpiryStatus = 'valid' | 'warning' | 'danger' | 'expired';

export interface ExpiryInfo {
  status: ExpiryStatus;
  daysRemaining: number;
  date: string;
  label: string;
}

/**
 * Calculate days remaining until a date
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Number of days remaining (negative if expired)
 */
export const getDaysRemaining = (dateString: string): number => {
  if (!dateString) return Infinity;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Get expiry status based on days remaining
 * @param daysRemaining - Number of days until expiry
 * @returns ExpiryStatus
 */
export const getExpiryStatus = (daysRemaining: number): ExpiryStatus => {
  if (daysRemaining <= 0) return 'expired';
  if (daysRemaining <= 7) return 'danger';
  if (daysRemaining <= 30) return 'warning';
  return 'valid';
};

/**
 * Get full expiry information for a date
 * @param dateString - Date string in YYYY-MM-DD format
 * @param label - Label for this document type
 * @returns ExpiryInfo object
 */
export const getExpiryInfo = (dateString: string, label: string): ExpiryInfo => {
  const daysRemaining = getDaysRemaining(dateString);
  const status = getExpiryStatus(daysRemaining);
  
  return {
    status,
    daysRemaining,
    date: dateString,
    label,
  };
};

/**
 * Get all document expiry information for a student
 * @param student - Student object
 * @returns Array of ExpiryInfo objects
 */
export const getStudentExpiryInfo = (student: Student): ExpiryInfo[] => {
  return [
    getExpiryInfo(student.visaExpiry, 'Visa'),
    getExpiryInfo(student.passportExpiry, 'Passport'),
    getExpiryInfo(student.medicalExpiry, 'Medical Certificate'),
    getExpiryInfo(student.migrationExpiry, 'Migration Card'),
  ];
};

/**
 * Check if student has any expiring documents (within 30 days)
 */
export const hasExpiringDocuments = (student: Student): boolean => {
  const expiryInfos = getStudentExpiryInfo(student);
  return expiryInfos.some(info => info.status !== 'valid');
};

/**
 * Check if student has any expired documents
 */
export const hasExpiredDocuments = (student: Student): boolean => {
  const expiryInfos = getStudentExpiryInfo(student);
  return expiryInfos.some(info => info.status === 'expired');
};

/**
 * Get the most critical expiry status for a student
 */
export const getMostCriticalStatus = (student: Student): ExpiryStatus => {
  const expiryInfos = getStudentExpiryInfo(student);
  
  if (expiryInfos.some(info => info.status === 'expired')) return 'expired';
  if (expiryInfos.some(info => info.status === 'danger')) return 'danger';
  if (expiryInfos.some(info => info.status === 'warning')) return 'warning';
  return 'valid';
};

export interface UpcomingDeadline {
  studentId: string;
  studentName: string;
  documentType: string;
  expiryDate: string;
  daysRemaining: number;
  status: ExpiryStatus;
}

/**
 * Get all upcoming deadlines across all students
 * @param students - Array of Student objects
 * @param daysAhead - Number of days to look ahead (default 30)
 * @returns Array of UpcomingDeadline objects sorted by days remaining
 */
export const getUpcomingDeadlines = (
  students: Student[],
  daysAhead: number = 30
): UpcomingDeadline[] => {
  const deadlines: UpcomingDeadline[] = [];
  
  students.forEach((student) => {
    if (student.status !== 'active') return;
    
    const documents = [
      { type: 'Visa', date: student.visaExpiry },
      { type: 'Passport', date: student.passportExpiry },
      { type: 'Medical Certificate', date: student.medicalExpiry },
      { type: 'Migration Card', date: student.migrationExpiry },
    ];
    
    documents.forEach(({ type, date }) => {
      const daysRemaining = getDaysRemaining(date);
      const status = getExpiryStatus(daysRemaining);
      
      if (daysRemaining <= daysAhead) {
        deadlines.push({
          studentId: student.id,
          studentName: student.name,
          documentType: type,
          expiryDate: date,
          daysRemaining,
          status,
        });
      }
    });
  });
  
  // Sort by days remaining (most urgent first)
  return deadlines.sort((a, b) => a.daysRemaining - b.daysRemaining);
};

/**
 * Count students with expiring visas within N days
 */
export const countExpiringVisas = (students: Student[], days: number = 30): number => {
  return students.filter((s) => {
    if (s.status !== 'active') return false;
    const daysRemaining = getDaysRemaining(s.visaExpiry);
    return daysRemaining <= days && daysRemaining > 0;
  }).length;
};

/**
 * Count students with expired or expiring medical certificates
 */
export const countExpiringMedical = (students: Student[], days: number = 30): number => {
  return students.filter((s) => {
    if (s.status !== 'active') return false;
    const daysRemaining = getDaysRemaining(s.medicalExpiry);
    return daysRemaining <= days;
  }).length;
};

/**
 * Count students with expiring registrations
 */
export const countExpiringRegistrations = (students: Student[], days: number = 30): number => {
  return students.filter((s) => {
    if (s.status !== 'active') return false;
    const daysRemaining = getDaysRemaining(s.migrationExpiry);
    return daysRemaining <= days;
  }).length;
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
