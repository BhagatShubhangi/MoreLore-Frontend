import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { UpcomingDeadline, formatDate, ExpiryStatus } from '@/lib/expiry';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ProfileAvatar from '@/components/ui/ProfileAvatar';
import NationalityFlag from '@/components/ui/NationalityFlag';
import DocumentIcon from '@/components/ui/DocumentIcon';
import { getStudentById } from '@/lib/storage';

interface DeadlineTableProps {
  deadlines: UpcomingDeadline[];
}

const DeadlineTable: React.FC<DeadlineTableProps> = ({ deadlines }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const getStatusBadge = (status: ExpiryStatus, daysRemaining: number) => {
    switch (status) {
      case 'expired':
        return (
          <span className="status-badge status-danger">
            <AlertCircle className="w-3 h-3 mr-1" />
            {t('expired')}
          </span>
        );
      case 'danger':
        return (
          <span className="status-badge status-danger">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {daysRemaining} {t('daysRemaining')}
          </span>
        );
      case 'warning':
        return (
          <span className="status-badge status-warning">
            <Calendar className="w-3 h-3 mr-1" />
            {daysRemaining} {t('daysRemaining')}
          </span>
        );
      default:
        return (
          <span className="status-badge status-success">
            <CheckCircle className="w-3 h-3 mr-1" />
            {daysRemaining} {t('daysRemaining')}
          </span>
        );
    }
  };

  const getDaysLeftColor = (daysRemaining: number): string => {
    if (daysRemaining <= 0) return 'text-status-danger font-bold';
    if (daysRemaining <= 7) return 'text-status-danger';
    if (daysRemaining <= 30) return 'text-status-warning';
    return 'text-status-success';
  };

  if (deadlines.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <CheckCircle className="w-12 h-12 text-status-success mx-auto mb-4" />
        <p className="text-muted-foreground">{t('noUpcomingDeadlines')}</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <table className="data-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Document</th>
            <th>Expiry Date</th>
            <th>{t('daysLeft')}</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {deadlines.map((deadline, index) => {
            const student = getStudentById(deadline.studentId);
            
            return (
              <tr 
                key={`${deadline.studentId}-${deadline.documentType}-${index}`}
                className={cn(
                  'animate-fade-up',
                  deadline.status === 'expired' && 'bg-status-danger-bg/30',
                  deadline.status === 'danger' && 'bg-status-danger-bg/20'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <ProfileAvatar name={deadline.studentName} size="sm" />
                    <div className="flex items-center gap-2">
                      {student && <NationalityFlag nationality={student.nationality} />}
                      <span className="font-medium">{deadline.studentName}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <DocumentIcon type={deadline.documentType} />
                </td>
                <td>{formatDate(deadline.expiryDate)}</td>
                <td>
                  <span className={cn('font-semibold', getDaysLeftColor(deadline.daysRemaining))}>
                    {deadline.daysRemaining <= 0 
                      ? `${Math.abs(deadline.daysRemaining)} ${t('daysOverdue')}`
                      : `${deadline.daysRemaining} days`
                    }
                  </span>
                </td>
                <td>{getStatusBadge(deadline.status, deadline.daysRemaining)}</td>
                <td>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/student/${deadline.studentId}`)}
                  >
                    {t('btnViewProfile')}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DeadlineTable;
