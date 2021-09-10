import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { SASS } from "maximilian";
import { FontList } from "../Fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Frame = styled.div`
	${ SASS.Size.Full }
	${ SASS.Position.CentreFlex }
	height: 90%;
	position: relative;
	transform-style: preserve-3d;
	width: 90%;

	.arrowLeft, .arrowRight {
		font-size: 40px;
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
	}
	.arrowLeft {
		left: 20px;
	}
	.arrowRight {
		right: 20px;
	}

	.imgContainer {
		// WOODEN BORDER
		background-color: black;
		border-image: url("textures/wood.jpg") 30 30 stretch;
		border-radius: 15px;
		border-style: solid;
		border-width: 25px;
		margin: 50px;
		padding: 10px 20px;
		height: 100%;
		width: 100%;

		* {
			height: 100%;
			object-fit: contain;
			width: auto;
		}
	}

	.infoBox {
		align-items: center;
		background-color: #000000;
		background-image: linear-gradient(315deg, #000000 0%, #414141 74%);
		border-radius: 20px;
		bottom: 0;
		display: grid;
		${ FontList.Vibur.Use }
		grid-template-columns: 1fr 1fr;
		grid-template-rows: repeat(3, 1fr);
		grid-template-areas:
			"_title _title"
			"_measurements _medium"
			"_price _url";
		height: 25%;
		justify-content: center;
		left: 0;
		padding: 20px;
		position: absolute;
		text-align: center;
		width: 40%;

		.title {
			${ FontList.Rajdhani.Use }
			font-size: 1rem;
			grid-area: _title;
		}

		.measurements { grid-area: _measurements; }
		.medium { grid-area: _medium; }
		.price { grid-area: _price; }
		.url { grid-area: _url; }
	}
`;

const Painting = ({ itemObj }) => (
	<Frame>
		<FontAwesomeIcon
			className="arrowLeft"
			icon={ faArrowLeft }
			id="arrowLeft">
		</FontAwesomeIcon>
					
		<FontAwesomeIcon
			className="arrowRight"
			icon={ faArrowRight }
			id="arrowRight">
		</FontAwesomeIcon>

		<div className="imgContainer">
			<Image
				className="img"
				layout="responsive"
				src={ itemObj.image }
			/>
		</div>

		<div className="infoBox">
			<h3 className="title">{ itemObj.title }</h3>
			<h3 className="measurements">{ itemObj.measurements }</h3>
			<h3 className="medium">{ itemObj.medium }</h3>
			<h3 className="price">{ itemObj.price }</h3>

			<Link
				className="url"
				href={ itemObj.url }>	
				<a>{ "Link" }</a>
			</Link>
		</div>
	</Frame>
);

export default Painting;
