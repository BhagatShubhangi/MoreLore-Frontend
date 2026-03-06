import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { Student } from '@/lib/storage';
import { getMostCriticalStatus, formatDate, ExpiryStatus } from '@/lib/expiry';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StudentTableProps {
  students: Student[];
}

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

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

  const getDocumentStatusIcon = (status: ExpiryStatus) => {
    switch (status) {
      case 'expired':
        return <AlertCircle className="w-5 h-5 text-status-danger" />;
      case 'danger':
        return <AlertTriangle className="w-5 h-5 text-status-danger" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-status-warning" />;
      default:
        return <CheckCircle className="w-5 h-5 text-status-success" />;
    }
  };

  if (students.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-12 text-center">
        <p className="text-muted-foreground">{t('noStudentsFound')}</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('fullName')}</th>
              <th>{t('nationality')}</th>
              <th>{t('passportNumber')}</th>
              <th>{t('visaExpiryDate')}</th>
              <th>{t('studyStatus')}</th>
              <th>Docs</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const criticalStatus = getMostCriticalStatus(student);
              return (
                <tr 
                  key={student.id}
                  className={cn(
                    'animate-fade-up',
                    criticalStatus === 'expired' && 'bg-status-danger-bg/30',
                    criticalStatus === 'danger' && 'bg-status-danger-bg/20',
                    criticalStatus === 'warning' && 'bg-status-warning-bg/20'
                  )}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="font-medium">{student.name}</td>
                  <td>{student.nationality}</td>
                  <td className="font-mono text-sm">{student.passportNumber}</td>
                  <td>{formatDate(student.visaExpiry)}</td>
                  <td>{getStatusBadge(student.status)}</td>
                  <td>{getDocumentStatusIcon(criticalStatus)}</td>
                  <td>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/student/${student.id}`)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {t('btnViewProfile')}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
