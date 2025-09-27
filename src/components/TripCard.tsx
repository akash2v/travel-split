import React from 'react';
import { Users, IndianRupee, Calendar, MoreVertical, CreditCard as Edit, Trash2, RotateCcw, Play } from 'lucide-react';
import { Trip } from '../types';
import { useState } from 'react';

interface TripCardProps {
  trip: Trip;
  onClick: () => void;
  onDelete: () => void;
  onUpdate: (trip: Trip) => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onClick, onDelete, onUpdate }) => {
  const [showMenu, setShowMenu] = useState(false);
  const totalExpenses = trip.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expensePerPerson = trip.members.length > 0 ? totalExpenses / trip.members.length : 0;

  const handleReactivate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedTrip = { ...trip, isActive: true, updatedAt: new Date().toISOString() };
    onUpdate(updatedTrip);
    setShowMenu(false);
  };

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedTrip = { ...trip, isActive: false, updatedAt: new Date().toISOString() };
    onUpdate(updatedTrip);
    setShowMenu(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${trip.title}"? This action cannot be undone.`)) {
      onDelete();
    }
    setShowMenu(false);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group relative">
      {/* Cover Image */}
      <div 
        onClick={onClick}
        className="h-48 bg-gradient-to-br from-blue-400 to-teal-500 relative overflow-hidden cursor-pointer"
      >
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg';
          }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        
        {/* Status Badge and Menu */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            trip.isActive 
              ? 'bg-green-500/90 text-white' 
              : 'bg-gray-500/90 text-white'
          }`}>
            {trip.isActive ? 'Active' : 'Completed'}
          </span>
          
          {/* Menu Button */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <MoreVertical className="h-4 w-4 text-white" />
            </button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[160px] z-50">
                <button
                  onClick={onClick}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Trip</span>
                </button>
                
                {trip.isActive ? (
                  <button
                    onClick={handleComplete}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Mark Complete</span>
                  </button>
                ) : (
                  <button
                    onClick={handleReactivate}
                    className="w-full px-4 py-2 text-left text-green-600 hover:bg-green-50 flex items-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Reactivate</span>
                  </button>
                )}
                
                <hr className="my-2 border-gray-200" />
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Trip</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 cursor-pointer" onClick={onClick}>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {trip.title}
        </h3>
        
        {trip.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {trip.description}
          </p>
        )}

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>{trip.members.length} members</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(trip.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-orange-600 font-semibold">
              <IndianRupee className="h-4 w-4 mr-1" />
              <span>₹{totalExpenses.toLocaleString()}</span>
              <span className="text-gray-500 text-xs ml-1">total</span>
            </div>
            {trip.members.length > 0 && (
              <div className="text-sm text-gray-600">
                ₹{Math.round(expensePerPerson).toLocaleString()}/person
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((trip.expenses.length / Math.max(trip.members.length * 5, 1)) * 100, 100)}%` }}
            />
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            {trip.expenses.length} expenses added
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;