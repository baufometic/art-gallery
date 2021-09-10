import styled from "styled-components";
import { SASS } from "maximilian";
import { useComponent } from "../hooks/useComponent";

const Layout = styled.main`
    ${ SASS.Size.Full }
	${ SASS.Position.CentreFlex }
`;

const Ethos = ({ children }) => {
	__DEV && useComponent("Ethos");

	return(
		<Layout>
			Ethos
			{ children }
		</Layout>
	);
};

export default Ethos;
