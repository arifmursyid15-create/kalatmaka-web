import React from 'react';

const AdminTopNav = () => {
  return (
    <header className="flex justify-between items-center h-20 px-10 bg-white shadow-sm sticky top-0 z-40">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">search</span>
          <input 
            className="w-full bg-[#F5F0EA] border border-gray-200 rounded-full py-2 pl-10 pr-4 font-body-sm focus:outline-none focus:border-[#C6A77D] transition-colors" 
            placeholder="Search projects or articles..." 
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="material-symbols-outlined text-[#3B2A23] hover:text-[#C6A77D] transition-colors p-2 rounded-full hover:bg-gray-50">notifications</button>
        <button className="material-symbols-outlined text-[#3B2A23] hover:text-[#C6A77D] transition-colors p-2 rounded-full hover:bg-gray-50">apps</button>
        <div className="h-8 w-px bg-gray-200"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-title-lg text-sm text-[#3B2A23]">Admin Profile</p>
            <p className="font-body-sm text-xs text-gray-500">System Manager</p>
          </div>
          <img 
            className="w-10 h-10 rounded-full object-cover border border-gray-200" 
            alt="Admin Profile" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEe3y1r7Vy12RwmQiyWU-ue__T4nIPMAzahUxrZkE4yenRNpGwGwcNtPwXqvSnqT0ZKh6CQAtYif2sV7cyNNQB8VkUV8cFEGpV0RJNtlNv2ksKtc7WTPSkcWQ9xnPgH7GL0rFgJbBxzT05ROvF08hepYDReMI-GLecWVUpn7teEsAEIHg2_qQYx8u_JIhb1kOC7lmktE7yiYLQAzk7oo2mhsU_oWccNGmr_gKFDV80CIAVNoHq1WjyONML3BPD-yk1dOhvH7d27XNU"
          />
        </div>
      </div>
    </header>
  );
};

export default AdminTopNav;
