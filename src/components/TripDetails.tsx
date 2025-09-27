import React, { useState } from 'react';
import { ArrowLeft, Plus, Users, IndianRupee, Receipt, Calculator, User, Calendar, CreditCard as Edit, UserPlus, Settings } from 'lucide-react';
import { Trip, Expense, Member } from '../types';
import ExpenseModal from './ExpenseModal';
import SettlementModal from './SettlementModal';
import EditTripModal from './EditTripModal';
import AddMemberModal from './AddMemberModal';

interface TripDetailsProps {
  trip: Trip;
  onBack: () => void;
  onUpdateTrip: (trip: Trip) => void;
}

const TripDetails: React.FC<TripDetailsProps> = ({ trip, onBack, onUpdateTrip }) => {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showSettlementModal, setShowSettlementModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'expenses' | 'members'>('overview');

  const totalExpenses = trip.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expensePerPerson = trip.members.length > 0 ? totalExpenses / trip.members.length : 0;

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Math.random().toString(36).substr(2, 9)
    };

    const updatedTrip = {
      ...trip,
      expenses: [...trip.expenses, newExpense]
    };

    onUpdateTrip(updatedTrip);
  };

  const handleAddMember = (memberData: { name: string; email?: string }) => {
    const newMember: Member = {
      id: Math.random().toString(36).substr(2, 9),
      name: memberData.name,
      email: memberData.email,
      totalPaid: 0,
      totalOwed: 0
    };

    const updatedTrip = {
      ...trip,
      members: [...trip.members, newMember],
      updatedAt: new Date().toISOString()
    };

    onUpdateTrip(updatedTrip);
  };

  const handleRemoveMember = (memberId: string) => {
    // Check if member has any expenses
    const memberHasExpenses = trip.expenses.some(expense => 
      expense.paidBy === memberId || expense.splitAmong.includes(memberId)
    );

    if (memberHasExpenses) {
      alert('Cannot remove member who has expenses. Please remove their expenses first.');
      return;
    }

    if (window.confirm('Are you sure you want to remove this member?')) {
      const updatedTrip = {
        ...trip,
        members: trip.members.filter(member => member.id !== memberId),
        updatedAt: new Date().toISOString()
      };
      onUpdateTrip(updatedTrip);
    }
  };

  const handleDeleteExpense = (expenseId: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      const updatedTrip = {
        ...trip,
        expenses: trip.expenses.filter(expense => expense.id !== expenseId),
        updatedAt: new Date().toISOString()
      };
      onUpdateTrip(updatedTrip);
    }
  };

  const handleCompleteTrip = () => {
    if (window.confirm('Are you sure you want to mark this trip as completed? You can reactivate it later if needed.')) {
      const updatedTrip = {
        ...trip,
        isActive: false,
        updatedAt: new Date().toISOString()
      };
      onUpdateTrip(updatedTrip);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{trip.title}</h1>
              {trip.isActive && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </span>
              )}
            </div>
            <div className="flex space-x-3">
              {trip.isActive && (
                <>
                  <button
                    onClick={() => setShowAddMemberModal(true)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-200 flex items-center space-x-2"
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>Add Member</span>
                  </button>
                  <button
                    onClick={() => setShowExpenseModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Expense</span>
                  </button>
                </>
              )}
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Edit className="h-5 w-5" />
                <span>Edit Trip</span>
              </button>
              <button
                onClick={() => setShowSettlementModal(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Calculator className="h-5 w-5" />
                <span>Settlement</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg';
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-2">{trip.title}</h2>
            {trip.description && (
              <p className="text-xl opacity-90">{trip.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-3xl font-bold text-orange-600">₹{totalExpenses.toLocaleString()}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <IndianRupee className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Per Person</p>
                <p className="text-3xl font-bold text-blue-600">₹{Math.round(expensePerPerson).toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Members</p>
                <p className="text-3xl font-bold text-teal-600">{trip.members.length}</p>
              </div>
              <div className="bg-teal-100 p-3 rounded-full">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl p-2 shadow-lg">
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Overview', icon: Receipt },
              { id: 'expenses', label: 'Expenses', icon: IndianRupee },
              { id: 'members', label: 'Members', icon: Users }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Expenses */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Expenses</h3>
              {trip.expenses.length > 0 ? (
                <div className="space-y-4">
                  {trip.expenses.slice(-5).reverse().map(expense => {
                    const payer = trip.members.find(m => m.id === expense.paidBy);
                    return (
                      <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">{expense.description}</p>
                          <p className="text-sm text-gray-600">
                            Paid by {payer?.name} • {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-600">₹{expense.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{expense.category}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No expenses yet</p>
                </div>
              )}
            </div>

            {/* Member Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Member Summary</h3>
              <div className="space-y-4">
                {trip.members.map(member => {
                  const memberExpenses = trip.expenses.filter(e => e.paidBy === member.id);
                  const totalPaid = memberExpenses.reduce((sum, e) => sum + e.amount, 0);
                  const balance = totalPaid - expensePerPerson;
                  
                  return (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">Paid ₹{totalPaid.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${balance > 0 ? 'text-green-600' : balance < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                          {balance > 0 ? '+' : ''}₹{Math.round(balance).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {balance > 0 ? 'Gets back' : balance < 0 ? 'Owes' : 'Settled'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">All Expenses</h3>
              {trip.isActive && (
                <button
                  onClick={() => setShowExpenseModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Expense</span>
                </button>
              )}
            </div>
            
            {trip.expenses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 text-gray-600 font-medium">Description</th>
                      <th className="text-left py-3 text-gray-600 font-medium">Amount</th>
                      <th className="text-left py-3 text-gray-600 font-medium">Paid By</th>
                      <th className="text-left py-3 text-gray-600 font-medium">Category</th>
                      <th className="text-left py-3 text-gray-600 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {trip.expenses.map(expense => {
                      const payer = trip.members.find(m => m.id === expense.paidBy);
                      return (
                        <tr key={expense.id} className="hover:bg-gray-50">
                          <td className="py-4 font-medium text-gray-900">{expense.description}</td>
                          <td className="py-4 font-bold text-orange-600">₹{expense.amount.toLocaleString()}</td>
                          <td className="py-4 text-gray-600">{payer?.name}</td>
                          <td className="py-4">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              {expense.category}
                            </span>
                          </td>
                          <td className="py-4 text-gray-600">{new Date(expense.date).toLocaleDateString()}</td>
                          <td className="py-4">
                            {trip.isActive && (
                              <button
                                onClick={() => handleDeleteExpense(expense.id)}
                                className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                title="Delete expense"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Receipt className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl mb-2">No expenses yet</p>
                <p className="mb-6">Start tracking your trip expenses</p>
                {trip.isActive && (
                  <button
                    onClick={() => setShowExpenseModal(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
                  >
                    Add First Expense
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'members' && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Trip Members</h3>
              {trip.isActive && (
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Add Member</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trip.members.map(member => {
                const memberExpenses = trip.expenses.filter(e => e.paidBy === member.id);
                const totalPaid = memberExpenses.reduce((sum, e) => sum + e.amount, 0);
                const balance = totalPaid - expensePerPerson;
                
                return (
                  <div key={member.id} className="bg-gray-50 rounded-2xl p-6 text-center relative group">
                    {trip.isActive && trip.members.length > 1 && (
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-600 hover:text-red-800"
                        title="Remove member"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h4>
                    {member.email && (
                      <p className="text-sm text-gray-500 mb-3">{member.email}</p>
                    )}
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-600">Total Paid</p>
                        <p className="text-xl font-bold text-orange-600">₹{totalPaid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Balance</p>
                        <p className={`text-lg font-bold ${balance > 0 ? 'text-green-600' : balance < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                          {balance > 0 ? '+' : ''}₹{Math.round(balance).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">
                          {memberExpenses.length} expense{memberExpenses.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Complete Trip Button */}
        {trip.isActive && (
          <div className="text-center mt-12">
            <button
              onClick={handleCompleteTrip}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Complete Trip
            </button>
            <p className="text-sm text-gray-500 mt-2">This will mark the trip as completed and prevent new expenses</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showExpenseModal && (
        <ExpenseModal
          trip={trip}
          onClose={() => setShowExpenseModal(false)}
          onSubmit={handleAddExpense}
        />
      )}

      {showSettlementModal && (
        <SettlementModal
          trip={trip}
          onClose={() => setShowSettlementModal(false)}
        />
      )}

      {showEditModal && (
        <EditTripModal
          trip={trip}
          onClose={() => setShowEditModal(false)}
          onSubmit={onUpdateTrip}
        />
      )}

      {showAddMemberModal && (
        <AddMemberModal
          onClose={() => setShowAddMemberModal(false)}
          onSubmit={handleAddMember}
          existingMembers={trip.members}
        />
      )}
    </div>
  );
};

export default TripDetails;