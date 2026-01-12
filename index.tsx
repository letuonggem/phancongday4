
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { 
    LayoutDashboard, Users, CalendarDays, FileText, Save, Settings, 
    Plus, Trash2, Edit3, Check, X, FileUp, Download, 
    ChevronLeft, ChevronRight, CheckCircle2, Copy, RefreshCw,
    BookOpen, GraduationCap, TrendingUp, CalendarRange, ShieldCheck
} from 'lucide-react';

// --- CẤU HÌNH & TYPES ---
const STORAGE_KEY = 'thcs_teaching_mgmt_v2_pro';
const INITIAL_ROLES = [
    { id: '1', name: 'Tổ trưởng', reduction: 3 },
    { id: '2', name: 'Chủ nhiệm', reduction: 4 },
    { id: '3', name: 'Thư ký hội đồng', reduction: 2 },
    { id: '4', name: 'Tổ phó', reduction: 1 },
    { id: '5', name: 'Tổng phụ trách', reduction: 10 }
];

// --- COMPONENT CON: CẤU HÌNH ---
const ConfigTab = ({ data, updateData }) => {
    const [newRole, setNewRole] = useState({ name: '', reduction: 0 });
    const [editingId, setEditingId] = useState(null);
    const [editRole, setEditRole] = useState(null);

    return (
        <div className="p-4 md:p-8 animate-fadeIn">
            <h2 className="text-2xl font-black mb-6 text-slate-800">Cấu hình Hệ thống</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Định mức chuẩn (Tiết/Tuần)</label>
                        <input
                            type="number"
                            value={data.standardQuota}
                            onChange={(e) => updateData({ standardQuota: parseInt(e.target.value) || 0 })}
                            className="w-full text-3xl font-black text-blue-600 focus:outline-none"
                        />
                        <p className="text-xs text-slate-400 mt-2 italic">* THCS thông thường là 19 tiết.</p>
                    </div>
                    <div className="bg-blue-600 p-6 rounded-3xl shadow-lg text-white">
                        <h4 className="font-bold mb-2 flex items-center gap-2"><ShieldCheck size={18}/> Bảo mật dữ liệu</h4>
                        <p className="text-xs opacity-80 leading-relaxed">Dữ liệu lưu tại trình duyệt này. Hãy xuất file "Sao lưu" thường xuyên.</p>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Chức vụ</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 text-center">Giảm trừ</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.roles.map(role => (
                                <tr key={role.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        {editingId === role.id ? (
                                            <input className="w-full p-2 border border-blue-200 rounded-lg outline-none" value={editRole?.name} onChange={e => setEditRole({...editRole, name: e.target.value})} />
                                        ) : <span className="font-bold text-slate-700">{role.name}</span>}
                                    </td>
                                    <td className="px-6 py-4 text-center font-black text-blue-600">
                                        {editingId === role.id ? (
                                            <input type="number" className="w-20 p-2 border border-blue-200 rounded-lg outline-none text-center" value={editRole?.reduction} onChange={e => setEditRole({...editRole, reduction: parseInt(e.target.value)||0})} />
                                        ) : <span>{role.reduction} tiết</span>}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {editingId === role.id ? (
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => { updateData({ roles: data.roles.map(r => r.id === editRole.id ? editRole : r) }); setEditingId(null); }} className="p-2 bg-green-500 text-white rounded-lg"><Check size={16}/></button>
                                                <button onClick={() => setEditingId(null)} className="p-2 bg-slate-200 text-slate-600 rounded-lg"><X size={16}/></button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => {setEditingId(role.id); setEditRole({...role});}} className="text-slate-300 hover:text-blue-600"><Edit3 size={16}/></button>
                                                <button onClick={() => updateData({roles: data.roles.filter(r => r.id !== role.id)})} className="text-slate-300 hover:text-red-500"><Trash2 size={16}/></button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-slate-50/30">
                                <td className="px-6 py-4"><input placeholder="Tên chức vụ mới..." className="w-full p-2 border border-slate-200 rounded-lg text-sm" value={newRole.name} onChange={e => setNewRole({...newRole, name: e.target.value})} /></td>
                                <td className="px-6 py-4 text-center"><input type="number" className="w-20 p-2 border border-slate-200 rounded-lg text-sm text-center" value={newRole.reduction} onChange={e => setNewRole({...newRole, reduction: parseInt(e.target.value)||0})} /></td>
                                <td className="px-6 py-4 text-right"><button onClick={() => { if(!newRole.name) return; updateData({ roles: [...data.roles, {id: Date.now().toString(), ...newRole}] }); setNewRole({name:'', reduction:0}); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm">Thêm</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- COMPONENT CON: GIÁO VIÊN ---
const TeacherTab = ({ data, updateData }) => {
    const fileInputRef = useRef(null);
    const handleExcelImport = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const wb = (window as any).XLSX.read(event.target.result, { type: 'binary' });
            const rows = (window as any).XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            const newTeachers = rows.map((row, idx) => {
                const find = (ks) => {
                    const k = Object.keys(row).find(x => ks.includes(x.toLowerCase().trim()));
                    return k ? row[k] : '';
                };
                return {
                    id: (Date.now() + idx).toString(),
                    name: find(['tengv', 'ho ten', 'họ tên', 'tên gv']) || 'Chưa đặt tên',
                    roles: (find(['chucvu', 'chức vụ'])?.toString() || '').split(',').map(s => s.trim()).filter(s => s),
                    subjects: find(['monday', 'môn dạy']) || '',
                    classes: find(['caclopday', 'lớp dạy']) || '',
                    assignedPeriods: parseFloat(find(['dinhmuttietmon', 'tiết tkb', 'số tiết'])) || 0
                };
            });
            updateData({ teachers: [...data.teachers, ...newTeachers] });
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div className="p-4 md:p-8 animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-800">Danh sách Giáo viên</h2>
                    <p className="text-sm text-slate-400">Quản lý định mức và tiết dạy TKB</p>
                </div>
                <div className="flex gap-2">
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleExcelImport} />
                    <button onClick={() => fileInputRef.current.click()} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-emerald-700 transition-all shadow-md"><FileUp size={20}/> Nhập Excel</button>
                </div>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400">Họ tên / Môn</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 text-center">Định mức</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 text-center w-32">Tiết TKB</th>
                            <th className="px-6 py-5"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.teachers.map(t => {
                            const reduction = t.roles.reduce((s, rN) => s + (data.roles.find(r => r.name === rN)?.reduction || 0), 0);
                            const actualQuota = Math.max(0, data.standardQuota - reduction);
                            return (
                                <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800">{t.name}</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase">{t.subjects} | {t.classes}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-black text-slate-500">{actualQuota}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <input 
                                            type="number" step="0.5" 
                                            className="w-full text-center p-2 bg-blue-50 border border-blue-100 rounded-xl font-black text-blue-700" 
                                            value={t.assignedPeriods} 
                                            onChange={e => updateData({ teachers: data.teachers.map(x => x.id === t.id ? {...x, assignedPeriods: parseFloat(e.target.value)||0} : x)})}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => updateData({ teachers: data.teachers.filter(x => x.id !== t.id)})} className="text-slate-200 hover:text-red-500"><Trash2 size={16}/></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {data.teachers.length === 0 && <div className="p-20 text-center text-slate-300 italic">Chưa có dữ liệu. Hãy nhập từ Excel.</div>}
            </div>
        </div>
    );
};

// --- COMPONENT CON: THEO DÕI TUẦN ---
const WeeklyTab = ({ data, updateData }) => {
    const [currentWeek, setCurrentWeek] = useState(1);
    const [editingLogs, setEditingLogs] = useState({});
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setEditingLogs(data.weeklyData[currentWeek] || {});
        setIsDirty(false);
    }, [currentWeek, data.weeklyData]);

    return (
        <div className="p-4 md:p-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                <h2 className="text-2xl font-black text-slate-800">Nhập Tiết Thực dạy</h2>
                <div className="flex items-center gap-4 bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm">
                    <button onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}><ChevronLeft className="text-slate-400 hover:text-blue-600"/></button>
                    <div className="text-center min-w-[100px]">
                        <span className="text-xl font-black text-slate-800">Tuần {currentWeek}</span>
                    </div>
                    <button onClick={() => setCurrentWeek(currentWeek + 1)}><ChevronRight className="text-slate-400 hover:text-blue-600"/></button>
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                <button onClick={() => {
                    const copy = {}; data.teachers.forEach(t => copy[t.id] = t.assignedPeriods);
                    setEditingLogs(copy); setIsDirty(true);
                }} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm"><RefreshCw size={14} className="inline mr-1"/> Lấy từ TKB</button>
                <button onClick={() => {
                    updateData({ weeklyData: { ...data.weeklyData, [currentWeek]: editingLogs } });
                    setIsDirty(false);
                    alert("Đã lưu Tuần " + currentWeek);
                }} disabled={!isDirty} className={`px-8 py-2 rounded-xl font-black text-sm ml-auto transition-all ${isDirty ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-300'}`}>LƯU TUẦN {currentWeek}</button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400">Giáo viên</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 text-center">TKB</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-blue-600 text-center">Thực dạy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.teachers.map(t => (
                            <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-700">{t.name}</div>
                                    <div className="text-[10px] text-slate-400">{t.subjects}</div>
                                </td>
                                <td className="px-6 py-4 text-center font-bold text-slate-300">{t.assignedPeriods}</td>
                                <td className="px-6 py-4 text-center">
                                    <input 
                                        type="number" step="0.5" 
                                        className="w-24 text-center p-3 bg-blue-50 border border-blue-100 rounded-xl font-black text-2xl text-blue-700"
                                        value={editingLogs[t.id] ?? 0}
                                        onChange={e => { setEditingLogs({...editingLogs, [t.id]: parseFloat(e.target.value)||0}); setIsDirty(true); }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- COMPONENT CON: BÁO CÁO ---
const ReportTab = ({ data }) => {
    const [startWeek, setStartWeek] = useState(1);
    const [endWeek, setEndWeek] = useState(1);

    const stats = useMemo(() => {
        const weeks = endWeek - startWeek + 1;
        if (weeks <= 0) return [];
        return data.teachers.map(t => {
            const reduction = t.roles.reduce((s, rN) => s + (data.roles.find(r => r.name === rN)?.reduction || 0), 0);
            const quotaPerWeek = data.standardQuota - reduction;
            let totalActual = 0;
            for (let w = startWeek; w <= endWeek; w++) totalActual += (data.weeklyData[w]?.[t.id] || 0);
            const totalQuota = quotaPerWeek * weeks;
            return { ...t, totalActual, totalQuota, balance: totalActual - totalQuota };
        });
    }, [data, startWeek, endWeek]);

    return (
        <div className="p-4 md:p-8 animate-fadeIn">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
                <h2 className="text-2xl font-black text-slate-800">Báo cáo Tổng hợp</h2>
                <div className="flex items-center gap-3 bg-slate-900 p-2 rounded-xl">
                    <span className="text-[10px] font-black text-blue-400 uppercase px-2">Từ tuần</span>
                    <input type="number" className="w-16 p-1 rounded font-bold text-center" value={startWeek} onChange={e => setStartWeek(parseInt(e.target.value)||1)} />
                    <span className="text-white">→</span>
                    <input type="number" className="w-16 p-1 rounded font-bold text-center" value={endWeek} onChange={e => setEndWeek(parseInt(e.target.value)||1)} />
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400">Giáo viên</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 text-center">Định mức</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 text-center">Thực dạy</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 text-center">Dôi dư/Thiếu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map(t => (
                            <tr key={t.id} className="border-b border-slate-50">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-700">{t.name}</div>
                                    <div className="text-[10px] text-slate-400">{t.subjects}</div>
                                </td>
                                <td className="px-6 py-4 text-center font-bold text-slate-400">{t.totalQuota.toFixed(1)}</td>
                                <td className="px-6 py-4 text-center font-black text-blue-700 text-xl">{t.totalActual.toFixed(1)}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-4 py-1.5 rounded-full font-black text-xs ${t.balance >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                        {t.balance > 0 ? `+${t.balance.toFixed(1)}` : t.balance.toFixed(1)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- COMPONENT CHÍNH ---
const App = () => {
    const [activeTab, setActiveTab] = useState('teachers');
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : { standardQuota: 19, roles: INITIAL_ROLES, teachers: [], weeklyData: {} };
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    const updateData = (newData) => setData(prev => ({ ...prev, ...newData }));

    const menu = [
        { id: 'config', label: 'Cấu hình', icon: Settings },
        { id: 'teachers', label: 'Phân công', icon: Users },
        { id: 'weekly', label: 'Tiết dạy', icon: CalendarDays },
        { id: 'reports', label: 'Báo cáo', icon: FileText },
    ];

    return (
        <div className="min-h-screen flex flex-col pb-10">
            <header className="glass sticky top-0 z-50 px-4 py-4 border-b border-slate-100 mb-6 shadow-sm">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg"><LayoutDashboard size={24}/></div>
                        <h1 className="text-xl font-black text-slate-800">THCS GIẢNG DẠY PRO</h1>
                    </div>
                    <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
                        {menu.map(item => (
                            <button 
                                key={item.id} onClick={() => setActiveTab(item.id)}
                                className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all text-sm font-bold ${activeTab === item.id ? 'bg-white text-blue-800 shadow-md scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <item.icon size={16}/> <span className="hidden sm:inline">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </header>
            <main className="flex-1 container mx-auto px-4">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 min-h-[500px] overflow-hidden">
                    {activeTab === 'config' && <ConfigTab data={data} updateData={updateData} />}
                    {activeTab === 'teachers' && <TeacherTab data={data} updateData={updateData} />}
                    {activeTab === 'weekly' && <WeeklyTab data={data} updateData={updateData} />}
                    {activeTab === 'reports' && <ReportTab data={data} />}
                </div>
            </main>
            <footer className="p-6 text-center text-gray-400 text-xs font-bold mt-4">
                © {new Date().getFullYear()} THCS GIẢNG DẠY PRO - Toàn bộ dữ liệu lưu tại máy cá nhân.
            </footer>
        </div>
    );
};

// Khởi chạy ứng dụng
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
