import React, { useState, useEffect, useMemo } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import Papa from 'papaparse';
import { Upload, Wallet, PiggyBank, AlertCircle, Trash2, Coins, TrendingUp, Sparkles, Moon, Star } from 'lucide-react';
import { type Transaction, INITIAL_TRANSACTIONS, INITIAL_LIMITS } from './types/finance';
import { AddTransactionModal } from './components/AddTransactionModel';


const COLORS = ['#A855F7', '#10B981', '#F59E0B', '#F43F5E', '#3B82F6'];

// Ca
const CATEGORY_COLORS: Record<Transaction['category'], { bg: string; text: string; border: string }> = {
  'Rent & Utilities': { bg: 'bg-purple-950/60', text: 'text-purple-300', border: 'border-purple-500/30' },
  'Meal Plans': { bg: 'bg-emerald-950/60', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  'Subscriptions': { bg: 'bg-amber-950/60', text: 'text-amber-300', border: 'border-amber-500/30' },
  'Entertainment': { bg: 'bg-rose-950/60', text: 'text-rose-300', border: 'border-rose-500/30' },
  'Other': { bg: 'bg-blue-950/60', text: 'text-blue-300', border: 'border-blue-500/30' },
};

export function Dashboard() {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [targetGoal, setTargetGoal] = useState<number>(1000);
  const [monthlySavings, setMonthlySavings] = useState<number>(150);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const saved = localStorage.getItem('student_transactions');
    if (saved) {
      try {
        setTransactions(JSON.parse(saved));
      } catch {
        setTransactions(INITIAL_TRANSACTIONS);
      }
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('student_transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData: Transaction[] = results.data.map((row: any, index) => ({
          id: `csv-${Date.now()}-${index}`,
          date: row.Date || new Date().toISOString().split('T')[0],
          category: (row.Category as Transaction['category']) || 'Other',
          amount: parseFloat(row.Amount) || 0,
          description: row.Description || 'Imported Expense',
        }));
        setTransactions((prev) => [...parsedData, ...prev]);
      },
    });
  };

  const handleAddTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTransactions = useMemo(() => {
    if (selectedCategory === 'All') return transactions;
    return transactions.filter((t) => t.category === selectedCategory);
  }, [transactions, selectedCategory]);

  const categoryData = useMemo(() => {
    const totals: Record<string, number> = {};
    transactions.forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const limitComparisonData = useMemo(() => {
    return INITIAL_LIMITS.map((item) => {
      const spent = transactions
        .filter((t) => t.category === item.category)
        .reduce((acc, t) => acc + t.amount, 0);
      return {
        category: item.category,
        Spent: spent,
        Limit: item.limit,
      };
    });
  }, [transactions]);

  const totalSpent = useMemo(() => {
    return transactions.reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  const monthsToGoal = monthlySavings > 0 ? Math.ceil(targetGoal / monthlySavings) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 relative overflow-hidden font-sans">
      
      {/* Starry Night Canvas Elements */}
      <div className="absolute top-10 left-12 text-amber-200/40 animate-pulse"><Star size={12} /></div>
      <div className="absolute top-28 right-24 text-indigo-300/30 animate-ping"><Star size={8} /></div>
      <div className="absolute top-1/2 left-1/3 text-violet-300/20"><Star size={14} /></div>
      <div className="absolute bottom-20 right-1/4 text-amber-200/30 animate-pulse"><Star size={10} /></div>
      <div className="absolute top-1/4 right-10 text-cyan-200/30"><Moon size={28} /></div>

      {/* Cosmic Nebulae Backdrops */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-900/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-indigo-900/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Header with Glassmorphism */}
        <header className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800/80 gap-4 bg-slate-900/60 backdrop-blur-xl p-5 rounded-2xl border shadow-2xl shadow-indigo-950/50">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-linear-to-tr from-purple-600 via-indigo-600 to-cyan-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <Coins size={28} className="animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black bg-linear-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                  UniWallet
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-950 border border-purple-500/40 text-purple-300 rounded-full flex items-center gap-1 shadow-inner">
                  <Sparkles size={10} /> STARRY NIGHT
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Welcome back, {user?.firstName || 'Stargazer'}!
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <AddTransactionModal onAdd={handleAddTransaction} />

            <label className="flex items-center gap-2 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-600/30 cursor-pointer transition">
              <Upload size={18} />
              <span>Import CSV</span>
              <input type="file" accept=".csv" onChange={handleCSVUpload} className="hidden" />
            </label>

            <div className="pl-2 border-l border-slate-800">
              <UserButton />
            </div>
          </div>
        </header>

        {/* Glowing Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-purple-500/30 text-white p-6 rounded-2xl shadow-xl shadow-purple-950/30 flex items-center justify-between relative overflow-hidden backdrop-blur-md">
            <div className="space-y-1 relative z-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">Total Spent</p>
              <h2 className="text-3xl font-black text-slate-100">${totalSpent.toFixed(2)}</h2>
            </div>
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 backdrop-blur-md rounded-2xl text-purple-400 relative z-10">
              <Wallet size={32} />
            </div>
            <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-purple-600/20 rounded-full blur-2xl"></div>
          </div>

          <div className="bg-slate-900/80 border border-emerald-500/30 text-white p-6 rounded-2xl shadow-xl shadow-emerald-950/30 flex items-center justify-between relative overflow-hidden backdrop-blur-md">
            <div className="space-y-1 relative z-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Savings Goal (${targetGoal})</p>
              <h2 className="text-3xl font-black text-slate-100">{monthsToGoal} Months Left</h2>
            </div>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md rounded-2xl text-emerald-400 relative z-10">
              <PiggyBank size={32} />
            </div>
            <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-emerald-600/20 rounded-full blur-2xl"></div>
          </div>

          <div className="bg-slate-900/80 border border-amber-500/30 text-white p-6 rounded-2xl shadow-xl shadow-amber-950/30 flex items-center justify-between relative overflow-hidden backdrop-blur-md">
            <div className="space-y-1 relative z-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Active Subscriptions</p>
              <h2 className="text-3xl font-black text-slate-100">
                ${transactions.filter(t => t.category === 'Subscriptions').reduce((a, b) => a + b.amount, 0).toFixed(2)}
              </h2>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 backdrop-blur-md rounded-2xl text-amber-400 relative z-10">
              <AlertCircle size={32} />
            </div>
            <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-amber-600/20 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Dark Mode Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/70 p-6 rounded-2xl shadow-xl border border-slate-800 backdrop-blur-md">
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-purple-400" /> Spending Breakdown
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label>
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
                    formatter={(value) => `$${Number(value ?? 0).toFixed(2)}`} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900/70 p-6 rounded-2xl shadow-xl border border-slate-800 backdrop-blur-md">
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-emerald-400" /> Category Budget Limits
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={limitComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis tick={{ fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
                    formatter={(value) => `$${Number(value ?? 0)}`} 
                  />
                  <Legend />
                  <Bar dataKey="Spent" fill="#A855F7" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Limit" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Savings Calculator */}
          <div className="bg-slate-900/70 p-6 rounded-2xl shadow-xl border border-slate-800 backdrop-blur-md space-y-4">
            <h3 className="text-lg font-bold text-slate-200">Savings Goal Calculator</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Target Savings ($)</label>
              <input 
                type="number" 
                value={targetGoal} 
                onChange={(e) => setTargetGoal(Number(e.target.value))}
                className="w-full border border-slate-800 bg-slate-950 rounded-xl p-3 text-slate-100 focus:ring-2 focus:ring-purple-500 outline-none transition font-semibold" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Monthly Contribution ($)</label>
              <input 
                type="number" 
                value={monthlySavings} 
                onChange={(e) => setMonthlySavings(Number(e.target.value))}
                className="w-full border border-slate-800 bg-slate-950 rounded-xl p-3 text-slate-100 focus:ring-2 focus:ring-purple-500 outline-none transition font-semibold" 
              />
            </div>
          </div>

          {/* Recent Expenses Dark Table */}
          <div className="lg:col-span-2 bg-slate-900/70 p-6 rounded-2xl shadow-xl border border-slate-800 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h3 className="text-lg font-bold text-slate-200">Recent Expenses</h3>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Subscriptions', 'Meal Plans', 'Rent & Utilities'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                      selectedCategory === cat
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="pb-3">Description</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-right">Amount</th>
                    <th className="pb-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {filteredTransactions.map((t) => {
                    const badge = CATEGORY_COLORS[t.category] || CATEGORY_COLORS['Other'];
                    return (
                      <tr key={t.id} className="hover:bg-slate-800/40 transition">
                        <td className="py-3 font-semibold text-slate-200">{t.description}</td>
                        <td className="py-3">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                            {t.category}
                          </span>
                        </td>
                        <td className="py-3 text-slate-500 text-xs">{t.date}</td>
                        <td className="py-3 text-right font-bold text-slate-100">${t.amount.toFixed(2)}</td>
                        <td className="py-3 text-center">
                          <button
                            onClick={() => handleDeleteTransaction(t.id)}
                            className="text-slate-500 hover:text-rose-400 transition p-1 rounded-3xl"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}