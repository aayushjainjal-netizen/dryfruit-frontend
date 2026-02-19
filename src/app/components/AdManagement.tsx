import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { Advertisement } from './AdvertisementBanner';

interface AdManagementProps {
  ads: Advertisement[];
  onAddAd: (ad: Omit<Advertisement, 'id'>) => void;
  onUpdateAd: (ad: Advertisement) => void;
  onDeleteAd: (adId: string) => void;
}

export function AdManagement({ ads, onAddAd, onUpdateAd, onDeleteAd }: AdManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    ctaText: '',
    ctaLink: '',
    backgroundColor: '#f59e0b',
    textColor: '#ffffff',
    type: 'banner' as 'banner' | 'popup' | 'sidebar',
    active: true,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAd) {
      onUpdateAd({ ...formData, id: editingAd.id });
    } else {
      onAddAd(formData);
    }
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      ctaText: '',
      ctaLink: '',
      backgroundColor: '#f59e0b',
      textColor: '#ffffff',
      type: 'banner',
      active: true,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
    setEditingAd(null);
    setShowForm(false);
  };

  const handleEdit = (ad: Advertisement) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      description: ad.description,
      image: ad.image,
      ctaText: ad.ctaText,
      ctaLink: ad.ctaLink || '',
      backgroundColor: ad.backgroundColor,
      textColor: ad.textColor,
      type: ad.type,
      active: ad.active,
      startDate: ad.startDate,
      endDate: ad.endDate,
    });
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const toggleAdStatus = (ad: Advertisement) => {
    onUpdateAd({ ...ad, active: !ad.active });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl">Advertisement Management</h2>
          <p className="text-sm text-gray-600 mt-1">Manage banners, popups, and promotional content</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="whitespace-nowrap">Create Advertisement</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-amber-200">
          <h3 className="text-xl mb-4">{editingAd ? 'Edit' : 'Create'} Advertisement</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="e.g., Summer Sale 50% OFF"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Advertisement Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="banner">Hero Banner (Main carousel)</option>
                  <option value="popup">Popup (On page load)</option>
                  <option value="sidebar">Sidebar (Small card)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-2">Description *</label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Promotional description"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Image URL *</label>
                <input
                  type="url"
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Call-to-Action Text *</label>
                <input
                  type="text"
                  name="ctaText"
                  required
                  value={formData.ctaText}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="e.g., Shop Now"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Background Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleChange}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.backgroundColor}
                    onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Text Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="textColor"
                    value={formData.textColor}
                    onChange={handleChange}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.textColor}
                    onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Active (Show this advertisement)</span>
                </label>
              </div>
            </div>

            {/* Preview */}
            {formData.image && (
              <div className="border-t pt-4">
                <label className="block text-sm mb-2">Preview</label>
                <div
                  className="relative h-48 rounded-lg overflow-hidden"
                  style={{ backgroundColor: formData.backgroundColor }}
                >
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center p-6">
                    <div>
                      <h3
                        className="text-2xl mb-2"
                        style={{ color: formData.textColor }}
                      >
                        {formData.title || 'Title'}
                      </h3>
                      <p
                        className="mb-3"
                        style={{ color: formData.textColor }}
                      >
                        {formData.description || 'Description'}
                      </p>
                      <span className="inline-block px-4 py-2 bg-amber-600 text-white rounded">
                        {formData.ctaText || 'CTA'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg transition-colors"
              >
                {editingAd ? 'Update' : 'Create'} Advertisement
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ads List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden border-2 ${
              ad.active ? 'border-green-200' : 'border-gray-200'
            }`}
          >
            <div className="relative h-40">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    ad.active
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {ad.active ? 'Active' : 'Inactive'}
                </span>
                <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded capitalize">
                  {ad.type}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-2">{ad.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{ad.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>Start: {new Date(ad.startDate).toLocaleDateString()}</span>
                <span>End: {new Date(ad.endDate).toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleAdStatus(ad)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg transition-colors ${
                    ad.active
                      ? 'border-orange-500 text-orange-600 hover:bg-orange-50'
                      : 'border-green-500 text-green-600 hover:bg-green-50'
                  }`}
                >
                  {ad.active ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Activate
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleEdit(ad)}
                  className="flex items-center gap-2 px-3 py-2 border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete this advertisement?')) {
                      onDeleteAd(ad.id);
                    }
                  }}
                  className="flex items-center gap-2 px-3 py-2 border border-red-500 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {ads.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">No advertisements yet</p>
          <p className="text-sm text-gray-500">Create your first advertisement to get started</p>
        </div>
      )}
    </div>
  );
}