import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/components/layout/MainLayout';
import StudentForm from '@/components/students/StudentForm';

const AddStudent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('addStudentTitle')}</h1>
        </div>
        <StudentForm />
      </div>
    </MainLayout>
  );
};

export default AddStudent;
