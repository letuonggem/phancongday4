
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { 
    LayoutDashboard, Users, CalendarDays, FileText, Settings, 
    Trash2, Edit3, Check, X, FileUp, ChevronLeft, ChevronRight, RefreshCw
} from 'lucide-react';

// --- CẤU HÌNH & KIỂU DỮ LIỆU ---
const STORAGE_KEY = 'thcs_teaching_mgmt_v2_pro';

// --- COMPONENT CHÍNH ---
const App = () => {
    const [activeTab, setActiveTab] = useState('teachers');
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : { 
            standardQuota: 19, 
            roles: [
                { id: '1', name: 'Tổ trưởng', reduction: 3 },
                { id: '2', name: 'Chủ nhiệm', reduction: 4 }
            ], 
            teachers: [], 
            weeklyData: {} 
        };
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    const updateData = (newData) => setData(prev => ({ ...prev, ...newData }));

    // --- TAB CẤU HÌNH ---
    const ConfigTab = () => {
        const [newRole, setNewRole] = useState({ name: '', reduction: 0 });
        return (
            <div className="p-8 animate-fadeIn">
                <h2 className="text-2xl font-black mb-6">Cấu hình</h2>
                <div className="bg-white p-6 rounded-3xl border mb-6">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Định mức chuẩn (Tiết/Tuần)</label>
                    <input type="number" value={data.standardQuota} onChange={e => updateData({standardQuota: parseInt(e.target.value)})} className="text-3xl font-black text-blue-600 outline-none w-full"/>
                </div>
                <div className="bg-white rounded-3xl border overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b">
                            <tr><th className="p-4">Chức vụ</th><th className="p-4">Giảm</th><th className="p-4"></th></tr>
                        </thead>
                        <tbody>
                            {data.roles.map(role => (
                                <tr key={role.id} className="border-b">
                                    <td className="p-4 font-bold">{role.name}</td>
                                    <td className="p-4">{role.reduction} tiết</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => updateData({roles: data.roles.filter(r => r.id !== role.id)})} className="text-red-400"><Trash2 size={16}/></button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-slate-50">
                                <td className="p-4"><input placeholder="Tên..." className="w-full p-2 border rounded" value={newRole.name} onChange={e => setNewRole({...newRole, name: e.target.value})}/></td>
                                <td className="p-4"><input type="number" className="w-20 p-2 border rounded" value={newRole.reduction} onChange={e => setNewRole({...newRole, reduction: parseInt(e.target.value)})}/></td>
                                <td className="p-4"><button onClick={() => {updateData({roles: [...data.roles, {id: Date.now().toString(), ...newRole}]}); setNewRole({name:'', reduction:0});}} className="bg-blue-600 text-white px-4 py-2 rounded">Thêm</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    // --- TAB GIÁO VIÊN ---
    const TeacherTab = () => {
        const fileRef = useRef(null);
        const handleImport = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (evt) => {
                const wb = (window as any).XLSX.read(evt.target.result, {type:'binary'});
                const rows = (window as any).XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                const news = rows.map((row, i) => ({
                    id: (Date.now()+i).toString(),
                    name: row['Họ tên'] || row['tengv'] || 'Ẩn danh',
                    subjects: row['Môn dạy'] || '',
                    assignedPeriods: parseFloat(row['Số tiết'] || row['tiết TKB']) || 0,
                    roles: []
                }));
                updateData({ teachers: [...data.teachers, ...news] });
            };
            reader.readAsBinaryString(file);
        };
        return (
            <div className="p-8">
                <div className="flex justify-between mb-6">
                    <h2 className="text-2xl font-black">Giáo viên</h2>
                    <input type="file" ref={fileRef} className="hidden" onChange={handleImport}/>
                    <button onClick={() => fileRef.current.click()} className="bg-emerald-600 text-white px-4 py-2 rounded flex gap-2"><FileUp size={18}/> Nhập Excel</button>
                </div>
                <div className="bg-white rounded-3xl border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b">
                            <tr><th className="p-4 text-left">Họ tên</th><th className="p-4 text-center">TKB</th><th className="p-4"></th></tr>
                        </thead>
                        <tbody>
                            {data.teachers.map(t => (
                                <tr key={t.id} className="border-b">
                                    <td className="p-4">
                                        <div className="font-bold">{t.name}</div>
                                        <div className="text-xs text-slate-400">{t.subjects}</div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <input type="number" className="w-16 text-center bg-blue-50 rounded" value={t.assignedPeriods} onChange={e => updateData({teachers: data.teachers.map(x => x.id === t.id ? {...x, assignedPeriods: parseFloat(e.target.value)} : x)})}/>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => updateData({teachers: data.teachers.filter(x => x.id !== t.id)})} className="text-slate-300 hover:text-red-500"><Trash2 size={16}/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    // --- CÁC TAB KHÁC ---
    const WeeklyTab = () => (
        <div className="p-8 text-center text-slate-400">
            <CalendarDays size={48} className="mx-auto mb-4 opacity-20"/>
            <p>Tính năng nhập tiết dạy hàng tuần đang được nạp...</p>
            <button onClick={() => setActiveTab('teachers')} className="mt-4 text-blue-600 font-bold">Quay lại Phân công</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b p-4 sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="font-black text-xl text-blue-600">THCS PRO</h1>
                    <nav className="flex gap-2">
                        <button onClick={() => setActiveTab('config')} className={`p-2 rounded-xl ${activeTab === 'config' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}><Settings size={20}/></button>
                        <button onClick={() => setActiveTab('teachers')} className={`p-2 rounded-xl ${activeTab === 'teachers' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}><Users size={20}/></button>
                        <button onClick={() => setActiveTab('weekly')} className={`p-2 rounded-xl ${activeTab === 'weekly' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}><CalendarDays size={20}/></button>
                    </nav>
                </div>
            </header>
            <main className="container mx-auto p-4">
                <div className="bg-white rounded-[2rem] shadow-sm min-h-[500px]">
                    {activeTab === 'config' && <ConfigTab />}
                    {activeTab === 'teachers' && <TeacherTab />}
                    {activeTab === 'weekly' && <WeeklyTab />}
                </div>
            </main>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
