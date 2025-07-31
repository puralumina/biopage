// src/components/admin/LinksTab.tsx
import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import { PageData, Link } from '../../types/pageTypes';
import LinkItem from './LinkItem';
import EditLinkModal from './EditLinkModal';
import { Plus } from 'lucide-react';

interface LinksTabProps {
  data: PageData;
  setData: React.Dispatch<React.SetStateAction<PageData | null>>;
}

const LinksTab: React.FC<LinksTabProps> = ({ data, setData }) => {
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLink = () => {
    if (!data) return;
    const newLink: Link = {
      id: uuidv4(),
      type: 'standard',
      title: 'New Link',
      url: 'https://example.com',
      order: data.links.length,
      active: true,
      thumbnailUrl: '',
    };
    setData(prev => prev ? { ...prev, links: [...prev.links, newLink] } : null);
  };

  const handleOpenEditModal = (link: Link) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLink(null);
  };

  const handleSaveLink = (updatedLink: Link) => {
    setData(prev => {
        if (!prev) return null;
        const newLinks = prev.links.map(l => l.id === updatedLink.id ? updatedLink : l);
        return { ...prev, links: newLinks };
    });
  };

  const handleDeleteLink = (id: string) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
        setData(prev => prev ? { ...prev, links: prev.links.filter(l => l.id !== id) } : null);
    }
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setData(prev => {
        if (!prev) return null;
        const oldIndex = prev.links.findIndex(l => l.id === active.id);
        const newIndex = prev.links.findIndex(l => l.id === over.id);
        const reorderedLinks = arrayMove(prev.links, oldIndex, newIndex);
        // Update order property for persistence
        const finalLinks = reorderedLinks.map((link, index) => ({ ...link, order: index }));
        return { ...prev, links: finalLinks };
      });
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={handleAddLink} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
          <Plus size={16} className="mr-1" />
          Add Link
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={data.links.map(l => l.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {data.links
              .sort((a, b) => a.order - b.order) // Ensure links are sorted by the order property
              .map(link => (
                <LinkItem 
                  key={link.id} 
                  link={link} 
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteLink}
                />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <EditLinkModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        link={editingLink}
        onSave={handleSaveLink}
      />
    </div>
  );
};

export default LinksTab;