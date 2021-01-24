import {createContext} from 'react';

const PreferencesContext = createContext({
  theme: '',
  ToggleTheme: () => {},
});

// export const PreferencesProvider = (children) => {
//   return <PreferencesContext.Provider>{children}</PreferencesContext.Provider>;
// };
export default PreferencesContext;
