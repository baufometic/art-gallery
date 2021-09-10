// TODO this privacy policy

import styled from "styled-components";
import { SASS } from "maximilian";
import { useComponent } from "../../hooks/useComponent";

const Layout = styled.main`
	${ SASS.Size.Full }
    ${ SASS.Position.CentreFlex }
`;

const PrivacyPolicy = ({ children }) => {
	__DEV && useComponent("PrivacyPolicy");

	return(
		<Layout id="privacy-policy">
			Privacy Policy
			{ children }
		</Layout>
	);
};

export default PrivacyPolicy;
