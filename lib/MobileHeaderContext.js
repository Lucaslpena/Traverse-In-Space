import React, { createContext, useContext, useState } from 'react';

const MobileHeaderContext = createContext()
const MobileHeaderUpdateContext = createContext()
const useMobileHeaderContext = () => useContext(MobileHeaderContext)
const useMobileHeaderUpdateContext = () => useContext(MobileHeaderUpdateContext)

// const MobileNavContext = createContext()
// const MobileNavUpdateContext = createContext()
// const useMobileNavContext = () => useContext(MobileNavContext)
// const useMobileNavUpdateContext = () => useContext(MobileNavUpdateContext)

const MobileHeaderProvider = ({ children }) => {
  const [mobileHeader, setMobileHeader] = useState(null);
  const [mobileNav, setMobileNav] = useState(null);

  return (
    <MobileHeaderContext.Provider value={mobileHeader}>
      <MobileHeaderUpdateContext.Provider value={setMobileHeader}>

        {/*<MobileNavContext.Provider value={mobileNav}>*/}
        {/*  <MobileNavUpdateContext.Provider value={setMobileNav}>*/}

            {children}

          {/*</MobileNavUpdateContext.Provider>*/}
        {/*</MobileNavContext.Provider>*/}

      </MobileHeaderUpdateContext.Provider>
    </MobileHeaderContext.Provider>
  );
}

export {
  useMobileHeaderContext,
  useMobileHeaderUpdateContext,
  // useMobileNavContext,
  // useMobileNavUpdateContext,
  MobileHeaderProvider
}
