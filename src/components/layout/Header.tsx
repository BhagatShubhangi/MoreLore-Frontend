import React from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-end px-6 gap-2">
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Globe className="w-4 h-4" />
            {language.toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLanguage('en')}>
            <span className={language === 'en' ? 'font-semibold' : ''}>English</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('ru')}>
            <span className={language === 'ru' ? 'font-semibold' : ''}>Русский</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Toggle */}
      <Button variant="outline" size="icon" onClick={toggleDarkMode}>
        {darkMode ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </Button>
    </header>
  );
};

export default Header;
