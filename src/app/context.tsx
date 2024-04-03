import { createContext, useState } from "react";

type MainContextType = {
  loading: boolean;
  setLoading: (val: boolean) => void;
};

export const MainContext = createContext<MainContextType>({
  loading: false,
  setLoading: () => {},
});

const MainContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <MainContext.Provider value={{ loading, setLoading }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
