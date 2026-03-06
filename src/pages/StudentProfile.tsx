import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  FileText,
  AlertCircle,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getStudentById, deleteStudent, Student } from '@/lib/storage';
import { getStudentExpiryInfo, formatDate, ExpiryInfo } from '@/lib/expiry';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

const StudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [student, setStudent] = useState<Student | null>(null);
  const [expiryInfo, setExpiryInfo] = useState<ExpiryInfo[]>([]);

  useEffect(() => {
    if (id) {
      const loadedStudent = getStudentById(id);
      if (loadedStudent) {
        setStudent(loadedStudent);
        setExpiryInfo(getStudentExpiryInfo(loadedStudent));
      } else {
        navigate('/students');
      }
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (student) {
      deleteStudent(student.id);
      toast({
        title: t('deleteSuccess'),
        description: student.name,
      });
      navigate('/students');
    }
  };

  const getStatusBadge = (status: Student['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-status-success text-white">{t('statusActive')}</Badge>;
      case 'leave':
        return <Badge className="bg-status-warning text-white">{t('statusLeave')}</Badge>;
      case 'expelled':
        return <Badge variant="destructive">{t('statusExpelled')}</Badge>;
      case 'graduated':
        return <Badge variant="secondary">{t('statusGraduated')}</Badge>;
    }
  };

  const getExpiryStatusDisplay = (info: ExpiryInfo) => {
    const getIcon = () => {
      switch (info.status) {
        case 'expired':
          return <AlertCircle className="w-5 h-5" />;
        case 'danger':
        case 'warning':
          return <AlertTriangle className="w-5 h-5" />;
        default:
          return <CheckCircle className="w-5 h-5" />;
      }
    };

    const getText = () => {
      if (info.daysRemaining <= 0) {
        return `${Math.abs(info.daysRemaining)} ${t('daysOverdue')}`;
      }
      return `${info.daysRemaining} ${t('daysRemaining')}`;
    };

    return (
      <div className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg',
        info.status === 'expired' && 'bg-status-danger-bg text-status-danger',
        info.status === 'danger' && 'bg-status-danger-bg text-status-danger',
        info.status === 'warning' && 'bg-status-warning-bg text-status-warning',
        info.status === 'valid' && 'bg-status-success-bg text-status-success'
      )}>
        {getIcon()}
        <span className="text-sm font-medium">{getText()}</span>
      </div>
    );
  };

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
      <div className="space-y-6 animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{student.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                {getStatusBadge(student.status)}
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{student.nationality}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/edit-student/${student.id}`)}>
              <Edit className="w-4 h-4 mr-2" />
              {t('btnEdit')}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t('btnDelete')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('confirmDelete')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {student.name}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('btnCancel')}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    {t('btnConfirm')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Details */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">{t('personalInfo')}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('dateOfBirth')}</p>
                  <p className="font-medium">{formatDate(student.dateOfBirth)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('passportNumber')}</p>
                  <p className="font-mono font-medium">{student.passportNumber}</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>{student.address}</span>
                </div>
              </div>
            </div>

            {/* Document Details */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">{t('documentInfo')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">{t('passportExpiry')}</p>
                  <p className="font-medium">{formatDate(student.passportExpiry)}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">{t('visaIssueDate')}</p>
                  <p className="font-medium">{formatDate(student.visaIssue)}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">{t('visaExpiryDate')}</p>
                  <p className="font-medium">{formatDate(student.visaExpiry)}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">{t('migrationCardExpiry')}</p>
                  <p className="font-medium">{formatDate(student.migrationExpiry)}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg md:col-span-2">
                  <p className="text-sm text-muted-foreground">{t('medicalCertExpiry')}</p>
                  <p className="font-medium">{formatDate(student.medicalExpiry)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Status */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">{t('documentStatus')}</h2>
              <div className="space-y-3">
                {expiryInfo.map((info, index) => (
                  <div key={index}>
                    <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                    {getExpiryStatusDisplay(info)}
                  </div>
                ))}
              </div>
            </div>

            {/* Uploaded Documents */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">{t('uploadedDocuments')}</h2>
              {Object.keys(student.files).length > 0 ? (
                <div className="space-y-3">
                  {student.files.passportScan && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{t('passportScan')}</span>
                      </div>
                      <img 
                        src={student.files.passportScan} 
                        alt="Passport" 
                        className="w-full h-24 object-cover rounded border"
                      />
                    </div>
                  )}
                  {student.files.visaScan && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{t('visaScan')}</span>
                      </div>
                      <img 
                        src={student.files.visaScan} 
                        alt="Visa" 
                        className="w-full h-24 object-cover rounded border"
                      />
                    </div>
                  )}
                  {student.files.medicalScan && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{t('medicalScan')}</span>
                      </div>
                      <img 
                        src={student.files.medicalScan} 
                        alt="Medical" 
                        className="w-full h-24 object-cover rounded border"
                      />
                    </div>
                  )}
                  {student.files.registrationScan && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{t('registrationScan')}</span>
                      </div>
                      <img 
                        src={student.files.registrationScan} 
                        alt="Registration" 
                        className="w-full h-24 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t('noDocuments')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentProfile;
