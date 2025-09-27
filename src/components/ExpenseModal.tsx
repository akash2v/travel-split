import React, { useState } from 'react';
import { X, IndianRupee, Tag, Calendar, Trash2 } from 'lucide-react';
import { Trip, Expense } from '../types';

interface ExpenseModalProps {
  trip: Trip;
  onClose: () => void;
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ trip, onClose, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [category, setCategory] = useState('Food');
  const [splitAmong, setSplitAmong] = useState<string[]>([]);

  const categories = [
    'Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Miscellaneous'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !amount || !paidBy) {
      alert('Please fill in all required fields');
      return;
    }

    const expense: Omit<Expense, 'id'> = {
      description: description.trim(),
      amount: parseFloat(amount),
      paidBy,
      category,
      date: new Date().toISOString(),
      splitAmong: splitAmong.length > 0 ? splitAmong : trip.members.map(m => m.id)
    };

    onSubmit(expense);
    onClose();
  };

  const handleSplitToggle = (memberId: string) => {
    setSplitAmong(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <IndianRupee className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Add Expense</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What did you spend on?"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <IndianRupee className="h-4 w-4 mr-2" />
              Amount *
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Paid By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paid By *
            </label>
            <select
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Select member</option>
              {trip.members.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Tag className="h-4 w-4 mr-2" />
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Split Among */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Split Among (default: everyone)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {trip.members.map(member => (
                <label
                  key={member.id}
                  className="flex items-center space-x-3 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={splitAmong.length === 0 || splitAmong.includes(member.id)}
                    onChange={() => handleSplitToggle(member.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{member.name}</span>
                </label>
              ))}
            </div>
            {splitAmong.length === 0 && (
              <p className="text-xs text-gray-500 mt-2">Expense will be split equally among all members</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;