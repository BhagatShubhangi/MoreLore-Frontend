import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant?: 'default' | 'danger' | 'warning' | 'success';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, variant = 'default' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return 'bg-status-danger-bg border-status-danger/20';
      case 'warning':
        return 'bg-status-warning-bg border-status-warning/20';
      case 'success':
        return 'bg-status-success-bg border-status-success/20';
      default:
        return 'bg-card border-border';
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case 'danger':
        return 'text-status-danger bg-status-danger/10';
      case 'warning':
        return 'text-status-warning bg-status-warning/10';
      case 'success':
        return 'text-status-success bg-status-success/10';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  return (
    <div className={cn(
      'rounded-xl border p-6 card-hover',
      getVariantStyles()
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={cn('p-3 rounded-lg', getIconStyles())}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
