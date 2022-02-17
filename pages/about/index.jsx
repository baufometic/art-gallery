import styled from "styled-components";
import { SASS } from "maximilian";
import { useComponent } from "../../hooks/useComponent";

const Layout = styled.main`
	${ SASS.Size.Full }
    ${ SASS.Position.CentreFlex }
`;

const AboutUs = ({ children }) => {
	__DEV && useComponent("AboutUs");
	
	return(
		<Layout>
			About
			{ children }
		</Layout>
	);
};

export default AboutUs;
