import { Log } from "maximilian";

// ________________________________________ LIST ________________________________________
function Fonts() {
	// variantStr is for pulling in different weights etc.

	this.Aldrich = {
		friendlyName : "Aldrich",
		variantStr   : "Aldrich",
		__usableStr  : "font-family: 'Aldrich', sans-serif;",
		Use          : {}
	};
	this.Alegreya = {
		friendlyName : "Alegreya",
		variantStr   : "Alegreya+Sans:wght@300",
		__usableStr  : "font-family: 'Alegreya Sans', sans-serif;",
		Use          : {}
	};
	this.Inter = {
		friendlyName : "Inter",
		variantStr   : "Inter",
		__usableStr  : "font-family: 'Inter', sans-serif;",
		Use          : {}
	};
	this.Lobster = {
		friendlyName : "Lobster",
		variantStr   : "Lobster",
		__usableStr  : "font-family: 'Lobster', cursive;",
		Use          : {}
	};
	this.MajorMono = {
		friendlyName : "MajorMono",
		variantStr   : "Major+Mono+Display",
		__usableStr  : "font-family: 'Major Mono Display', monospace;",
		Use          : {}
	};
	this.Orbitron = {
		friendlyName : "Orbitron",
		variantStr   : "Orbitron",
		__usableStr  : "font-family: 'Orbitron', sans-serif;",
		Use          : {}
	};
	this.Poppins = {
		friendlyName : "Poppins",
		variantStr   : "Poppins",
		__usableStr  : "font-family: 'Poppins', sans-serif;",
		Use          : {}
	};
	this.Rajdhani = {
		friendlyName : "Rajdhani",
		variantStr   : "Rajdhani",
		__usableStr  : "font-family: 'Rajdhani', sans-serif;",
		Use          : {}
	};
	this.Raleway = {
		friendlyName : "Raleway",
		variantStr   : "Raleway",
		__usableStr  : "font-family: 'Raleway', sans-serif;",
		Use          : {}
	};
	this.Vibur = {
		friendlyName : "Vibur",
		variantStr   : "Vibur",
		__usableStr  : "font-family: 'Vibur', cursive;",
		Use          : {}
	};
}

export const FontList = new Fonts();

Object.keys(FontList).forEach((font) => {
	FontList[font].hasImported = false; // Assign false to each font so they flag if accidentally excluded from import
	
	// Add method to return font-family for easy use in styled components
	Object.defineProperty(FontList[font], "Use", {
		get() {
			return(this.__usableStr);

			// TODO fix this font checker
			/* if (this.hasImported) {
				return(this.__usableStr);
			} else {
				throw new Error(`Import font '${ this.friendlyName }' from your App before attempting to call it.`);
			} */
		}
	});
});

// ________________________________________ LINK COMPONENTS ________________________________________
export const FontPreconnect = () => (
	<link
		id="FontPreconnect"
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossOrigin="true"
	/>
);

export const FontImporter = (props) => {
	const { fonts } = props;
	__DEV && Log.Attempt(`User has requested to <link> import the following fonts: \n${ fonts.map((font) => font.friendlyName).join(", ") }`);
	__DEV && Log.Message(`There are ${ Object.keys(FontList).length } available fonts to choose from.`);

	const importLink = `https://fonts.googleapis.com/css2?${
		fonts.map((font, i) => {
			FontList[font.friendlyName].hasImported = true;
			return(`${ i === 0 ? "" : "&" }family=${ font.variantStr }`);
		}).join("")
	}&display=swap`;

	return(
		<link
			id="FontImporter"
			rel="stylesheet"
			href={ importLink }
		/>
	);
};
