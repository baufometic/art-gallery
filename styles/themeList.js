import { Palettes as p } from "maximilian";

const themeList = [
	{
		// ____________________ DARK ____________________
		name          : "dark",
		primaryColour : "whitesmoke",
		background    : "black",
		headerStyle   : (`
			background: radial-gradient(ellipse at top, ${ p.tronBlack2 } 40%, #000 100%);
			border: 0;
			box-shadow: 2px -1px 14px grey;
		`),
		footerStyle: (`
			background: radial-gradient(ellipse at bottom, ${ p.tronBlack2 } 50%, #000 100%);
			border: 0;
			box-shadow: 2px -3px 15px ${ p.tronWhite0 };
		`)
	},
	{
		// ____________________ LIGHT ____________________
		name          : "light",
		primaryColour : "black",
		background    : "whitesmoke",
		headerStyle   : (`
			background: radial-gradient(ellipse at top, ${ p.tronWhite2 } 50%, #000 100%);
			border: 0;
			box-shadow: 0px -1px 20px grey;
		`),
		footerStyle: (`
			background: radial-gradient(ellipse at bottom, ${ p.tronWhite2 } 50%, #000 100%);
			border: 0;
			box-shadow: 0px -1px 20px ${ p.tronBlack2 };
		`)
	}
];

export default themeList;
