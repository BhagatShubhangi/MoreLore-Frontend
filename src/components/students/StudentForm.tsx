import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Student, StudentFiles, addStudent, updateStudent, fileToBase64 } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface StudentFormProps {
  student?: Student | null;
  isEdit?: boolean;
}

const nationalities = ['Russian', 'Indian'];

const StudentForm: React.FC<StudentFormProps> = ({ student, isEdit = false }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    nationality: '',
    dateOfBirth: '',
    passportNumber: '',
    passportExpiry: '',
    visaIssue: '',
    visaExpiry: '',
    migrationExpiry: '',
    medicalExpiry: '',
    address: '',
    status: 'active' as Student['status'],
    phone: '',
    email: '',
  });

  const [files, setFiles] = useState<StudentFiles>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (student && isEdit) {
      setFormData({
        name: student.name,
        nationality: student.nationality,
        dateOfBirth: student.dateOfBirth,
        passportNumber: student.passportNumber,
        passportExpiry: student.passportExpiry,
        visaIssue: student.visaIssue,
        visaExpiry: student.visaExpiry,
        migrationExpiry: student.migrationExpiry,
        medicalExpiry: student.medicalExpiry,
        address: student.address,
        status: student.status,
        phone: student.phone,
        email: student.email,
      });
      setFiles(student.files);
    }
  }, [student, isEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (fileType: keyof StudentFiles, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(prev => ({ ...prev, [fileType]: true }));

    try {
      const base64 = await fileToBase64(file);
      setFiles(prev => ({ ...prev, [fileType]: base64 }));
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive',
      });
    } finally {
      setUploading(prev => ({ ...prev, [fileType]: false }));
    }
  };

  const removeFile = (fileType: keyof StudentFiles) => {
    setFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[fileType];
      return newFiles;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const studentData = {
      ...formData,
      files,
    };

    try {
      if (isEdit && student) {
        updateStudent(student.id, studentData);
        toast({
          title: t('updateSuccess'),
          description: formData.name,
        });
      } else {
        addStudent(studentData as Omit<Student, 'id' | 'createdAt' | 'updatedAt'>);
        toast({
          title: t('saveSuccess'),
          description: formData.name,
        });
      }
      navigate('/students');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save student',
        variant: 'destructive',
      });
    }
  };

  const fileInputs: { key: keyof StudentFiles; label: string }[] = [
    { key: 'passportScan', label: t('passportScan') },
    { key: 'visaScan', label: t('visaScan') },
    { key: 'medicalScan', label: t('medicalScan') },
    { key: 'registrationScan', label: t('registrationScan') },
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 animate-fade-up">
      {/* Personal Information */}
      <div className="form-section">
        <h2 className="text-lg font-semibold mb-4">{t('personalInfo')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-group">
            <Label htmlFor="name">{t('fullName')}</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <Label htmlFor="nationality">{t('nationality')}</Label>
            <Select
              value={formData.nationality}
              onValueChange={(value) => handleSelectChange('nationality', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('nationality')} />
              </SelectTrigger>
              <SelectContent>
                {nationalities.map((nat) => (
                  <SelectItem key={nat} value={nat}>{nat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="input-group">
            <Label htmlFor="dateOfBirth">{t('dateOfBirth')}</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <Label htmlFor="status">{t('studyStatus')}</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">{t('statusActive')}</SelectItem>
                <SelectItem value="leave">{t('statusLeave')}</SelectItem>
                <SelectItem value="expelled">{t('statusExpelled')}</SelectItem>
                <SelectItem value="graduated">{t('statusGraduated')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Document Information */}
      <div className="form-section">
        <h2 className="text-lg font-semibold mb-4">{t('documentInfo')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-group">
            <Label htmlFor="passportNumber">{t('passportNumber')}</Label>
            <Input
              id="passportNumber"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <Label htmlFor="passportExpiry">{t('passportExpiry')}</Label>
            <Input
              id="passportExpiry"
              name="passportExpiry"
              type="date"
              value={formData.passportExpiry}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <Label htmlFor="visaIssue">{t('visaIssueDate')}</Label>
            <Input
              id="visaIssue"
              name="visaIssue"
              type="date"
              value={formData.visaIssue}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <Label htmlFor="visaExpiry">{t('visaExpiryDate')}</Label>
            <Input
              id="visaExpiry"
              name="visaExpiry"
              type="date"
              value={formData.visaExpiry}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <Label htmlFor="migrationExpiry">{t('migrationCardExpiry')}</Label>
            <Input
              id="migrationExpiry"
              name="migrationExpiry"
              type="date"
              value={formData.migrationExpiry}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <Label htmlFor="medicalExpiry">{t('medicalCertExpiry')}</Label>
            <Input
              id="medicalExpiry"
              name="medicalExpiry"
              type="date"
              value={formData.medicalExpiry}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="form-section">
        <h2 className="text-lg font-semibold mb-4">{t('contactInfo')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-group">
            <Label htmlFor="phone">{t('phoneNumber')}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group md:col-span-2">
            <Label htmlFor="address">{t('registrationAddress')}</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={2}
              required
            />
          </div>
        </div>
      </div>

      {/* File Uploads */}
      <div className="form-section">
        <h2 className="text-lg font-semibold mb-4">{t('fileUploads')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fileInputs.map(({ key, label }) => (
            <div key={key} className="input-group">
              <Label>{label}</Label>
              {files[key] ? (
                <div className="flex items-center gap-2 p-3 bg-status-success-bg rounded-lg border border-status-success/20">
                  <Check className="w-5 h-5 text-status-success" />
                  <span className="text-sm text-status-success flex-1">{t('fileUploaded')}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeFile(key)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex items-center gap-2 p-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {uploading[key] ? 'Uploading...' : t('uploadFile')}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(key, e)}
                    disabled={uploading[key]}
                  />
                </label>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4">
        <Button type="submit" size="lg">
          {isEdit ? t('btnUpdate') : t('btnSave')}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={() => navigate(-1)}>
          {t('btnCancel')}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;
