import styled from "styled-components";
import { SASS } from "maximilian";
import { useComponent } from "../hooks/useComponent";
import Gallery from "../components/gallery/Gallery";

const Layout = styled.main`
	${ SASS.Size.Full }
`;

const Home = ({ children }) => {
	__DEV && useComponent("Home");

	return (
		<Layout id="home">
			{/* <TribalText /> */}

			<Gallery />

			{/* <div className="y">
				<DemoGrid />
			</div> */}

			{children}
		</Layout>
	);
};

export default Home;
