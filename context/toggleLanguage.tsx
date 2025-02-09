import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface LanguageContextType {
  ChangeLanguage: boolean;
  toggleLanguage: () => void;
}

// Define the props for the LanguageProvider component
interface LanguageProviderProps {
  children: ReactNode; // Explicitly define the children prop
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [ChangeLanguage, setChangeLanguage] = useState<boolean>(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("ChangeLanguage");
    if (savedLanguage) {
      setChangeLanguage(JSON.parse(savedLanguage));
    }
  }, []);

  const toggleLanguage = () => {
    setChangeLanguage((prev) => {
      const newLanguageStatus = !prev;
      localStorage.setItem("ChangeLanguage", JSON.stringify(newLanguageStatus));
      return newLanguageStatus;
    });
  };

  return (
    <LanguageContext.Provider value={{ ChangeLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
