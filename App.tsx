import React, { useState } from 'react';
import { NetworkProvider, useNetwork } from './context/NetworkContext';
import { Sidebar, NavTab } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { Dashboard } from './pages/Dashboard';
import { Connections } from './pages/Connections';
import { Bonding } from './pages/Bonding';
import { Diagnostics } from './pages/Diagnostics';
import { Settings } from './pages/Settings';
import { AlertCircle, Shield, Wifi, Smartphone, Globe } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { error, settings } = useNetwork();

  // Apply theme class
  const themeClass = settings.theme === 'cyber' ? 'bg-[#030712]' : 'bg-[#070b14]';

  const renderPage = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'connections':
        return <Connections />;
      case 'bonding':
        return <Bonding />;
      case 'diagnostics':
        return <Diagnostics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen ${themeClass} text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white`}>
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col flex-1 min-w-0">
        <Header
          currentTab={currentTab}
          onOpenMobileNav={() => setMobileOpen(true)}
        />

        {/* Global Error Banner if any */}
        {error && (
          <div className="mx-4 sm:mx-6 lg:mx-8 mt-4 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderPage()}
        </main>

        {/* Modern Footer */}
        <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/40 px-4 sm:px-6 lg:px-8 py-4 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="font-mono font-bold text-slate-300">PLEXLINK</span>
              <span>&bull;</span>
              <span>Windows Laptop Dual-Path Aggregation (Wi-Fi 6 + Android USB RNDIS)</span>
            </div>

            <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-400">
              <span className="flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>WireGuard MPTCP</span>
              </span>
              <span>v1.0.0-rc3</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export function App() {
  return (
    <NetworkProvider>
      <AppContent />
    </NetworkProvider>
  );
}

export default App;

