import React, { useState } from 'react';
import '../css/CustomerModal.css';
import { 
  FiX, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiShoppingBag,
  FiCreditCard,
  FiTruck,
  FiDollarSign,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi';

function CustomerModal({ onClose, onSave, customer = null }) {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    contact: customer?.contact || '',
    location: customer?.location || '',
    status: customer?.status || 'active',
    type: customer?.type || 'retail',
    creditLimit: customer?.creditLimit || 25000,
    preferredPaymentMethod: customer?.preferredPaymentMethod || 'UPI',
    deliverySchedule: customer?.deliverySchedule || 'Weekly',
    notes: customer?.notes || ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Customer name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contact.replace(/\D/g, ''))) {
      newErrors.contact = 'Contact number must be 10 digits';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (formData.creditLimit < 0) {
      newErrors.creditLimit = 'Credit limit cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </h3>
          <button className="icon-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-section">
              <h4>Basic Information</h4>
              
              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FiUser /> Customer Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Enter customer name"
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FiMail /> Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="Enter email address"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FiPhone /> Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className={errors.contact ? 'error' : ''}
                    placeholder="Enter contact number"
                  />
                  {errors.contact && <span className="error-text">{errors.contact}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FiMapPin /> Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={errors.location ? 'error' : ''}
                    placeholder="Enter location"
                  />
                  {errors.location && <span className="error-text">{errors.location}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Business Details</h4>
              
              <div className="form-row two-columns">
                <div className="form-group">
                  <label>
                    <FiCheck /> Customer Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="status-select"
                  >
                    <option value="active">✅ Active</option>
                    <option value="inactive">❌ Inactive</option>
                    <option value="premium">⭐ Premium</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <FiShoppingBag /> Customer Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="retail">Retail</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="institution">Institution</option>
                    <option value="restaurant">Restaurant</option>
                  </select>
                </div>
              </div>

              <div className="form-row two-columns">
                <div className="form-group">
                  <label>
                    <FiCreditCard /> Credit Limit (₹)
                  </label>
                  <input
                    type="number"
                    name="creditLimit"
                    value={formData.creditLimit}
                    onChange={handleChange}
                    className={errors.creditLimit ? 'error' : ''}
                    min="0"
                    step="1000"
                    placeholder="Enter credit limit"
                  />
                  {errors.creditLimit && <span className="error-text">{errors.creditLimit}</span>}
                </div>

                <div className="form-group">
                  <label>
                    <FiDollarSign /> Payment Method
                  </label>
                  <select
                    name="preferredPaymentMethod"
                    value={formData.preferredPaymentMethod}
                    onChange={handleChange}
                  >
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Card">Card</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FiTruck /> Delivery Schedule
                  </label>
                  <select
                    name="deliverySchedule"
                    value={formData.deliverySchedule}
                    onChange={handleChange}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Additional Notes</h4>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Customer Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Add any additional notes about this customer..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              {customer ? 'Update Customer' : 'Add Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerModal;