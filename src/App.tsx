import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { SubscriptionsProvider } from './context/SubscriptionsContext';
import { SearchProvider } from './context/SearchContext';
import { HomePage } from './pages/HomePage/HomePage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage/ProgramsPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage/ProgramDetailPage';
import { DonorDashboardPage } from './pages/DonorDashboardPage/DonorDashboardPage';
import { DonationProvider } from './context/DonationContext';
import { SearchResultsPage } from './pages/SearchResultsPage/SearchResultsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SubscriptionsProvider>
          <DonationProvider>
            <SearchProvider>
              <BrowserRouter basename={import.meta.env.BASE_URL}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/programs" element={<ProgramsPage />} />
                  <Route path="/program/:id" element={<ProgramDetailPage />} />
                  <Route path="/dashboard" element={<DonorDashboardPage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </SearchProvider>
          </DonationProvider>
        </SubscriptionsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;