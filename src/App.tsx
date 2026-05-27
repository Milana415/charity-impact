import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage/ProgramsPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage/ProgramDetailPage';
import { DonorDashboardPage } from './pages/DonorDashboardPage/DonorDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/program/:id" element={<ProgramDetailPage />} />
        <Route path="/dashboard" element={<DonorDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;