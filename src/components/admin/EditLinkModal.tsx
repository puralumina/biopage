// src/components/admin/EditLinkModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Link } from '../../types/pageTypes';
import Input from './ui/Input';

interface EditLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: Link | null;
  onSave: (updatedLink: Link) => void;
}

const EditLinkModal: React.FC<EditLinkModalProps> = ({ isOpen, onClose, link, onSave }) => {
  const [editedLink, setEditedLink] = useState<Link | null>(link);

  useEffect(() => {
    // When the link prop changes (i.e., we open the modal for a new link),
    // update the local state.
    setEditedLink(link);
  }, [link]);

  if (!isOpen || !editedLink) return null;

  const handleInputChange = (field: keyof Link, value: string) => {
    setEditedLink(prev => prev ? { ...prev, [field]: value } : null);
  };
  
  const handleSave = () => {
    if (editedLink) {
      onSave(editedLink);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-gray-900">Edit Link</Dialog.Title>
          <div className="mt-4 space-y-4">
            <Input 
              label="Title" 
              id="link-title" 
              value={editedLink.title} 
              onChange={(e) => handleInputChange('title', e.target.value)} 
            />
            <Input 
              label="URL" 
              id="link-url" 
              value={editedLink.url} 
              onChange={(e) => handleInputChange('url', e.target.value)} 
            />
            {/* Show thumbnail only for 'standard' links */}
            {editedLink.type === 'standard' && (
              <Input 
                label="Thumbnail URL (Optional)" 
                id="link-thumbnail" 
                value={editedLink.thumbnailUrl || ''} 
                onChange={(e) => handleInputChange('thumbnailUrl', e.target.value)} 
              />
            )}
            {/* Add more fields here for scheduling, passwords, etc. */}
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditLinkModal;