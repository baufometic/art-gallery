import { useState } from "react";
import styled from "styled-components";
import { SASS } from "maximilian";
import { FontList } from "../Fonts";
import TribalText from "../TribalText";
import DemoGrid from "../DemoGrid";

import Painting from "./Painting";

import img0 from "../../media/paintings/0.jpeg";
import img1 from "../../media/paintings/1.jpeg";
import img2 from "../../media/paintings/2.jpeg";
import img3 from "../../media/paintings/3.jpeg";
import img4 from "../../media/paintings/4.jpeg";

const pieces = [
	{
		title        : "soul",
		measurements : "16 x 9",
		medium       : "oil on canvas",
		price        : "£724",
		image        : img0,
		url          : "/img0"
	},
	{
		title        : "road less travelled",
		measurements : "16 x 9",
		medium       : "oil on canvas",
		price        : "£1975",
		image        : img1,
		url          : "/img1",
	},
	{
		title        : "limitless",
		measurements : "16 x 9",
		medium       : "oil on canvas",
		price        : "£2860",
		image        : img2,
		url          : "/img2",
	},
	{
		title        : "stugaa",
		measurements : "16 x 9",
		medium       : "oil on canvas",
		price        : "£2000",
		image        : img3,
		url          : "/img3"
	},
	{
		title        : "gently",
		measurements : "16 x 9",
		medium       : "oil on canvas",
		price        : "£6230",
		image        : img4,
		url          : "/img4"
	}
];

const OverallLayout = styled.div`
	${ SASS.Size.Full }
	position: relative;

	.btnGroup {
		${ SASS.Position.CentreFlex }
		flex-direction: row;
		position: absolute;
		top: 20px;
		left: 50%;
		transform: translate(-50%, 0);
		z-index: 1000;
		
		.btn {
			${ FontList.Raleway.Use }
			border-radius: 5px;
			color: black;
			margin: 10px;
			padding: 10px;
	
			&.active {
				background-color: white;
				border: 1px solid teal;
				color: black;
			}
			&.inactive {
				background-color: grey;
				border: 0;
				color: white;
				transform: scaleY(0.8);
			}
		}
	}
`;

const GalleryLayout = styled.div`
	//* { border: 1px solid orange !important; }

	${ SASS.Size.Full }
	position: relative;

	.corridor {
		${ SASS.Size.Full }
		perspective: 100vw;
		position: absolute;
		transform-style: preserve-3d;

		.wall {
			background: url("textures/timber0.jpg") center/cover repeat;
			border: 20px solid rgba(0,0,0, 0.4);
			cursor: pointer;
			display: flex;
			height: 100%;
			overflow-x: scroll;
			position: absolute;
			${ SASS.HideScrollbars }
			scroll-behavior: smooth;
			scroll-snap-type: x mandatory;
			top: 50%;
			transform-style: preserve-3d;
			width: 100vw;
			
			// left wall
			&:nth-of-type(1) {
				left: 0;
				transform-origin: left;
			}

			// right wall
			&:nth-of-type(2) {
				right: 0;
				transform-origin: right;
			}

			.snapContainer {
				${ SASS.Size.Full }
				flex: 1 0 auto;
				${ SASS.Position.CentreFlex }
				scroll-snap-align: center;
				transform-style: preserve-3d;
			}
		}

		.carpet {
			// TODO try and redo as Image/next version so it's in media folder rather than /public
			background: url("textures/totem0.png") center/cover repeat;
			background-size: 300px 300px;
			bottom: 0;
			filter: grayscale(1);
			height: 100vh;
			left: 50%;
			position: absolute;
			transform-origin: bottom;
			transform: rotateX(105deg) translate(-50%, 0);
			width: 100%;
		}

		.welcomeBanner {
			height: 50px;
			width: 50%;
			position: absolute;
		}
	}
`;

const VIEWS = {
	gallery : "Gallery View",
	grid    : "Grid View"
};

const Gallery = () => {
	const [ currentView, setCurrentView ] = useState(VIEWS.gallery);
	const [ isLeftWallActive, setIsLeftWallActive ] = useState(false);
	const [ isRightWallActive, setIsRightWallActive ] = useState(false);

	return(
		<>
			<TribalText />
		
			<OverallLayout>
				<div className="btnGroup">
					<button
						className={ `btn ${ currentView === VIEWS.gallery ? "active" : "inactive" }` }
						onClick={ () => {
							setCurrentView(VIEWS.gallery);
						}}>
						{ VIEWS.gallery }
					</button>

					<button
						className={`btn ${ currentView === VIEWS.grid ? "active" : "inactive" }` }
						onClick={ () => {
							setCurrentView(VIEWS.grid);
						}}>
						{ VIEWS.grid }
					</button>
				</div>
			
				{ currentView === VIEWS.gallery && (
					<GalleryLayout>
						<div className="corridor">
							<div
								className="wall"
								style={{
									transform: `rotateY(${ isLeftWallActive ? "10deg" : "75deg" }) translate(0, -50%)`
								}}
								onClick={ () => setIsLeftWallActive(prev => !prev) }>
							
								{ pieces.flatMap((itemObj, idx) => (
									idx <= 2 ? (<div
										className="snapContainer"
										key={ idx.toString() }>

										<Painting
											itemObj={ itemObj }/>
									</div>)
										: []
								))}
							</div>
						
							<div
								className="wall"
								style={{
									transform: `rotateY(${ isRightWallActive ? "-10deg" : "-75deg" }) translate(0, -50%)`
								}}
								onClick={ () => setIsRightWallActive(prev => !prev) }>

								{ pieces.flatMap((itemObj, idx) => (
									idx >= 3 ? (<div
										className="snapContainer"
										key={ idx.toString() }>

										<Painting itemObj={ itemObj } />
									</div>)
										: []
								))}
							</div>

							<div className="carpet">

							</div>

							<div className="welcomeBanner">

							</div>
						</div>
					</GalleryLayout>
				)}

				{ currentView === VIEWS.grid && (
					<DemoGrid items={ pieces } />
				)}
			</OverallLayout>
		</>
	);
};

export default Gallery;
