import React, { useState } from 'react';
import { Plus, MapPin, Users, IndianRupee, Calendar, Heart } from 'lucide-react';
import { Trip } from '../types';
import TravelPlanModal from './TravelPlanModal';
import TripCard from './TripCard';

interface DashboardProps {
  trips: Trip[];
  onCreateTrip: (trip: Omit<Trip, 'id'>) => void;
  onSelectTrip: (trip: Trip) => void;
  onDeleteTrip: (tripId: string) => void;
  onUpdateTrip: (trip: Trip) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ trips, onCreateTrip, onSelectTrip, onDeleteTrip, onUpdateTrip }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const activeTrips = trips.filter(trip => trip.isActive);
  const completedTrips = trips.filter(trip => !trip.isActive);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <MapPin className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">TravelSplit</h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              <span>Plan Travel</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Manage Your Travel Expenses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Split costs, track expenses, and settle payments with your travel companions effortlessly
          </p>
        </div>

        {/* Quick Stats */}
        {trips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Trips</p>
                  <p className="text-3xl font-bold text-blue-600">{activeTrips.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Members</p>
                  <p className="text-3xl font-bold text-teal-600">
                    {trips.reduce((acc, trip) => acc + trip.members.length, 0)}
                  </p>
                </div>
                <div className="bg-teal-100 p-3 rounded-full">
                  <Users className="h-8 w-8 text-teal-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                  <p className="text-3xl font-bold text-orange-600">
                    ₹{trips.reduce((acc, trip) => acc + trip.expenses.reduce((expAcc, exp) => expAcc + exp.amount, 0), 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <IndianRupee className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Trips */}
        {activeTrips.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-blue-600" />
              Active Trips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTrips.map(trip => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  onClick={() => onSelectTrip(trip)} 
                  onDelete={() => onDeleteTrip(trip.id)}
                  onUpdate={onUpdateTrip}
                />
              ))}
            </div>
          </section>
        )}

        {/* Completed Trips */}
        {completedTrips.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Completed Trips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedTrips.map(trip => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  onClick={() => onSelectTrip(trip)} 
                  onDelete={() => onDeleteTrip(trip.id)}
                  onUpdate={onUpdateTrip}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {trips.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl p-12 max-w-md mx-auto shadow-xl">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No trips yet</h3>
              <p className="text-gray-600 mb-8">
                Start planning your first trip and manage expenses with your travel companions
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Plan Your First Trip
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer with Skytup Credit */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-gray-600 flex items-center justify-center space-x-2">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by</span>
              <span className="font-bold text-blue-600">Skytup</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Professional Travel Expense Management Solutions
            </p>
          </div>
        </div>
      </footer>

      {/* Create Trip Modal */}
      {showCreateModal && (
        <TravelPlanModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={onCreateTrip}
        />
      )}
    </div>
  );
};

export default Dashboard;