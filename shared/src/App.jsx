/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SUBDOMAIN ROUTING APP V20.95)
// Súbor: shared/src/App.jsx
// Status: 100% GROUNDED // ROUTING MATRIX FOR SHARED NODE
// CORE_VERSION: APP-ROUTER-V20.95
// ============================================================================

import React from "react";
import { Route, Routes } from "react-router-dom";
import SharedPage from "./pages/SharedPage.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedPage subId="SHARED NODE" />} />
      <Route path="*" element={<SharedPage subId="SHARED NODE" />} />
    </Routes>
  );
};

export default App;