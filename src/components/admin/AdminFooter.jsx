import React from 'react';

const AdminFooter = () => {
  return (
    <footer className="mt-auto py-8 px-10 border-t border-outline-variant bg-white">
      <div className="flex justify-between items-center text-on-surface-variant opacity-60 font-body-sm text-xs">
        <span>© {new Date().getFullYear()} Kalatmaka CMS. All rights reserved.</span>
        <div className="flex gap-6">
          <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
