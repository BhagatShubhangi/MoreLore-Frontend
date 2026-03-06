import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getStudentById, Student } from '@/lib/storage';
import MainLayout from '@/components/layout/MainLayout';
import StudentForm from '@/components/students/StudentForm';
import { Button } from '@/components/ui/button';

const EditStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (id) {
      const loadedStudent = getStudentById(id);
      if (loadedStudent) {
        setStudent(loadedStudent);
      } else {
        navigate('/students');
      }
    }
  }, [id, navigate]);

  if (!student) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">{t('editStudentTitle')}</h1>
        </div>
        <StudentForm student={student} isEdit />
      </div>
    </MainLayout>
  );
};

export default EditStudent;
