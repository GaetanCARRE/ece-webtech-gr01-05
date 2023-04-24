import { createContext, useState } from 'react';

const CheckoutContext = createContext({
  checkout: [],
  setCheckout: () => {},
});

export default CheckoutContext;

export const CheckoutContextProvider = ({ children }) => {
  const [checkout, setCheckout] = useState([]);

  const contextValue = {
    checkout,
    setCheckout,
  };

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};
