# MoreLore-International Student Management System

A comprehensive web application for managing international student records, visas, registrations, and documents. Built with React, TypeScript, and modern web technologies.


## 🌟 Features

### Student Management
- **Add Students** - Register new international students with comprehensive details
- **Edit Students** - Update student information
- **Student Profiles** - View detailed student profiles with all information
- **Student List** - Browse and search through all registered students
- **Search & Filter** - Find students by name, nationality, course, or status

### Dashboard
- **Statistics Overview** - View key metrics at a glance
- **Deadline Tracking** - Stay on top of important dates and deadlines
- **Notifications Panel** - Receive alerts for upcoming expirations and deadlines
- **Export Functionality** - Export data to CSV format

### Document & Visa Management
- **Visa Status Tracking** - Monitor visa expiration dates
- **Document Management** - Track important documents for each student
- **Expiry Notifications** - Get alerts before documents expire

### Additional Features
- **Multi-language Support** - Available in multiple languages
- **Dark/Light Theme** - Toggle between dark and light modes
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.3
- **Language:** TypeScript 5.8
- **Build Tool:** Vite 5.4
- **Styling:** Tailwind CSS 3.4
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Routing:** React Router DOM 6.30
- **Form Handling:** React Hook Form + Zod
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **State Management:** React Context + TanStack Query

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BhagatShubhangi/student-hub-system.git
```

2. Navigate to the project directory:
```bash
cd student-hub-system
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit:
```
http://localhost:8080
```

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components (shadcn/ui)
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── layout/       # Layout components (Header, Sidebar, etc.)
│   │   └── students/     # Student management components
│   ├── contexts/         # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── tsconfig.json         # TypeScript configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
