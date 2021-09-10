// TODO this cookie policy

import styled from "styled-components";
import { SASS } from "maximilian";
import { useComponent } from "../../hooks/useComponent";

const Layout = styled.main`
	${ SASS.Size.Full }
    ${ SASS.Position.CentreFlex }
`;

const CookiePolicy = ({ children }) => {
	__DEV && useComponent("CookiePolicy");

	return(
		<Layout>
			Cookie Policy
			{ children }
		</Layout>
	);
};

export default CookiePolicy;
