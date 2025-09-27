import React, { useState } from 'react';
import { X, UserPlus, Mail, User } from 'lucide-react';
import { Member } from '../types';

interface AddMemberModalProps {
  onClose: () => void;
  onSubmit: (memberData: { name: string; email?: string }) => void;
  existingMembers: Member[];
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ onClose, onSubmit, existingMembers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Please enter a member name');
      return;
    }

    // Check if member already exists
    const memberExists = existingMembers.some(
      member => member.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (memberExists) {
      alert('A member with this name already exists');
      return;
    }

    onSubmit({
      name: name.trim(),
      email: email.trim() || undefined
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-100 p-2 rounded-full">
              <UserPlus className="h-6 w-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Member</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Member Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 mr-2" />
              Member Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter member name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Email (Optional) */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4 mr-2" />
              Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="member@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Existing Members Info */}
          {existingMembers.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-800 mb-2">Current Members ({existingMembers.length})</h4>
              <div className="flex flex-wrap gap-2">
                {existingMembers.map(member => (
                  <span
                    key={member.id}
                    className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 border"
                  >
                    {member.name}
                  </span>
                ))}
              </div>
            </div>
          )}

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
              className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <UserPlus className="h-5 w-5" />
              <span>Add Member</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;