import { createContext, useContext } from "react";

const DropdownContext = createContext();
function DropdownProvider(props) {
  return (
    <DropdownContext.Provider value={props}>
      {props.children}
    </DropdownContext.Provider>
  );
}
function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { useDropdown, DropdownProvider };