// Language translations for EN and RU

export type Language = 'en' | 'ru';

export const translations = {
  en: {
    // App
    appTitle: "Student Registry",
    appSubtitle: "International Student Management System",
    
    // Navigation
    navDashboard: "Dashboard",
    navAddStudent: "Add Student",
    navStudents: "Student List",
    navSettings: "Settings",
    
    // Dashboard
    dashboardTitle: "Dashboard",
    dashboardWelcome: "Welcome to the International Student Registry",
    cardExpiringVisas: "Expiring Visas",
    cardExpiredMedical: "Medical Certificates",
    cardExpiringRegistration: "Registrations",
    cardTotalStudents: "Total Students",
    upcomingDeadlines: "Upcoming Deadlines (Next 30 Days)",
    noUpcomingDeadlines: "No upcoming deadlines",
    daysRemaining: "days remaining",
    daysOverdue: "days overdue",
    expired: "Expired",
    lastUpdated: "Last updated",
    expiringThisWeek: "expiring this week",
    expiredCount: "expired",
    daysLeft: "Days Left",
    
    // Dashboard Filters
    filterDocType: "Document Type",
    filterStatus: "Status",
    filterDanger: "Critical (<7 days)",
    filterWarning: "Warning (<30 days)",
    filterValid: "Valid",
    docVisa: "Visa",
    docPassport: "Passport",
    docMedical: "Medical",
    docMigration: "Migration",
    
    // Notifications
    notifications: "Notifications",
    notifVisaRenewals: "visa renewals needed",
    notifPassportExpiring: "passports expiring",
    notifMedicalExpiring: "medical certificates expiring",
    notifMigrationExpiring: "migration cards expiring",
    urgent: "urgent",
    
    // Student Form
    addStudentTitle: "Add New Student",
    editStudentTitle: "Edit Student",
    personalInfo: "Personal Information",
    documentInfo: "Document Information",
    contactInfo: "Contact Information",
    fileUploads: "File Uploads",
    
    // Form Fields
    fullName: "Full Name",
    nationality: "Nationality",
    dateOfBirth: "Date of Birth",
    passportNumber: "Passport Number",
    passportExpiry: "Passport Expiry",
    visaIssueDate: "Visa Issue Date",
    visaExpiryDate: "Visa Expiry Date",
    migrationCardExpiry: "Migration Card Expiry",
    registrationAddress: "Registration Address",
    medicalCertExpiry: "Medical Certificate Expiry",
    studyStatus: "Study Status",
    phoneNumber: "Phone Number",
    email: "Email Address",
    
    // Status Options
    statusActive: "Active",
    statusLeave: "On Leave",
    statusExpelled: "Expelled",
    statusGraduated: "Graduated",
    
    // File Upload Labels
    passportScan: "Passport Scan",
    visaScan: "Visa Scan",
    medicalScan: "Medical Certificate Scan",
    registrationScan: "Registration Scan",
    uploadFile: "Upload File",
    fileUploaded: "File uploaded",
    
    // Buttons
    btnSave: "Save Student",
    btnUpdate: "Update Student",
    btnCancel: "Cancel",
    btnEdit: "Edit",
    btnDelete: "Delete",
    btnViewProfile: "View Profile",
    btnBack: "Back",
    btnConfirm: "Confirm",
    
    // Student List
    studentListTitle: "Student List",
    searchPlaceholder: "Search by name, passport, or nationality...",
    filterAll: "All",
    filterActive: "Active Only",
    filterExpired: "Expired Documents",
    noStudentsFound: "No students found",
    
    // Student Profile
    profileTitle: "Student Profile",
    documentStatus: "Document Status",
    uploadedDocuments: "Uploaded Documents",
    noDocuments: "No documents uploaded",
    
    // Settings
    settingsTitle: "Settings",
    languageSettings: "Language Settings",
    selectLanguage: "Select Language",
    notificationSettings: "Notification Settings",
    notificationEmail: "Notification Email",
    appearanceSettings: "Appearance",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    settingsSaved: "Settings saved successfully",
    
    // Confirmations
    confirmDelete: "Are you sure you want to delete this student?",
    deleteSuccess: "Student deleted successfully",
    saveSuccess: "Student saved successfully",
    updateSuccess: "Student updated successfully",
    
    // Validation
    requiredField: "This field is required",
    invalidEmail: "Please enter a valid email",
    invalidPhone: "Please enter a valid phone number",
    
    // Countries
    countryRussia: "Russia",
    countryChina: "China",
    countryIndia: "India",
    countryVietnam: "Vietnam",
    countryKazakhstan: "Kazakhstan",
    countryUzbekistan: "Uzbekistan",
    countryTurkmenistan: "Turkmenistan",
    countryTajikistan: "Tajikistan",
    countryKyrgyzstan: "Kyrgyzstan",
    countryMongolia: "Mongolia",
    countryOther: "Other",
  },
  ru: {
    // App
    appTitle: "Реестр Студентов",
    appSubtitle: "Система Управления Иностранными Студентами",
    
    // Navigation
    navDashboard: "Панель",
    navAddStudent: "Добавить",
    navStudents: "Список",
    navSettings: "Настройки",
    
    // Dashboard
    dashboardTitle: "Панель Управления",
    dashboardWelcome: "Добро пожаловать в реестр иностранных студентов",
    cardExpiringVisas: "Истекающие Визы",
    cardExpiredMedical: "Медицинские Справки",
    cardExpiringRegistration: "Регистрации",
    cardTotalStudents: "Всего Студентов",
    upcomingDeadlines: "Предстоящие Сроки (30 дней)",
    noUpcomingDeadlines: "Нет предстоящих сроков",
    daysRemaining: "дней осталось",
    daysOverdue: "дней просрочено",
    expired: "Просрочено",
    lastUpdated: "Обновлено",
    expiringThisWeek: "истекает на этой неделе",
    expiredCount: "просрочено",
    daysLeft: "Дней осталось",
    
    // Dashboard Filters
    filterDocType: "Тип документа",
    filterStatus: "Статус",
    filterDanger: "Критично (<7 дней)",
    filterWarning: "Внимание (<30 дней)",
    filterValid: "Действителен",
    docVisa: "Виза",
    docPassport: "Паспорт",
    docMedical: "Мед. справка",
    docMigration: "Миграц. карта",
    
    // Notifications
    notifications: "Уведомления",
    notifVisaRenewals: "требуется продление визы",
    notifPassportExpiring: "паспортов истекает",
    notifMedicalExpiring: "мед. справок истекает",
    notifMigrationExpiring: "миграц. карт истекает",
    urgent: "срочно",
    
    // Student Form
    addStudentTitle: "Добавить Студента",
    editStudentTitle: "Редактировать Студента",
    personalInfo: "Личная Информация",
    documentInfo: "Документы",
    contactInfo: "Контактная Информация",
    fileUploads: "Загрузка Файлов",
    
    // Form Fields
    fullName: "ФИО",
    nationality: "Гражданство",
    dateOfBirth: "Дата Рождения",
    passportNumber: "Номер Паспорта",
    passportExpiry: "Срок Действия Паспорта",
    visaIssueDate: "Дата Выдачи Визы",
    visaExpiryDate: "Срок Действия Визы",
    migrationCardExpiry: "Срок Миграционной Карты",
    registrationAddress: "Адрес Регистрации",
    medicalCertExpiry: "Срок Медицинской Справки",
    studyStatus: "Статус Обучения",
    phoneNumber: "Телефон",
    email: "Электронная Почта",
    
    // Status Options
    statusActive: "Активный",
    statusLeave: "В Отпуске",
    statusExpelled: "Отчислен",
    statusGraduated: "Выпускник",
    
    // File Upload Labels
    passportScan: "Скан Паспорта",
    visaScan: "Скан Визы",
    medicalScan: "Скан Медицинской Справки",
    registrationScan: "Скан Регистрации",
    uploadFile: "Загрузить Файл",
    fileUploaded: "Файл загружен",
    
    // Buttons
    btnSave: "Сохранить",
    btnUpdate: "Обновить",
    btnCancel: "Отмена",
    btnEdit: "Редактировать",
    btnDelete: "Удалить",
    btnViewProfile: "Профиль",
    btnBack: "Назад",
    btnConfirm: "Подтвердить",
    
    // Student List
    studentListTitle: "Список Студентов",
    searchPlaceholder: "Поиск по имени, паспорту или гражданству...",
    filterAll: "Все",
    filterActive: "Только Активные",
    filterExpired: "Просроченные Документы",
    noStudentsFound: "Студенты не найдены",
    
    // Student Profile
    profileTitle: "Профиль Студента",
    documentStatus: "Статус Документов",
    uploadedDocuments: "Загруженные Документы",
    noDocuments: "Документы не загружены",
    
    // Settings
    settingsTitle: "Настройки",
    languageSettings: "Язык",
    selectLanguage: "Выберите Язык",
    notificationSettings: "Уведомления",
    notificationEmail: "Email для Уведомлений",
    appearanceSettings: "Оформление",
    darkMode: "Тёмная Тема",
    lightMode: "Светлая Тема",
    settingsSaved: "Настройки сохранены",
    
    // Confirmations
    confirmDelete: "Вы уверены, что хотите удалить этого студента?",
    deleteSuccess: "Студент удалён",
    saveSuccess: "Студент сохранён",
    updateSuccess: "Данные обновлены",
    
    // Validation
    requiredField: "Обязательное поле",
    invalidEmail: "Введите корректный email",
    invalidPhone: "Введите корректный номер телефона",
    
    // Countries
    countryRussia: "Россия",
    countryChina: "Китай",
    countryIndia: "Индия",
    countryVietnam: "Вьетнам",
    countryKazakhstan: "Казахстан",
    countryUzbekistan: "Узбекистан",
    countryTurkmenistan: "Туркменистан",
    countryTajikistan: "Таджикистан",
    countryKyrgyzstan: "Кыргызстан",
    countryMongolia: "Монголия",
    countryOther: "Другое",
  }
};

export type TranslationKey = keyof typeof translations.en;
