import { createContext } from "react";

export const CheckoutContext = createContext({
  checkout: new Map(),
  setCheckout: () => {},
});
