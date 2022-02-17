import { createContext, useContext } from "react";
import { useComponent } from "../hooks/useComponent";

//________________________________________ APP DATA ________________________________________
export const APP_DATA = new function() {
	this.name = "ART GALLERY";
	this.description = "Pure and authentic";
	this.tag = "Pure and authentic.";
	this.url = "https://techandtribal.com.com";
	this.colour = "#4B4A69";
};

// ____________________ EXPORTS ____________________
const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
	__DEV && useComponent("AppProvider");
	
	return (
		<AppContext.Provider value={ APP_DATA }>
			{ children }
		</AppContext.Provider>
	);
};

export default AppProvider;
