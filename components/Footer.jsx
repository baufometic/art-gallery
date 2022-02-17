import styled, { keyframes } from "styled-components";
import { useComponent } from "../hooks/useComponent";
import { FontList } from "./Fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter, faTwitch } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const icons = [
	{ name: "instagram",		file: faInstagram,		url: "http://instagram.com/techandtribal/" },
	{ name: "twitter",			file: faTwitter,		url: "http://twitter.com/techandtribal/" },
	{ name: "twitch",			file: faTwitch,			url: "http://twitch.com/techandtribal/" },
	{ name: "shoppingBasket",	file: faShoppingBasket,	url: "http://mailchimp.com/" }
];

const Layout = styled.footer`
	${ ({ theme }) => theme.footerStyle }
	color: #b18d56;
	//z-index: 1000;

	display: grid;
	grid-template-areas: "_area1 _area2 _area3";
	grid-template-columns: 1fr 2fr 1fr;   //repeat(auto-fit, minmax(50px, 1fr));
	grid-template-rows: 1fr;
	
	${ FontList.Rajdhani.Use }
	font-size: 16px;
	text-transform: uppercase;
	
	// 3D
	transform-style: preserve-3d;

	.area1 {
		align-items: center;
		display: flex;
		grid-area: _area1;
		justify-content: center;
	}

	.area2 {
		align-items: center;
		display: inline-flex;
		grid-area: _area2;
        justify-content: space-evenly;

		> * {
			font-size: 16px;
			overflow: visible;

			&:nth-child(1) { animation-delay: 1000ms; }
			&:nth-child(2) { animation-delay: 1200ms; }
			&:nth-child(3) { animation-delay: 1400ms; }
			&:nth-child(4) { animation-delay: 1600ms; }
			&:nth-child(5) { animation-delay: 1800ms; }
			
			animation: ${ keyframes`
					from { transform: rotateZ(-90deg); }
					to { transform: rotateZ(0deg); }
				` };
			animation-duration: 1600ms;
			animation-fill-mode: forwards;
			animation-timing-function: ease-out;
		}
	}

	.area3 {
		align-items: center;
		display: flex;
		grid-area: _area3;
		justify-content: center;
		text-align: center;
	}
`;

const Footer = ({ children }) => {
	__DEV && useComponent("Footer");
	
	return(
		<Layout id="footer">
			<div className="area1">
				Enquire
			</div>
			
			<div className="area2">
				{ icons.map((icon, i) => (
					<a
						href={ icon.url }
						key={ i }>

						<FontAwesomeIcon
							id={ `socialMediaIcon_${ i }` }
							icon={ icon.file }>
						</FontAwesomeIcon>
					</a>
				))}
			</div>

			<div className="area3">
				Updates
			</div>

			{ children }
		</Layout>
	);
};

export default Footer;
