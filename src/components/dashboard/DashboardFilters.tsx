import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

interface DashboardFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  documentType: string;
  onDocumentTypeChange: (value: string) => void;
  expiryStatus: string;
  onExpiryStatusChange: (value: string) => void;
  nationality: string;
  onNationalityChange: (value: string) => void;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  searchTerm,
  onSearchChange,
  documentType,
  onDocumentTypeChange,
  expiryStatus,
  onExpiryStatusChange,
  nationality,
  onNationalityChange,
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-4">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Quick Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Document Type Filter */}
        <Select value={documentType} onValueChange={onDocumentTypeChange}>
          <SelectTrigger className="w-[160px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={t('filterDocType')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('filterAll')}</SelectItem>
            <SelectItem value="Visa">🛂 {t('docVisa')}</SelectItem>
            <SelectItem value="Passport">📘 {t('docPassport')}</SelectItem>
            <SelectItem value="Medical Certificate">🩺 {t('docMedical')}</SelectItem>
            <SelectItem value="Migration Card">📝 {t('docMigration')}</SelectItem>
          </SelectContent>
        </Select>

        {/* Expiry Status Filter */}
        <Select value={expiryStatus} onValueChange={onExpiryStatusChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder={t('filterStatus')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('filterAll')}</SelectItem>
            <SelectItem value="expired">{t('expired')}</SelectItem>
            <SelectItem value="danger">{t('filterDanger')}</SelectItem>
            <SelectItem value="warning">{t('filterWarning')}</SelectItem>
            <SelectItem value="valid">{t('filterValid')}</SelectItem>
          </SelectContent>
        </Select>

        {/* Nationality Filter */}
        <Select value={nationality} onValueChange={onNationalityChange}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder={t('nationality')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('filterAll')}</SelectItem>
            <SelectItem value="Russian">🇷🇺 Russian</SelectItem>
            <SelectItem value="Indian">🇮🇳 Indian</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DashboardFilters;
