import React, { useState, useEffect } from 'react';
import { Trip } from './types';
import Dashboard from './components/Dashboard';
import TripDetails from './components/TripDetails';

function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  // Load trips from localStorage on component mount
  useEffect(() => {
    const savedTrips = localStorage.getItem('travelSplitTrips');
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    }
  }, []);

  // Save trips to localStorage whenever trips change
  useEffect(() => {
    localStorage.setItem('travelSplitTrips', JSON.stringify(trips));
  }, [trips]);

  const handleCreateTrip = (tripData: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setTrips(prev => [...prev, newTrip]);
  };

  const handleUpdateTrip = (updatedTrip: Trip) => {
    setTrips(prev => prev.map(trip => 
      trip.id === updatedTrip.id ? updatedTrip : trip
    ));
    setSelectedTrip(updatedTrip);
  };

  const handleDeleteTrip = (tripId: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== tripId));
    // If the deleted trip was selected, go back to dashboard
    if (selectedTrip?.id === tripId) {
      setSelectedTrip(null);
    }
  };

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleBackToDashboard = () => {
    setSelectedTrip(null);
  };

  return (
    <div className="App">
      {selectedTrip ? (
        <TripDetails
          trip={selectedTrip}
          onBack={handleBackToDashboard}
          onUpdateTrip={handleUpdateTrip}
        />
      ) : (
        <Dashboard
          trips={trips}
          onCreateTrip={handleCreateTrip}
          onSelectTrip={handleSelectTrip}
          onDeleteTrip={handleDeleteTrip}
          onUpdateTrip={handleUpdateTrip}
        />
      )}
    </div>
  );
}

export default App;