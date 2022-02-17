import styled, { keyframes } from "styled-components";
import { useComponent } from "../hooks/useComponent";

// TODO remove the popout icon for the video.
// TODO disable downlading of the video and all content

const Layout = styled.video`
	height: 100%;
	left: 0;
	object-fit: cover;
	position: absolute;
	top: 0;
	width: 100%;

	animation: ${ keyframes`
		from { filter: blur(50px) brightness(0); }
		to { filter: blur(0) brightness(1); }
	` } ease-in-out 5s forwards;
`;

const VideoPlayer = ({ src, style }) => {
	__DEV && useComponent("Video");
	
	return(
		<Layout
			autoPlay
			loop
			muted
			controls={ false }
			id="videoBackground"
			src={ src }
			style={{
				...style
			}}
		/>

	);
};

export default VideoPlayer;
