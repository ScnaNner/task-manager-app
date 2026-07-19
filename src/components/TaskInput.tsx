import React, { useState } from 'react';

interface TaskInputProps {
  onAddTask: (title: string, priority: 'düşük' | 'orta' | 'yüksek', deadline: string) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<'düşük' | 'orta' | 'yüksek'>('orta');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddTask(inputValue.trim(), priority, deadline);
    setInputValue('');
    setPriority('orta');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-5 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm flex flex-col gap-4 transition-colors">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-5 h-5 text-indigo-400 dark:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Bugün neler yapacaksın?"
          className="w-full py-3 pl-12 pr-4 text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'düşük' | 'orta' | 'yüksek')}
            className="flex-1 sm:flex-none py-2 px-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm font-medium cursor-pointer transition-colors"
          >
            <option value="düşük">🟢 Düşük Öncelik</option>
            <option value="orta">🟡 Orta Öncelik</option>
            <option value="yüksek">🔴 Yüksek Öncelik</option>
          </select>
          
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="flex-1 sm:flex-none py-2 px-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm cursor-pointer transition-colors [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>
        
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition-transform active:scale-95 shadow-md shadow-indigo-200 dark:shadow-none"
        >
          Ekle
        </button>
      </div>
    </form>
  );
}