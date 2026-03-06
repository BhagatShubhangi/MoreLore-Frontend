import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Settings
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const { t } = useLanguage();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: t('navDashboard') },
    { path: '/add-student', icon: UserPlus, label: t('navAddStudent') },
    { path: '/students', icon: Users, label: t('navStudents') },
    { path: '/settings', icon: Settings, label: t('navSettings') },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col z-50">
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Student Registry Logo" 
            className="w-10 h-10 rounded-xl object-contain"
          />
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">{t('appTitle')}</h1>
            <p className="text-xs text-sidebar-foreground/60">{t('appSubtitle')}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(
                'sidebar-link',
                isActive && 'active'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          © 2024 Student Registry
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
