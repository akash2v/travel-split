import React from 'react';
import { X, Calculator, ArrowRight, IndianRupee } from 'lucide-react';
import { Trip, Settlement } from '../types';

interface SettlementModalProps {
  trip: Trip;
  onClose: () => void;
}

const SettlementModal: React.FC<SettlementModalProps> = ({ trip, onClose }) => {
  const calculateSettlements = (): Settlement[] => {
    const totalExpenses = trip.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const expensePerPerson = totalExpenses / trip.members.length;
    
    // Calculate each person's balance
    const balances = trip.members.map(member => {
      const totalPaid = trip.expenses
        .filter(expense => expense.paidBy === member.id)
        .reduce((sum, expense) => sum + expense.amount, 0);
      
      return {
        id: member.id,
        name: member.name,
        balance: totalPaid - expensePerPerson
      };
    });

    // Separate creditors (positive balance) and debtors (negative balance)
    const creditors = balances.filter(b => b.balance > 0).sort((a, b) => b.balance - a.balance);
    const debtors = balances.filter(b => b.balance < 0).sort((a, b) => a.balance - b.balance);
    
    const settlements: Settlement[] = [];
    
    // Create settlements
    let i = 0, j = 0;
    while (i < creditors.length && j < debtors.length) {
      const creditor = creditors[i];
      const debtor = debtors[j];
      
      const settlementAmount = Math.min(creditor.balance, Math.abs(debtor.balance));
      
      if (settlementAmount > 0.01) { // Avoid tiny settlements due to rounding
        settlements.push({
          from: debtor.id,
          to: creditor.id,
          amount: settlementAmount
        });
      }
      
      creditor.balance -= settlementAmount;
      debtor.balance += settlementAmount;
      
      if (creditor.balance <= 0.01) i++;
      if (Math.abs(debtor.balance) <= 0.01) j++;
    }
    
    return settlements;
  };

  const settlements = calculateSettlements();
  const totalExpenses = trip.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expensePerPerson = totalExpenses / trip.members.length;

  const getMemberName = (id: string) => {
    return trip.members.find(m => m.id === id)?.name || 'Unknown';
  };

  const getMemberBalance = (memberId: string) => {
    const totalPaid = trip.expenses
      .filter(expense => expense.paidBy === memberId)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    return totalPaid - expensePerPerson;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-100 p-2 rounded-full">
              <Calculator className="h-6 w-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Settlement Calculator</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Trip Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-orange-600">₹{totalExpenses.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Per Person</p>
                <p className="text-2xl font-bold text-blue-600">₹{Math.round(expensePerPerson).toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-teal-600">{trip.members.length}</p>
              </div>
            </div>
          </div>

          {/* Member Balances */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Individual Balances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trip.members.map(member => {
                const totalPaid = trip.expenses
                  .filter(expense => expense.paidBy === member.id)
                  .reduce((sum, expense) => sum + expense.amount, 0);
                const balance = getMemberBalance(member.id);
                
                return (
                  <div key={member.id} className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">Paid ₹{totalPaid.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          balance > 0 ? 'text-green-600' : balance < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {balance > 0 ? '+' : ''}₹{Math.round(balance).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {balance > 0 ? 'Gets back' : balance < 0 ? 'Owes' : 'Settled'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Settlements */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Required Settlements</h3>
            {settlements.length > 0 ? (
              <div className="space-y-4">
                {settlements.map((settlement, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-white p-3 rounded-full shadow-md">
                          <span className="text-lg font-bold text-gray-900">
                            {getMemberName(settlement.from).charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{getMemberName(settlement.from)}</p>
                          <p className="text-sm text-gray-600">owes money</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">
                            ₹{Math.round(settlement.amount).toLocaleString()}
                          </p>
                        </div>
                        <ArrowRight className="h-6 w-6 text-gray-400" />
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium text-gray-900 text-right">{getMemberName(settlement.to)}</p>
                          <p className="text-sm text-gray-600 text-right">receives money</p>
                        </div>
                        <div className="bg-white p-3 rounded-full shadow-md">
                          <span className="text-lg font-bold text-gray-900">
                            {getMemberName(settlement.to).charAt(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-green-50 rounded-2xl">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-green-800 mb-2">All Settled!</h4>
                <p className="text-green-600">
                  Everyone has paid their fair share. No settlements needed.
                </p>
              </div>
            )}
          </div>

          {/* Instructions */}
          {settlements.length > 0 && (
            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-blue-800 mb-3">How to Settle</h4>
              <ol className="list-decimal list-inside space-y-2 text-blue-700">
                <li>Follow the settlement instructions above in order</li>
                <li>Each person who owes money should pay the specified amount</li>
                <li>Use digital payment apps for easy transfers</li>
                <li>Mark the trip as completed once all settlements are done</li>
              </ol>
            </div>
          )}

          {/* Close Button */}
          <div className="text-center pt-6">
            <button
              onClick={onClose}
              className="bg-teal-600 text-white px-8 py-3 rounded-xl hover:bg-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettlementModal;