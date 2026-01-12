
import React, { useState, useEffect } from 'react';
import { AppData, TabType } from './types';
import { DEFAULT_STANDARD_QUOTA, INITIAL_ROLES } from './constants';
import ConfigTab from './components/ConfigTab';
import TeacherTab from './components/TeacherTab';
import WeeklyTab from './components/WeeklyTab';
import ReportTab from './components/ReportTab';
import BackupTab from './components/BackupTab';
import { LayoutDashboard, Users, CalendarDays, FileText, Save, Settings } from 'lucide-react';

const STORAGE_KEY = 'thcs_teaching_mgmt_v2';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('teachers');
  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse storage", e);
      }
    }
    return {
      standardQuota: DEFAULT_STANDARD_QUOTA,
      roles: INITIAL_ROLES,
      teachers: [],
      weeklyData: {}
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<AppData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const menu = [
    { id: 'config' as TabType, label: 'Cấu hình', icon: Settings },
    { id: 'teachers' as TabType, label: 'Phân công', icon: Users },
    { id: 'weekly' as TabType, label: 'Tiết dạy', icon: CalendarDays },
    { id: 'reports' as TabType, label: 'Báo cáo', icon: FileText },
    { id: 'backup' as TabType, label: 'Sao lưu', icon: Save },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-10">
      <header className="glass sticky top-0 z-50 px-4 py-4 border-b border-slate-100 mb-6 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-200">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-800 leading-none">THCS GIẢNG DẠY PRO</h1>
              <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest mt-1 block">Hệ thống quản lý chuyên môn</span>
            </div>
          </div>
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-[1.25rem] w-full md:w-auto overflow-x-auto no-scrollbar">
            {menu.map(item => (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 md:flex-none flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all text-sm font-bold whitespace-nowrap ${
                  activeTab === item.id 
                    ? 'bg-white text-blue-800 shadow-md scale-105' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <item.icon size={18} /> {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 min-h-[600px] overflow-hidden">
          {activeTab === 'config' && <ConfigTab data={data} updateData={updateData} />}
          {activeTab === 'teachers' && <TeacherTab data={data} updateData={updateData} />}
          {activeTab === 'weekly' && <WeeklyTab data={data} updateData={updateData} />}
          {activeTab === 'reports' && <ReportTab data={data} />}
          {activeTab === 'backup' && <BackupTab data={data} updateData={updateData} />}
        </div>
      </main>
      <footer className="p-6 text-center text-gray-400 text-xs font-bold mt-10">
        Phần mềm chạy trực tiếp trên trình duyệt - Dữ liệu được bảo mật cục bộ tại máy tính của bạn.
      </footer>
    </div>
  );
};

export default App;
