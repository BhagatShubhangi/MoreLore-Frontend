import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { UpcomingDeadline } from '@/lib/expiry';
import { exportToCSV, exportToPDF } from '@/lib/exportUtils';

interface ExportButtonsProps {
  deadlines: UpcomingDeadline[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ deadlines }) => {
  const { t } = useLanguage();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => exportToCSV(deadlines, 'deadlines')}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => exportToPDF(deadlines, t('upcomingDeadlines'))}
        className="gap-2"
      >
        <FileText className="w-4 h-4" />
        PDF
      </Button>
    </div>
  );
};

export default ExportButtons;
