import React, { useState } from 'react';
import { X, MapPin, FileText, Image, Users } from 'lucide-react';
import { Trip } from '../types';

interface TravelPlanModalProps {
  onClose: () => void;
  onSubmit: (trip: Omit<Trip, 'id'>) => void;
}

const TravelPlanModal: React.FC<TravelPlanModalProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [memberName, setMemberName] = useState('');
  const [members, setMembers] = useState<string[]>([]);

  const handleAddMember = () => {
    if (memberName.trim() && !members.includes(memberName.trim())) {
      setMembers([...members, memberName.trim()]);
      setMemberName('');
    }
  };

  const handleRemoveMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || members.length === 0) {
      alert('Please fill in the trip title and add at least one member');
      return;
    }

    const tripMembers = members.map(name => ({
      id: Math.random().toString(36).substr(2, 9),
      name,
      email: '',
      totalPaid: 0,
      totalOwed: 0
    }));

    const newTrip: Omit<Trip, 'id'> = {
      title: title.trim(),
      description: description.trim(),
      coverImage: coverImage.trim() || 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg',
      members: tripMembers,
      expenses: [],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSubmit(newTrip);
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
            <h2 className="text-2xl font-bold text-gray-900">Plan New Trip</h2>
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
              placeholder="Enter your trip title (e.g., Goa Adventure 2024)"
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
              placeholder="https://example.com/image.jpg (optional)"
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

          {/* Members */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Users className="h-4 w-4 mr-2" />
              Trip Members *
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Enter member name"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMember())}
              />
              <button
                type="button"
                onClick={handleAddMember}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium"
              >
                Add
              </button>
            </div>

            {/* Members List */}
            {members.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{members.length} member(s) added:</p>
                <div className="flex flex-wrap gap-2">
                  {members.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-full"
                    >
                      <span className="text-sm font-medium text-blue-800">{member}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(index)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
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
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TravelPlanModal;