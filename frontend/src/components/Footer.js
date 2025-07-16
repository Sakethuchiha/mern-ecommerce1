import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-ash_gray-900 border-t border-dark_slate_gray mt-8 py-6 text-sm text-charcoal">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex space-x-4 mb-2 md:mb-0">
          <a href="#" className="hover:text-hookers_green transition">About</a>
          <a href="#" className="hover:text-hookers_green transition">Contact</a>
          <a href="#" className="hover:text-hookers_green transition">Privacy Policy</a>
        </div>
        <div>
          © {new Date().getFullYear()} <span className="font-semibold text-hookers_green">MERN Shop</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
