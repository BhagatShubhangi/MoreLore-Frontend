import React from 'react';

interface NationalityFlagProps {
  nationality: string;
  showLabel?: boolean;
  className?: string;
}

const NationalityFlag: React.FC<NationalityFlagProps> = ({ 
  nationality, 
  showLabel = false,
  className = '' 
}) => {
  const getFlag = (nat: string): string => {
    switch (nat.toLowerCase()) {
      case 'russian':
      case 'russia':
        return '🇷🇺';
      case 'indian':
      case 'india':
        return '🇮🇳';
      case 'chinese':
      case 'china':
        return '🇨🇳';
      case 'vietnamese':
      case 'vietnam':
        return '🇻🇳';
      case 'kazakh':
      case 'kazakhstan':
        return '🇰🇿';
      case 'uzbek':
      case 'uzbekistan':
        return '🇺🇿';
      case 'turkmen':
      case 'turkmenistan':
        return '🇹🇲';
      case 'tajik':
      case 'tajikistan':
        return '🇹🇯';
      case 'kyrgyz':
      case 'kyrgyzstan':
        return '🇰🇬';
      case 'mongolian':
      case 'mongolia':
        return '🇲🇳';
      default:
        return '🌍';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="text-base">{getFlag(nationality)}</span>
      {showLabel && <span>{nationality}</span>}
    </span>
  );
};

export default NationalityFlag;
