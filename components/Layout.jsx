"use client";
import React from 'react';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
