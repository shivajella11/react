import React, { useState } from 'react';
import '../css/BulkActions.css';
import { 
  FiTrash2, 
  FiCheck, 
  FiX, 
  FiMessageSquare,
  FiLoader
} from 'react-icons/fi';

function BulkActions({ selectedCount, onBulkAction, loading }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionType, setActionType] = useState('');

  const handleAction = (action) => {
    if (action === 'delete') {
      setActionType('delete');
      setShowConfirmation(true);
    } else {
      onBulkAction(action);
    }
  };

  const confirmAction = () => {
    onBulkAction(actionType);
    setShowConfirmation(false);
    setActionType('');
  };

  const cancelAction = () => {
    setShowConfirmation(false);
    setActionType('');
  };

  if (showConfirmation) {
    return (
      <div className="bulk-actions-container confirmation">
        <div className="confirmation-content">
          <div className="confirmation-message">
            <FiTrash2 className="warning-icon" />
            <div>
              <h4>Confirm Deletion</h4>
              <p>Are you sure you want to delete {selectedCount} selected customer(s)? This action cannot be undone.</p>
            </div>
          </div>
          <div className="confirmation-actions">
            <button className="secondary-btn" onClick={cancelAction}>
              <FiX /> Cancel
            </button>
            <button className="danger-btn" onClick={confirmAction}>
              <FiTrash2 /> Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bulk-actions-container">
      <div className="bulk-actions-content">
        <div className="selection-info">
          <span className="selected-count">
            {selectedCount} customer{selectedCount > 1 ? 's' : ''} selected
          </span>
        </div>
        
        <div className="bulk-actions-buttons">
          <button 
            className="bulk-action-btn activate"
            onClick={() => handleAction('activate')}
            disabled={loading}
            title="Activate selected customers"
          >
            {loading ? <FiLoader className="spinning" /> : <FiCheck />}
            Activate
          </button>
          
          <button 
            className="bulk-action-btn deactivate"
            onClick={() => handleAction('deactivate')}
            disabled={loading}
            title="Deactivate selected customers"
          >
            {loading ? <FiLoader className="spinning" /> : <FiX />}
            Deactivate
          </button>
          
          <button 
            className="bulk-action-btn message"
            onClick={() => handleAction('message')}
            disabled={loading}
            title="Send message to selected customers"
          >
            {loading ? <FiLoader className="spinning" /> : <FiMessageSquare />}
            Message
          </button>
          
          <button 
            className="bulk-action-btn delete"
            onClick={() => handleAction('delete')}
            disabled={loading}
            title="Delete selected customers"
          >
            {loading ? <FiLoader className="spinning" /> : <FiTrash2 />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BulkActions;