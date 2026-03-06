import React, { useState, useEffect } from 'react';
import { Globe, Bell, Palette, Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getSettings, updateSettings } from '@/lib/storage';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Settings: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { darkMode, setDarkMode } = useTheme();
  const [notificationEmail, setNotificationEmail] = useState('');

  useEffect(() => {
    const settings = getSettings();
    setNotificationEmail(settings.notificationEmail);
  }, []);

  const handleSaveEmail = () => {
    updateSettings({ notificationEmail });
    toast({
      title: t('settingsSaved'),
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8 max-w-2xl animate-fade-up">
        <div>
          <h1 className="text-3xl font-bold">{t('settingsTitle')}</h1>
        </div>

        {/* Language Settings */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">{t('languageSettings')}</h2>
          </div>
          <div className="space-y-2">
            <Label>{t('selectLanguage')}</Label>
            <div className="flex gap-3">
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                onClick={() => setLanguage('en')}
                className="flex-1"
              >
                🇬🇧 English
              </Button>
              <Button
                variant={language === 'ru' ? 'default' : 'outline'}
                onClick={() => setLanguage('ru')}
                className="flex-1"
              >
                🇷🇺 Русский
              </Button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">{t('notificationSettings')}</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notificationEmail">{t('notificationEmail')}</Label>
              <div className="flex gap-2">
                <Input
                  id="notificationEmail"
                  type="email"
                  value={notificationEmail}
                  onChange={(e) => setNotificationEmail(e.target.value)}
                  placeholder="admin@university.edu"
                  className="flex-1"
                />
                <Button onClick={handleSaveEmail}>{t('btnSave')}</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">{t('appearanceSettings')}</h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-muted-foreground" />
              )}
              <span>{darkMode ? t('darkMode') : t('lightMode')}</span>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
