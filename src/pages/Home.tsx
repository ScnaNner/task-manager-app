import { useState, useEffect } from 'react';
import { Task } from '../interfaces/Task';
import TaskInput from '../components/TaskInput';
import TaskItem from '../components/TaskItem';

export default function Home() {
  // Görevler State'i
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Dark Mode State'i
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Tema değiştiğinde HTML'e sınıf ekle/çıkar ve kaydet
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Görevler değiştiğinde kaydet
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (title: string, priority: 'düşük' | 'orta' | 'yüksek', deadline: string) => {
    const date = new Date();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title,
      isCompleted: false,
      createdAt: date.toLocaleDateString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      priority: priority,
      deadline: deadline ? deadline : undefined,
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 p-8 transition-colors">
        
        {/* Header Kısmı */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Görevlerim</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {totalCount > 0 ? `${totalCount} görevden ${completedCount} tanesi tamamlandı` : 'Bugün harika bir gün!'}
            </p>
          </div>
          
          <div className="flex gap-3">
            {/* Tema Değiştirme Butonu */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={isDarkMode ? "Aydınlık Moda Geç" : "Karanlık Moda Geç"}
            >
              {isDarkMode ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              )}
            </button>

            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Ekleme Formu */}
        <TaskInput onAddTask={handleAddTask} />

        {/* Liste */}
        <ul className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {tasks.length === 0 ? (
            <div className="text-center py-16 px-6">
              <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <svg className="w-12 h-12 text-indigo-300 dark:text-indigo-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Henüz görev yok</h3>
              <p className="text-slate-500 dark:text-slate-500 mt-2">Yeni bir şeyler ekleyerek gününü planlamaya başla.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}