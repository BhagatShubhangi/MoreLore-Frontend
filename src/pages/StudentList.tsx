import React, { useEffect, useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getStudents, Student, initializeStorage } from '@/lib/storage';
import { hasExpiredDocuments } from '@/lib/expiry';
import MainLayout from '@/components/layout/MainLayout';
import StudentTable from '@/components/students/StudentTable';
import SearchFilter from '@/components/students/SearchFilter';

const StudentList: React.FC = () => {
  const { t } = useLanguage();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    initializeStorage();
    setStudents(getStudents());
  }, []);

  const filteredStudents = useMemo(() => {
    let result = students;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.passportNumber.toLowerCase().includes(query) ||
          student.nationality.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    switch (activeFilter) {
      case 'active':
        result = result.filter((s) => s.status === 'active');
        break;
      case 'expired':
        result = result.filter((s) => hasExpiredDocuments(s));
        break;
    }

    return result;
  }, [students, searchQuery, activeFilter]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('studentListTitle')}</h1>
        </div>

        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <StudentTable students={filteredStudents} />
      </div>
    </MainLayout>
  );
};

export default StudentList;
