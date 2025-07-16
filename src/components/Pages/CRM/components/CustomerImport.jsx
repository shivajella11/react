import React, { useState, useRef } from 'react';
import '../css/CustomerImport.css';
import { 
  FiUpload, 
  FiX, 
  FiDownload, 
  FiCheck, 
  FiAlertCircle,
  FiFile,
  FiUsers,
  FiRefreshCw
} from 'react-icons/fi';

function CustomerImport({ onImport, onClose }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [importData, setImportData] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [importStatus, setImportStatus] = useState('idle'); // idle, processing, success, error
  const [importProgress, setImportProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }
    
    setFile(selectedFile);
    parseCSV(selectedFile);
  };

  const parseCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const lines = csv.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const data = [];
      const errors = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(',').map(v => v.trim());
          const customer = {};
          
          headers.forEach((header, index) => {
            customer[header.toLowerCase().replace(/\s+/g, '')] = values[index] || '';
          });
          
          // Validate required fields
          const validation = validateCustomer(customer, i + 1);
          if (validation.errors.length > 0) {
            errors.push(...validation.errors);
          }
          
          data.push({
            ...customer,
            rowNumber: i + 1,
            isValid: validation.errors.length === 0
          });
        }
      }
      
      setImportData(data);
      setValidationErrors(errors);
    };
    reader.readAsText(file);
  };

  const validateCustomer = (customer, rowNumber) => {
    const errors = [];
    
    if (!customer.name) {
      errors.push({ row: rowNumber, field: 'name', message: 'Name is required' });
    }
    
    if (!customer.email) {
      errors.push({ row: rowNumber, field: 'email', message: 'Email is required' });
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      errors.push({ row: rowNumber, field: 'email', message: 'Invalid email format' });
    }
    
    if (!customer.contact) {
      errors.push({ row: rowNumber, field: 'contact', message: 'Contact is required' });
    } else if (!/^\d{10}$/.test(customer.contact.replace(/\D/g, ''))) {
      errors.push({ row: rowNumber, field: 'contact', message: 'Invalid contact format' });
    }
    
    if (!customer.location) {
      errors.push({ row: rowNumber, field: 'location', message: 'Location is required' });
    }
    
    return { errors };
  };

  const handleImport = async () => {
    if (validationErrors.length > 0) {
      alert('Please fix validation errors before importing');
      return;
    }
    
    setImportStatus('processing');
    setImportProgress(0);
    
    try {
      const validCustomers = importData.filter(customer => customer.isValid);
      
      // Simulate import progress
      for (let i = 0; i < validCustomers.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setImportProgress(((i + 1) / validCustomers.length) * 100);
      }
      
      // Transform data to match customer structure
      const customersToImport = validCustomers.map(customer => ({
        id: Date.now() + Math.random(),
        name: customer.name,
        email: customer.email,
        contact: customer.contact,
        location: customer.location,
        totalOrders: parseInt(customer.totalorders) || 0,
        totalValue: parseFloat(customer.totalvalue) || 0,
        lastOrderDate: customer.lastorderdate || new Date().toISOString().split('T')[0],
        customerSince: customer.customersince || new Date().toISOString().split('T')[0],
        status: customer.status || 'active',
        type: customer.type || 'retail',
        creditLimit: parseFloat(customer.creditlimit) || 50000,
        outstandingAmount: parseFloat(customer.outstandingamount) || 0,
        preferredPaymentMethod: customer.preferredpaymentmethod || 'Cash',
        deliverySchedule: customer.deliveryschedule || 'Daily',
        averageOrderValue: parseFloat(customer.averageordervalue) || 0,
        feedback: [],
        complaints: [],
        notes: customer.notes || '',
        tags: customer.tags ? customer.tags.split(';') : []
      }));
      
      onImport(customersToImport);
      setImportStatus('success');
      
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      setImportStatus('error');
      console.error('Import error:', error);
    }
  };

  const downloadTemplate = () => {
    const template = `name,email,contact,location,totalOrders,totalValue,lastOrderDate,customerSince,status,type,creditLimit,outstandingAmount,preferredPaymentMethod,deliverySchedule,averageOrderValue,notes,tags
ABC Dairy,contact@abcdairy.com,9876543210,Mumbai,25,125000,2024-01-15,2023-06-01,active,wholesale,100000,15000,Credit,Daily,5000,Regular customer,vip;wholesale
XYZ Restaurant,info@xyzrestaurant.com,9876543211,Delhi,18,89000,2024-01-10,2023-08-15,active,restaurant,75000,8000,Cash,Daily,4944,Good customer,restaurant;regular`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const resetImport = () => {
    setFile(null);
    setImportData([]);
    setValidationErrors([]);
    setImportStatus('idle');
    setImportProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="import-modal-overlay">
      <div className="import-modal-container">
        <div className="import-modal-header">
          <h3>Import Customers</h3>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="import-modal-body">
          {importStatus === 'idle' && (
            <>
              <div className="import-instructions">
                <h4>Import Instructions</h4>
                <ul>
                  <li>Upload a CSV file with customer data</li>
                  <li>Required fields: name, email, contact, location</li>
                  <li>Optional fields: totalOrders, totalValue, status, type, etc.</li>
                  <li>Download the template below for reference</li>
                </ul>
                <button className="template-btn" onClick={downloadTemplate}>
                  <FiDownload /> Download Template
                </button>
              </div>

              <div 
                className={`file-drop-zone ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
                <FiUpload className="upload-icon" />
                <h4>Drop CSV file here or click to browse</h4>
                <p>Supports CSV files up to 10MB</p>
              </div>

              {file && (
                <div className="file-info">
                  <div className="file-details">
                    <FiFile className="file-icon" />
                    <div>
                      <h5>{file.name}</h5>
                      <p>{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button className="remove-file-btn" onClick={resetImport}>
                    <FiX />
                  </button>
                </div>
              )}

              {importData.length > 0 && (
                <div className="import-preview">
                  <div className="preview-header">
                    <h4>Import Preview</h4>
                    <div className="preview-stats">
                      <span className="valid-count">
                        <FiCheck /> {importData.filter(c => c.isValid).length} Valid
                      </span>
                      <span className="error-count">
                        <FiAlertCircle /> {validationErrors.length} Errors
                      </span>
                    </div>
                  </div>

                  {validationErrors.length > 0 && (
                    <div className="validation-errors">
                      <h5>Validation Errors</h5>
                      <div className="error-list">
                        {validationErrors.slice(0, 10).map((error, index) => (
                          <div key={index} className="error-item">
                            <FiAlertCircle />
                            <span>Row {error.row}: {error.message}</span>
                          </div>
                        ))}
                        {validationErrors.length > 10 && (
                          <p className="more-errors">
                            +{validationErrors.length - 10} more errors
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="preview-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Status</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Contact</th>
                          <th>Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        {importData.slice(0, 5).map((customer, index) => (
                          <tr key={index} className={customer.isValid ? 'valid' : 'invalid'}>
                            <td>
                              {customer.isValid ? (
                                <FiCheck className="status-icon valid" />
                              ) : (
                                <FiAlertCircle className="status-icon invalid" />
                              )}
                            </td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.contact}</td>
                            <td>{customer.location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {importData.length > 5 && (
                      <p className="more-rows">+{importData.length - 5} more rows</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {importStatus === 'processing' && (
            <div className="import-processing">
              <div className="processing-icon">
                <FiRefreshCw className="spinning" />
              </div>
              <h4>Importing Customers...</h4>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${importProgress}%` }}
                ></div>
              </div>
              <p>{Math.round(importProgress)}% Complete</p>
            </div>
          )}

          {importStatus === 'success' && (
            <div className="import-success">
              <div className="success-icon">
                <FiCheck />
              </div>
              <h4>Import Successful!</h4>
              <p>{importData.filter(c => c.isValid).length} customers imported successfully</p>
            </div>
          )}

          {importStatus === 'error' && (
            <div className="import-error">
              <div className="error-icon">
                <FiAlertCircle />
              </div>
              <h4>Import Failed</h4>
              <p>There was an error importing your customers. Please try again.</p>
              <button className="retry-btn" onClick={resetImport}>
                <FiRefreshCw /> Try Again
              </button>
            </div>
          )}
        </div>

        {importStatus === 'idle' && importData.length > 0 && (
          <div className="import-modal-footer">
            <button className="secondary-btn" onClick={resetImport}>
              <FiRefreshCw /> Reset
            </button>
            <button 
              className="primary-btn" 
              onClick={handleImport}
              disabled={validationErrors.length > 0}
            >
              <FiUsers /> Import {importData.filter(c => c.isValid).length} Customers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerImport;