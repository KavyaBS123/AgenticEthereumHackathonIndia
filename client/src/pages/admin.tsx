import React from 'react';
import ScraperAdmin from '@/components/ScraperAdmin';

const AdminPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage system settings and automated services</p>
        </div>
        
        <ScraperAdmin />
      </div>
    </div>
  );
};

export default AdminPage; 