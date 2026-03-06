import React from 'react';
import { Bell, FileWarning, Stethoscope, CreditCard, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface Notification {
  type: 'visa' | 'medical' | 'passport' | 'migration';
  count: number;
  urgentCount: number;
}

interface NotificationsPanelProps {
  notifications: Notification[];
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications }) => {
  const { t } = useLanguage();

  const getIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return <span className="text-lg">🛂</span>;
      case 'passport':
        return <span className="text-lg">📘</span>;
      case 'medical':
        return <span className="text-lg">🩺</span>;
      case 'migration':
        return <span className="text-lg">📝</span>;
      default:
        return <FileWarning className="w-4 h-4" />;
    }
  };

  const getMessage = (type: string, count: number) => {
    switch (type) {
      case 'visa':
        return `${count} ${t('notifVisaRenewals')}`;
      case 'passport':
        return `${count} ${t('notifPassportExpiring')}`;
      case 'medical':
        return `${count} ${t('notifMedicalExpiring')}`;
      case 'migration':
        return `${count} ${t('notifMigrationExpiring')}`;
      default:
        return `${count} documents expiring`;
    }
  };

  const activeNotifications = notifications.filter(n => n.count > 0);

  if (activeNotifications.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">{t('notifications')}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {activeNotifications.map((notification) => (
          <div
            key={notification.type}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border',
              notification.urgentCount > 0
                ? 'bg-status-danger-bg/50 border-status-danger/30'
                : 'bg-status-warning-bg/50 border-status-warning/30'
            )}
          >
            {getIcon(notification.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {getMessage(notification.type, notification.count)}
              </p>
              {notification.urgentCount > 0 && (
                <p className="text-xs text-status-danger">
                  {notification.urgentCount} {t('urgent')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;
