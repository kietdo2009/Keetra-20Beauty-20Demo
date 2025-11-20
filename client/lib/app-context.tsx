import React, { createContext, useContext, useState, useCallback } from "react";

export interface CustomizeSettings {
  brightness: number;
  lightColor: string;
  syncToMusic: boolean;
}

export interface AppContextType {
  customize: CustomizeSettings;
  updateCustomize: (settings: Partial<CustomizeSettings>) => void;
  randomizeUI: () => void;
  uiColor: string;
  lightsColor: string;
  setLightsColor: (color: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [customize, setCustomize] = useState<CustomizeSettings>({
    brightness: 100,
    lightColor: "#ffffff",
    syncToMusic: false,
  });

  const [uiColor, setUiColor] = useState("white");
  const [lightsColor, setLightsColor] = useState("white");

  const colors = [
    "bg-pink-50",
    "bg-blue-50",
    "bg-purple-50",
    "bg-indigo-50",
    "bg-rose-50",
  ];

  const lightColors = [
    "#ffffff",
    "#fbbf24",
    "#ec4899",
    "#8b5cf6",
    "#0ea5e9",
    "#10b981",
  ];

  const updateCustomize = useCallback((settings: Partial<CustomizeSettings>) => {
    setCustomize((prev) => ({ ...prev, ...settings }));
  }, []);

  const randomizeUI = useCallback(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomLightColor = lightColors[Math.floor(Math.random() * lightColors.length)];
    setUiColor(randomColor);
    setLightsColor(randomLightColor);
  }, []);

  return (
    <AppContext.Provider
      value={{
        customize,
        updateCustomize,
        randomizeUI,
        uiColor,
        lightsColor,
        setLightsColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
