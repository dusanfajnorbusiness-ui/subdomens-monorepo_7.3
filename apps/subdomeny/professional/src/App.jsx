/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (STANDBY NODE ROUTER V20.95)
// Súbor: apps/professional/src/App.jsx (alebo sub-01 až sub-15)
// Status: 100% GROUNDED // GLOBAL STANDBY LAYOUT REUSE
// ============================================================================

import React from "react";
import { Route, Routes } from "react-router-dom";
import SharedPage from "@shared/pages/SharedPage.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedPage nodeTitle="NEXUS SUB NODE" subId="SUB 07" />} />
      <Route path="*" element={<SharedPage nodeTitle="NEXUS SUB NODE" subId="SUB 07" />} />
    </Routes>
  );
};

export default App;