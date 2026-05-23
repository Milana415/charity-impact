import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { SubscriptionsProvider } from './context/SubscriptionsContext';
import { HomePage } from './pages/HomePage/HomePage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage/ProgramsPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage/ProgramDetailPage';
import { DonorDashboardPage } from './pages/DonorDashboardPage/DonorDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SubscriptionsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/program/:id" element={<ProgramDetailPage />} />
              <Route path="/dashboard" element={<DonorDashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </SubscriptionsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;