// LocalStorage management for students and settings

import { Language } from './translations';

export interface StudentFiles {
  passportScan?: string;
  visaScan?: string;
  medicalScan?: string;
  registrationScan?: string;
}

export interface Student {
  id: string;
  name: string;
  nationality: string;
  dateOfBirth: string;
  passportNumber: string;
  passportExpiry: string;
  visaIssue: string;
  visaExpiry: string;
  migrationExpiry: string;
  medicalExpiry: string;
  address: string;
  status: 'active' | 'leave' | 'expelled' | 'graduated';
  phone: string;
  email: string;
  files: StudentFiles;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  language: Language;
  notificationEmail: string;
  darkMode: boolean;
}

const STORAGE_KEYS = {
  students: 'student_registry_students',
  settings: 'student_registry_settings',
  initialized: 'student_registry_initialized',
};

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Sample students for initial load
const sampleStudents: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: "Li Wei",
    nationality: "China",
    dateOfBirth: "1999-03-15",
    passportNumber: "E12345678",
    passportExpiry: "2026-03-15",
    visaIssue: "2024-09-01",
    visaExpiry: "2025-01-15",
    migrationExpiry: "2025-01-10",
    medicalExpiry: "2025-02-28",
    address: "Moscow, Lenina St. 45, apt. 12",
    status: "active",
    phone: "+7 999 123 4567",
    email: "li.wei@student.edu",
    files: {},
  },
  {
    name: "Nguyen Van Minh",
    nationality: "Vietnam",
    dateOfBirth: "2000-07-22",
    passportNumber: "N87654321",
    passportExpiry: "2027-07-22",
    visaIssue: "2024-08-15",
    visaExpiry: "2024-12-20",
    migrationExpiry: "2024-12-15",
    medicalExpiry: "2025-01-05",
    address: "Moscow, Tverskaya St. 78, apt. 5",
    status: "active",
    phone: "+7 999 234 5678",
    email: "nguyen.minh@student.edu",
    files: {},
  },
  {
    name: "Amirov Rustam",
    nationality: "Uzbekistan",
    dateOfBirth: "1998-11-03",
    passportNumber: "AB1234567",
    passportExpiry: "2025-11-03",
    visaIssue: "2024-06-01",
    visaExpiry: "2025-06-01",
    migrationExpiry: "2025-05-25",
    medicalExpiry: "2025-03-15",
    address: "St. Petersburg, Nevsky Pr. 100, apt. 33",
    status: "active",
    phone: "+7 999 345 6789",
    email: "amirov.r@student.edu",
    files: {},
  },
  {
    name: "Kumar Priya",
    nationality: "India",
    dateOfBirth: "2001-02-14",
    passportNumber: "J98765432",
    passportExpiry: "2028-02-14",
    visaIssue: "2024-07-20",
    visaExpiry: "2025-02-10",
    migrationExpiry: "2025-02-05",
    medicalExpiry: "2024-12-25",
    address: "Kazan, Pushkina St. 55, apt. 8",
    status: "active",
    phone: "+7 999 456 7890",
    email: "kumar.priya@student.edu",
    files: {},
  },
  {
    name: "Bakytov Erlan",
    nationality: "Kazakhstan",
    dateOfBirth: "1999-09-08",
    passportNumber: "N12398765",
    passportExpiry: "2026-09-08",
    visaIssue: "2024-09-15",
    visaExpiry: "2025-09-15",
    migrationExpiry: "2025-09-10",
    medicalExpiry: "2025-06-20",
    address: "Novosibirsk, Lenina St. 22, apt. 15",
    status: "leave",
    phone: "+7 999 567 8901",
    email: "bakytov.e@student.edu",
    files: {},
  },
];

// Initialize storage with sample data
export const initializeStorage = (): void => {
  const initialized = localStorage.getItem(STORAGE_KEYS.initialized);
  
  if (!initialized) {
    const students: Student[] = sampleStudents.map((student) => ({
      ...student,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    
    localStorage.setItem(STORAGE_KEYS.students, JSON.stringify(students));
    localStorage.setItem(STORAGE_KEYS.initialized, 'true');
  }
  
  // Initialize settings if not exists
  if (!localStorage.getItem(STORAGE_KEYS.settings)) {
    const defaultSettings: Settings = {
      language: 'en',
      notificationEmail: '',
      darkMode: false,
    };
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(defaultSettings));
  }
};

// Get all students
export const getStudents = (): Student[] => {
  const data = localStorage.getItem(STORAGE_KEYS.students);
  return data ? JSON.parse(data) : [];
};

// Get student by ID
export const getStudentById = (id: string): Student | null => {
  const students = getStudents();
  return students.find((s) => s.id === id) || null;
};

// Add new student
export const addStudent = (studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Student => {
  const students = getStudents();
  const newStudent: Student = {
    ...studentData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  students.push(newStudent);
  localStorage.setItem(STORAGE_KEYS.students, JSON.stringify(students));
  return newStudent;
};

// Update student
export const updateStudent = (id: string, studentData: Partial<Student>): Student | null => {
  const students = getStudents();
  const index = students.findIndex((s) => s.id === id);
  
  if (index === -1) return null;
  
  students[index] = {
    ...students[index],
    ...studentData,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEYS.students, JSON.stringify(students));
  return students[index];
};

// Delete student
export const deleteStudent = (id: string): boolean => {
  const students = getStudents();
  const filtered = students.filter((s) => s.id !== id);
  
  if (filtered.length === students.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.students, JSON.stringify(filtered));
  return true;
};

// Get settings
export const getSettings = (): Settings => {
  const data = localStorage.getItem(STORAGE_KEYS.settings);
  return data ? JSON.parse(data) : { language: 'en', notificationEmail: '', darkMode: false };
};

// Update settings
export const updateSettings = (settings: Partial<Settings>): Settings => {
  const currentSettings = getSettings();
  const newSettings = { ...currentSettings, ...settings };
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(newSettings));
  return newSettings;
};

// Convert file to Base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
