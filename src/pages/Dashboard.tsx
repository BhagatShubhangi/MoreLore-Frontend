import React, { useEffect, useState, useMemo } from 'react';
import { Users, FileWarning, Calendar, Stethoscope, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getStudents, Student, initializeStorage } from '@/lib/storage';
import { 
  getUpcomingDeadlines, 
  countExpiringVisas, 
  countExpiringMedical,
  countExpiringRegistrations,
  UpcomingDeadline,
  getDaysRemaining,
  getExpiryStatus
} from '@/lib/expiry';
import MainLayout from '@/components/layout/MainLayout';
import StatCard from '@/components/dashboard/StatCard';
import DeadlineTable from '@/components/dashboard/DeadlineTable';
import DashboardFilters from '@/components/dashboard/DashboardFilters';
import NotificationsPanel from '@/components/dashboard/NotificationsPanel';
import ExportButtons from '@/components/dashboard/ExportButtons';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const [students, setStudents] = useState<Student[]>([]);
  const [deadlines, setDeadlines] = useState<UpcomingDeadline[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [documentType, setDocumentType] = useState('all');
  const [expiryStatus, setExpiryStatus] = useState('all');
  const [nationality, setNationality] = useState('all');

  useEffect(() => {
    initializeStorage();
    const loadedStudents = getStudents();
    setStudents(loadedStudents);
    setDeadlines(getUpcomingDeadlines(loadedStudents, 30));
    setLastUpdated(new Date());
  }, []);

  const activeStudents = students.filter(s => s.status === 'active');

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const expiringThisWeek = deadlines.filter(d => d.daysRemaining > 0 && d.daysRemaining <= 7).length;
    const expiredCount = deadlines.filter(d => d.daysRemaining <= 0).length;
    return { expiringThisWeek, expiredCount };
  }, [deadlines]);

  // Calculate notifications
  const notifications = useMemo(() => {
    const activeStudentsList = students.filter(s => s.status === 'active');
    
    const visaDeadlines = activeStudentsList.filter(s => {
      const days = getDaysRemaining(s.visaExpiry);
      return days <= 30;
    });
    const passportDeadlines = activeStudentsList.filter(s => {
      const days = getDaysRemaining(s.passportExpiry);
      return days <= 30;
    });
    const medicalDeadlines = activeStudentsList.filter(s => {
      const days = getDaysRemaining(s.medicalExpiry);
      return days <= 30;
    });
    const migrationDeadlines = activeStudentsList.filter(s => {
      const days = getDaysRemaining(s.migrationExpiry);
      return days <= 30;
    });

    return [
      { 
        type: 'visa' as const, 
        count: visaDeadlines.length,
        urgentCount: visaDeadlines.filter(s => getDaysRemaining(s.visaExpiry) <= 7).length
      },
      { 
        type: 'passport' as const, 
        count: passportDeadlines.length,
        urgentCount: passportDeadlines.filter(s => getDaysRemaining(s.passportExpiry) <= 7).length
      },
      { 
        type: 'medical' as const, 
        count: medicalDeadlines.length,
        urgentCount: medicalDeadlines.filter(s => getDaysRemaining(s.medicalExpiry) <= 7).length
      },
      { 
        type: 'migration' as const, 
        count: migrationDeadlines.length,
        urgentCount: migrationDeadlines.filter(s => getDaysRemaining(s.migrationExpiry) <= 7).length
      },
    ];
  }, [students]);

  // Filter deadlines
  const filteredDeadlines = useMemo(() => {
    return deadlines.filter(deadline => {
      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const student = students.find(s => s.id === deadline.studentId);
        if (!student) return false;
        
        const matchesName = deadline.studentName.toLowerCase().includes(search);
        const matchesPassport = student.passportNumber.toLowerCase().includes(search);
        const matchesId = student.id.toLowerCase().includes(search);
        
        if (!matchesName && !matchesPassport && !matchesId) return false;
      }

      // Document type filter
      if (documentType !== 'all' && deadline.documentType !== documentType) {
        return false;
      }

      // Expiry status filter
      if (expiryStatus !== 'all' && deadline.status !== expiryStatus) {
        return false;
      }

      // Nationality filter
      if (nationality !== 'all') {
        const student = students.find(s => s.id === deadline.studentId);
        if (!student || student.nationality !== nationality) return false;
      }

      return true;
    });
  }, [deadlines, searchTerm, documentType, expiryStatus, nationality, students]);

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-up">
        {/* Header with Last Updated */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t('dashboardTitle')}</h1>
            <p className="text-muted-foreground mt-1">{t('dashboardWelcome')}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card border border-border rounded-lg px-3 py-2">
            <Clock className="w-4 h-4" />
            <span>{t('lastUpdated')}: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Notifications Panel */}
        <NotificationsPanel notifications={notifications} />

        {/* Stats Grid with Summary Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <StatCard
              title={t('cardTotalStudents')}
              value={activeStudents.length}
              icon={Users}
              variant="default"
            />
          </div>
          <div className="space-y-2">
            <StatCard
              title={t('cardExpiringVisas')}
              value={countExpiringVisas(students)}
              icon={FileWarning}
              variant={countExpiringVisas(students) > 0 ? 'danger' : 'success'}
            />
            {summaryStats.expiringThisWeek > 0 && (
              <p className="text-xs text-status-danger px-2">
                {summaryStats.expiringThisWeek} {t('expiringThisWeek')}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <StatCard
              title={t('cardExpiredMedical')}
              value={countExpiringMedical(students)}
              icon={Stethoscope}
              variant={countExpiringMedical(students) > 0 ? 'warning' : 'success'}
            />
            {summaryStats.expiredCount > 0 && (
              <p className="text-xs text-status-warning px-2">
                {summaryStats.expiredCount} {t('expiredCount')}
              </p>
            )}
          </div>
          <StatCard
            title={t('cardExpiringRegistration')}
            value={countExpiringRegistrations(students)}
            icon={Calendar}
            variant={countExpiringRegistrations(students) > 0 ? 'warning' : 'success'}
          />
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{t('upcomingDeadlines')}</h2>
            <ExportButtons deadlines={filteredDeadlines} />
          </div>
          
          {/* Filters */}
          <DashboardFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            documentType={documentType}
            onDocumentTypeChange={setDocumentType}
            expiryStatus={expiryStatus}
            onExpiryStatusChange={setExpiryStatus}
            nationality={nationality}
            onNationalityChange={setNationality}
          />
          
          <DeadlineTable deadlines={filteredDeadlines} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
