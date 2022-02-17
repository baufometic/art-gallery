import styled from "styled-components";
import { SASS } from "maximilian";
import { useComponent } from "../hooks/useComponent";

const Layout = styled.main`
    ${ SASS.Size.Full }
	${ SASS.Position.CentreFlex }
`;

const Shop = ({ children }) => {
	__DEV && useComponent("Shop");

	return(
		<Layout>
			Shop
			{ children }
		</Layout>
	);
};

export default Shop;
