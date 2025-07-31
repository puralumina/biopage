// src/components/admin/LinkItem.tsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link as LinkType } from '../../types/pageTypes';
import { GripVertical, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

interface LinkItemProps {
  link: LinkType;
  onEdit: (link: LinkType) => void;
  onDelete: (id: string) => void;
}

const LinkItem: React.FC<LinkItemProps> = ({ link, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200"
    >
      <button {...attributes} {...listeners} className="cursor-grab text-gray-400 mr-3">
        <GripVertical size={20} />
      </button>
      
      {link.thumbnailUrl ? (
        <img src={link.thumbnailUrl} alt="thumbnail" className="w-10 h-10 rounded-md object-cover mr-4" />
      ) : (
        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center mr-4">
            <ImageIcon size={20} className="text-gray-400" />
        </div>
      )}

      <div className="flex-grow">
        <p className="font-medium text-gray-800">{link.title}</p>
        <p className="text-sm text-gray-500 truncate">{link.url}</p>
      </div>

      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full mx-4 capitalize">
        {link.type.replace(/([A-Z])/g, ' $1')}
      </span>
      
      <div className="flex items-center space-x-2">
        <button onClick={() => onEdit(link)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-md">
          <Edit size={16} />
        </button>
        <button onClick={() => onDelete(link.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-md">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default LinkItem;