import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { APP_DATA } from "../contexts/AppContext";
import { FontList, FontPreconnect, FontImporter } from "../components/Fonts";

// TODO why doesn't title work if placed in document? see below

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () => originalRenderPage({
				// eslint-disable-next-line react/display-name
				enhanceApp: (App) => (props) => sheet.collectStyles(<App { ...props } />),
			});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{ initialProps.styles }
						{ sheet.getStyleElement() }
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return(
			<Html lang="en">
				<Head>
					{/* <title>{ APP_DATA.title }</title> */}
					<meta property="og:title" content={ APP_DATA.name } />
					<meta name="description" content={ APP_DATA.description } />
					<meta property="og:description" content={ APP_DATA.description } />
					<meta property="og:url" content={ APP_DATA.url } />
					<meta property="og:type" content="website" />
					<link rel="icon" href="/favicon.ico" />
					<link rel="apple-touch-icon" href="/favicon.ico" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="theme-color" content={ APP_DATA.colour } />
					<meta name="msapplication-TileColor" content={ APP_DATA.colour } />
					<meta name="msapplication-navbutton-color" content={ APP_DATA.colour } />
					<meta name="apple-mobile-web-app-status-bar-style" content={ APP_DATA.colour } />
					
					<FontPreconnect />
					<FontImporter fonts={[
						FontList.Aldrich,
						FontList.Alegreya,
						FontList.Inter,
						FontList.Lobster,
						FontList.MajorMono,
						FontList.Orbitron,
						FontList.Poppins,
						FontList.Rajdhani,
						FontList.Raleway,
						FontList.Vibur
					]}/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
