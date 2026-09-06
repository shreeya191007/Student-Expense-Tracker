import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, X } from 'lucide-react';
import type { Transaction } from '../types/finance';

interface Props {
  onAdd: (transaction: Transaction) => void;
}

export function AddTransactionModal({ onAdd }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Transaction['category']>('Other');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: `custom-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      category,
      amount: parseFloat(amount),
      description,
    });

    setDescription('');
    setAmount('');
    setCategory('Other');
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-medium shadow-lg shadow-emerald-600/20 transition cursor-pointer"
      >
        <Plus size={18} />
        <span>Add Expense</span>
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-99999 p-4">
            <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl shadow-2xl w-full max-w-md p-6 relative z-100000">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold text-slate-100 mb-6">Add New Expense</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Campus Bookstore"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-slate-800 bg-slate-950 rounded-xl p-3 text-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-slate-800 bg-slate-950 rounded-xl p-3 text-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Transaction['category'])}
                    className="w-full border border-slate-800 bg-slate-950 rounded-xl p-3 text-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  >
                    <option value="Rent & Utilities">Rent & Utilities</option>
                    <option value="Meal Plans">Meal Plans</option>
                    <option value="Subscriptions">Subscriptions</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition mt-4 shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  Save Transaction
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}