import React from 'react';

const StickyWhatsApp = ({ settings }) => {
  const whatsappLink = settings?.whatsapp_link || 'https://wa.me/6281234567890';

  return (
    <a 
      className="fixed bottom-24 md:bottom-10 right-10 z-[60] bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all group" 
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
    >
      <svg fill="currentColor" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.284l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.768-5.764-5.768zm3.393 8.167c-.145.405-.85.733-1.156.78-.308.047-.685.084-1.124-.056-.244-.076-.554-.18-.94-.343-1.637-.696-2.698-2.352-2.78-2.462-.08-.11-.659-.876-.659-1.67 0-.794.415-1.185.564-1.344.149-.16.323-.2.431-.2.107 0 .216.001.31.005.099.004.232-.037.363.28.133.322.457 1.112.497 1.192.04.081.068.175.014.283-.054.109-.081.175-.163.271-.081.096-.171.215-.244.288-.081.082-.167.171-.072.333.095.161.422.696.906 1.126.623.555 1.149.728 1.31.81.161.082.257.068.353-.042.096-.11.411-.479.521-.643.11-.164.22-.137.369-.082.15.055.947.447 1.111.529.164.082.273.123.314.191.04.068.04.396-.105.801zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path>
      </svg>
      <span className="absolute right-full mr-4 bg-surface px-4 py-2 rounded-lg text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">Chat with an Expert</span>
    </a>
  );
};

export default StickyWhatsApp;
