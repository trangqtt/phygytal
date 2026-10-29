import { PageSteps } from "@/models/general";
import { createContext, useContext, useEffect, useState } from "react";

const AppStepContext = createContext<any>(undefined);

export const AppStep = ({ children }: any) => {
  const [currentStep, setCurrentStep] = useState<PageSteps>(PageSteps.Splash);

  return (
    <AppStepContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </AppStepContext.Provider>
  );
};

export const useAppStepContext = () => {
  const { currentStep, setCurrentStep } = useContext(AppStepContext);
  return {
    currentStep,
    setCurrentStep,
  };
}
