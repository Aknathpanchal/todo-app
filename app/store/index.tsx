import { createContext, useContext } from "react";
import { RootStore } from "./RootStore";

/* The code is creating a context object called `rootStoreContext` using the `createContext` function
from the React library. The initial value of the context is an object with a property `rootStore`
that is initialized with a new instance of the `RootStore` class. This context can be used to
provide the `rootStore` object to components in the React component tree. */
export const rootStoreContext = createContext({
  rootStore: new RootStore(),
});

/**
 * The below function is a custom hook that returns the root store context.
 */
export const useStore = () => useContext(rootStoreContext);
