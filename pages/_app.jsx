/* eslint-disable no-console */
//________________________________________ IMPORTS ________________________________________
import GlobalStyle from "../styles/GlobalStyle";
import styled, { css, ThemeProvider } from "styled-components";
import themeList from "../styles/themeList";
import { SASS, useTheme } from "maximilian";
import { useComponent } from "../hooks/useComponent";
import AppProvider, { APP_DATA } from "../contexts/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

//________________________________________ APP ________________________________________
const Layout = styled.div`
	${ ({ theme }) => theme.wireframeEnabled && css`
		${ SASS.Debug.Wireframe }
	` }
	${ SASS.Size.Full }
	
	color: ${ ({ theme }) => theme.primaryColour };
	display: grid;
	grid-template-areas:
		"_header"
		"_main"
		"_footer";
	grid-template-rows: 50px 1fr 50px;
	grid-template-columns: 1fr;
	position: fixed;

	> header {
		display: grid;
		grid-area: _header;
	}
	> main {
		grid-area: _main;
	}
	> footer {
		display: grid;
		grid-area: _footer;
	}
`;

const App = ({ Component, pageProps }) => {
	__DEV && useComponent("App", () => {
		console.log(`%c  ${ APP_DATA.name }  %c  ${ APP_DATA.tag }  %c  ${ APP_DATA.url }`,
			"background-color: black; color: orange; font-size: 16px; text-align: center;",
			"background-color: black; color: lime; font-size: 16px; text-align: center;",
			"background-color: black; color: orange; font-size: 16px; text-align: center;");
		
		console.log(`%c ENV: ${ (process.env.NODE_ENV).toUpperCase() }`,
			"background-color: black; color: gold; font-size: 14px; margin: 5px;");
	});
	
	const [ { currentTheme } ] = useTheme(themeList, false, 5000);
	
	return(
		<AppProvider>
			<ThemeProvider theme={ currentTheme }>
				<Layout>
					<GlobalStyle />
					<Header />
					<Component { ...pageProps } />
					<Footer />
				</Layout>
			</ThemeProvider>
		</AppProvider>
	);
};

export default App;
