
/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (STANDBY NODE ROUTER V20.95)
// Súbor: apps/blog/src/App.jsx
// Status: 100% GROUNDED // UNIFIED STANDBY ROUTER V20
// CORE_VERSION: APP-ROUTER-V20.95
// ============================================================================

import React from "react";
import { Route, Routes } from "react-router-dom";
import SharedPage from "@shared/pages/SharedPage.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedPage nodeTitle="NEXUS SUB NODE" subId="SUB 14" />} />
      <Route path="*" element={<SharedPage nodeTitle="NEXUS SUB NODE" subId="SUB 14" />} />
    </Routes>
  );
};

export default App;
