import React from 'react';

const DentistModal: React.FC<{ dentist: any, onClose: () => void }> = ({ dentist, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{dentist.degree}</h2>
        <p>{dentist.details}</p>
        <button onClick={onClose}>Close</button>
        <button>Make a Complaint</button>
        <button>Rate Dentist</button>
      </div>
    </div>
  );
};

export default DentistModal;
