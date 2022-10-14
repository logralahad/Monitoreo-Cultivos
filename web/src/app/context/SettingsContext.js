import React, { createContext, useState } from "react";

import { merge } from "lodash";

import { MainLayoutSettings } from "../components/Private/settings";

const SettingsContext = createContext({
  settings: MainLayoutSettings,
  updateSettings: () => {},
});

export const SettingsProvider = ({ settings, children }) => {
  const [currentSettings, setCurrentSettings] = useState(
    settings || MainLayoutSettings
  );

  const handleUpdateSettings = (update = {}) => {
    const marged = merge({}, currentSettings, update);
    setCurrentSettings(marged);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        updateSettings: handleUpdateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
