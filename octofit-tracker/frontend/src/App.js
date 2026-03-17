import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const Dashboard = () => (
  <div className="row g-4">
    <div className="col-12">
      <Users />
    </div>
    <div className="col-12">
      <Teams />
    </div>
    <div className="col-12">
      <Activities />
    </div>
    <div className="col-12 col-lg-6">
      <Leaderboard />
    </div>
    <div className="col-12 col-lg-6">
      <Workouts />
    </div>
  </div>
);

function App() {
  const navItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/users', label: 'Users' },
    { to: '/teams', label: 'Teams' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ];

  return (
    <BrowserRouter>
      <main className="container py-4 py-md-5">
        <header className="card shadow-sm border-0 mb-4 octo-hero-card">
          <div className="card-body p-4 p-lg-5">
            <div className="octo-brand mb-3">
              <img
                src="/octofitapp-small.png"
                alt="Octofit app logo"
                className="octo-brand-logo"
              />
              <div>
                <h1 className="display-6 fw-semibold mb-1 octo-brand-title">Octofit Tracker</h1>
                <p className="mb-0 octo-brand-subtitle">
                  모든 섹션은 Bootstrap 컴포넌트 기반의 동일한 데이터 테이블 경험을 제공합니다.
                </p>
              </div>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <nav aria-label="Main navigation" className="w-100">
                <ul className="nav nav-pills flex-wrap gap-2">
                  {navItems.map((item) => (
                    <li className="nav-item" key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `nav-link ${isActive ? 'active' : 'bg-white border text-dark'}`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fw-semibold"
                href="https://getbootstrap.com/docs/5.3/getting-started/introduction/"
                target="_blank"
                rel="noreferrer"
              >
                Bootstrap 가이드
              </a>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
