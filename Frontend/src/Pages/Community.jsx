import React, { useState } from 'react';
import Sidebar from '../Navigations/Sidebar';
import Header from '../Navigations/Header';

function member() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      {/*  Site header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="grow bg-[#F4F5F7]">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between  sm:items-center mb-8">

      {/* Right: Actions */}
 
      </div>
      </div>
      </main>
      </div>
    </div>
  );
}

export default member;