import React, { useState } from 'react';
import { Plus, GripVertical, Eye, EyeOff, Edit, Trash2, Link as LinkIcon, Video, Music, Image as ImageIcon, MoreHorizontal } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BioData, ContentBlock, ContentBlockType } from '../../types';

interface ContentTabProps {
  bioData: BioData;
  onUpdate: (data: Partial<BioData>) => void;
}

interface SortableItemProps {
  block: ContentBlock;
  onEdit: (block: ContentBlock) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ block, onEdit, onToggle, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const getTypeIcon = (type: ContentBlockType) => {
    switch (type) {
      case 'link': return <LinkIcon className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'music': return <Music className="w-4 h-4" />;
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'carousel': return <ImageIcon className="w-4 h-4" />;
      default: return <MoreHorizontal className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: ContentBlockType) => {
    switch (type) {
      case 'link': return 'Standard Link';
      case 'video': return 'Video Embed';
      case 'music': return 'Music Embed';
      case 'image': return 'Image Banner';
      case 'carousel': return 'Photo Carousel';
      default: return type;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-5 h-5" />
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="text-gray-600">
            {getTypeIcon(block.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">{block.title}</div>
            <div className="text-sm text-gray-500">
              {getTypeLabel(block.type)}
              {block.url && (
                <span className="ml-2 text-xs text-blue-600 truncate block max-w-xs">
                  {block.url}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={block.isActive}
              onChange={() => onToggle(block.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Active
          </label>
          
          <button
            onClick={() => onEdit(block)}
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete(block.id)}
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ContentTab: React.FC<ContentTabProps> = ({ bioData, onUpdate }) => {
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = bioData.content.findIndex(item => item.id === active.id);
      const newIndex = bioData.content.findIndex(item => item.id === over.id);
      
      const newContent = arrayMove(bioData.content, oldIndex, newIndex).map((block, index) => ({
        ...block,
        order: index + 1
      }));

      onUpdate({ content: newContent });
    }
  };

  const handleToggleActive = (id: string) => {
    const newContent = bioData.content.map(block =>
      block.id === id ? { ...block, isActive: !block.isActive } : block
    );
    onUpdate({ content: newContent });
  };

  const handleDeleteBlock = (id: string) => {
    if (window.confirm('Are you sure you want to delete this content block?')) {
      const newContent = bioData.content.filter(block => block.id !== id);
      onUpdate({ content: newContent });
    }
  };

  const handleAddBlock = (type: ContentBlockType) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      title: `New ${type}`,
      url: type === 'link' ? 'https://example.com' : undefined,
      isActive: true,
      isPasswordProtected: false,
      isScheduled: false,
      order: bioData.content.length + 1
    };

    const newContent = [...bioData.content, newBlock];
    onUpdate({ content: newContent });
    setEditingBlock(newBlock);
    setShowAddModal(false);
  };

  const handleSaveBlock = (updatedBlock: ContentBlock) => {
    const newContent = bioData.content.map(block =>
      block.id === updatedBlock.id ? updatedBlock : block
    );
    onUpdate({ content: newContent });
    setEditingBlock(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Links & Content</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={bioData.content.map(block => block.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {bioData.content.map((block) => (
              <SortableItem
                key={block.id}
                block={block}
                onEdit={setEditingBlock}
                onToggle={handleToggleActive}
                onDelete={handleDeleteBlock}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {bioData.content.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-500 mb-4">No content blocks yet</div>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first content block
          </button>
        </div>
      )}

      {/* Add Block Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Content Block</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { type: 'link' as ContentBlockType, label: 'Standard Link', icon: LinkIcon },
                { type: 'video' as ContentBlockType, label: 'Video Embed', icon: Video },
                { type: 'music' as ContentBlockType, label: 'Music Embed', icon: Music },
                { type: 'image' as ContentBlockType, label: 'Image Banner', icon: ImageIcon },
                { type: 'carousel' as ContentBlockType, label: 'Photo Carousel', icon: ImageIcon },
              ].map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => handleAddBlock(type)}
                  className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <Icon className="w-6 h-6 text-gray-600" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Block Modal */}
      {editingBlock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Content Block</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingBlock.title}
                  onChange={(e) => setEditingBlock({ ...editingBlock, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {(editingBlock.type === 'link' || editingBlock.type === 'video' || editingBlock.type === 'music') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                  <input
                    type="url"
                    value={editingBlock.url || ''}
                    onChange={(e) => setEditingBlock({ ...editingBlock, url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              )}

              {editingBlock.type === 'image' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={editingBlock.description || ''}
                      onChange={(e) => setEditingBlock({ ...editingBlock, description: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={editingBlock.thumbnail || ''}
                      onChange={(e) => setEditingBlock({ ...editingBlock, thumbnail: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </>
              )}

              {editingBlock.type === 'music' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Artist</label>
                    <input
                      type="text"
                      value={editingBlock.artist || ''}
                      onChange={(e) => setEditingBlock({ ...editingBlock, artist: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                    <input
                      type="text"
                      value={editingBlock.platform || ''}
                      onChange={(e) => setEditingBlock({ ...editingBlock, platform: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </>
              )}

              {(editingBlock.type === 'video' || editingBlock.type === 'music' || editingBlock.type === 'link') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    value={editingBlock.thumbnail || ''}
                    onChange={(e) => setEditingBlock({ ...editingBlock, thumbnail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              )}

              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingBlock.isPasswordProtected}
                    onChange={(e) => setEditingBlock({ ...editingBlock, isPasswordProtected: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Password Protected</span>
                </label>

                {editingBlock.isPasswordProtected && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      type="text"
                      value={editingBlock.password || ''}
                      onChange={(e) => setEditingBlock({ ...editingBlock, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                )}

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingBlock.isScheduled}
                    onChange={(e) => setEditingBlock({ ...editingBlock, isScheduled: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Scheduled</span>
                </label>

                {editingBlock.isScheduled && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="datetime-local"
                        value={editingBlock.scheduleStart?.toISOString().slice(0, 16) || ''}
                        onChange={(e) => setEditingBlock({ 
                          ...editingBlock, 
                          scheduleStart: e.target.value ? new Date(e.target.value) : undefined 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="datetime-local"
                        value={editingBlock.scheduleEnd?.toISOString().slice(0, 16) || ''}
                        onChange={(e) => setEditingBlock({ 
                          ...editingBlock, 
                          scheduleEnd: e.target.value ? new Date(e.target.value) : undefined 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingBlock(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveBlock(editingBlock)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentTab;