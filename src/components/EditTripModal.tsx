import React, { useState } from 'react';
import { X, MapPin, FileText, Image, Save } from 'lucide-react';
import { Trip } from '../types';

interface EditTripModalProps {
  trip: Trip;
  onClose: () => void;
  onSubmit: (trip: Trip) => void;
}

const EditTripModal: React.FC<EditTripModalProps> = ({ trip, onClose, onSubmit }) => {
  const [title, setTitle] = useState(trip.title);
  const [description, setDescription] = useState(trip.description);
  const [coverImage, setCoverImage] = useState(trip.coverImage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a trip title');
      return;
    }

    const updatedTrip: Trip = {
      ...trip,
      title: title.trim(),
      description: description.trim(),
      coverImage: coverImage.trim() || 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg',
      updatedAt: new Date().toISOString()
    };

    onSubmit(updatedTrip);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Trip Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Trip Title */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              Trip Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your trip title"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4 mr-2" />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your trip plans..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Image className="h-4 w-4 mr-2" />
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {coverImage && (
              <div className="mt-3">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg';
                  }}
                />
              </div>
            )}
          </div>

          {/* Trip Info */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-medium text-blue-800 mb-2">Trip Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-600">Created:</span>
                <span className="ml-2 text-blue-800">{new Date(trip.createdAt).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-blue-600">Members:</span>
                <span className="ml-2 text-blue-800">{trip.members.length}</span>
              </div>
              <div>
                <span className="text-blue-600">Expenses:</span>
                <span className="ml-2 text-blue-800">{trip.expenses.length}</span>
              </div>
              <div>
                <span className="text-blue-600">Status:</span>
                <span className={`ml-2 font-medium ${trip.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                  {trip.isActive ? 'Active' : 'Completed'}
                </span>
              </div>
            </div>
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
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTripModal;