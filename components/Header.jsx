import styled from "styled-components";
import { useComponent } from "../hooks/useComponent";
import Nav from "./Nav";

const Layout = styled.header`
	${ ({ theme }) => theme.headerStyle }
	display: grid;
	grid-template: 1fr / 1fr;
`;

const Header = ({ children }) => {
	__DEV && useComponent("Header");

	return(
		<Layout>
			<Nav />
			{ children }
		</Layout>
	);	
};

export default Header;

