import styled from "styled-components";
import { SASS } from "maximilian";
import { useComponent } from "../hooks/useComponent";

const Layout = styled.main`
    ${ SASS.Size.Full }
	${ SASS.Position.CentreFlex }
`;

const ContactUs = ({ children }) => {
	__DEV && useComponent("ContactUs");

	return(
		<Layout>
			Contact Us
			{ children }
		</Layout>
	);
};

export default ContactUs;
