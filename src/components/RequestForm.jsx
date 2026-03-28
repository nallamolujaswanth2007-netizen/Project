import { useState } from 'react';

function RequestForm({ onSubmit, isEditing = false, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'it-support',
    priority: initialData.priority || 'medium'
  });

  const [isCustomCategory, setIsCustomCategory] = useState(initialData.category && !['it-support', 'facility', 'maintenance', 'hr', 'finance'].includes(initialData.category));
  const [customCategory, setCustomCategory] = useState(isCustomCategory ? initialData.category : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...formData };
    if (isCustomCategory) {
      submitData.category = customCategory || 'other';
    }
    onSubmit(submitData);
  };

  const handleChange = (e) => {
    if (e.target.name === 'category') {
      if (e.target.value === 'other') {
        setIsCustomCategory(true);
      } else {
        setIsCustomCategory(false);
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="request-form" noValidate>
      <div className="form-group">
        <label htmlFor="title">Request Title *</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          aria-required="true"
          maxLength={100}
          placeholder="Enter request title"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
          aria-required="true"
          placeholder="Describe the issue or request"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={isCustomCategory ? 'other' : formData.category} onChange={handleChange}>
            <option value="it-support">💻 IT Support</option>
            <option value="facility">🏢 Facility</option>
            <option value="maintenance">🔧 Maintenance</option>
            <option value="hr">👥 HR Support</option>
            <option value="finance">💰 Finance</option>
            <option value="other">➕ User Defined (Other)</option>
          </select>
          {isCustomCategory && (
            <input
              type="text"
              name="customCategory"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Type your category here"
              style={{ marginTop: '0.75rem' }}
              required
            />
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>
      </div>

      <button type="submit" className="submit-btn">
        {isEditing ? '🔄 Update Request' : '✅ Create Request'}
      </button>
    </form>
  );
}

export default RequestForm;
