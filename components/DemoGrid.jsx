import Image from "next/image";
import styled from "styled-components";
import { Palettes, Random, SASS } from "maximilian";
import { useEffect } from "react";

const R = Random.NumberBetween;

const Layout = styled.div`
	${ SASS.Size.Full }
	background-color: black;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;

	.palette {
		align-items: center;
		display: flex;
		flex-direction: row;
		height: 200px;
		justify-content: center;
		margin: 2px;
		position: relative;
		
		.title {
			display: none;
			color: orange;
			position: relative;
			z-index: 1;
		}
		
		.variation {
			filter: brightness(0.7);
			height: 100%;
			margin: 2px;
			transition: 300ms ease-out;
			width: 100%;

			.imgContainer {
				height: 100%;
				width: 100%;
		
				* {
					height: 100%;
					object-fit: contain;
					width: auto;
				}
			}

			&:hover {
				filter: brightness(1);

				.modal {
					border: 1px solid gold;
					height: 50px;
					width: 100%;
				}
			}

			.modal {
				height: 0;
				position: relative;
				top: 100%;
				transform: translate(0, -100%);
				width: 0;
			}
		}
	}
`;

const DemoGrid = ({ items }) => {
	useEffect(() => {
		items.map(item => {
			// eslint-disable-next-line no-console
			console.log(item);
		});
	}, []);
	
	return(
		<Layout
			columns={ 1 }
			rows={ Object.keys(Palettes).length }
		>
			{ Object.entries(Palettes).map((palette) => {
				const [ paletteName, ] = palette;

				return(
					<div
						className="palette"
						id={ `palette_${ paletteName }` }
						key={ palette }
					>
						<div
							className="title"
							id="title"
						>
							{ paletteName }
						</div>
		
						{ Object.entries(Palettes[paletteName]).map((variation) => {
							const [ variationName, variationValue ] = variation;

							return(
								<div
									className="variation"
									id={ `variation_${ variationName }`}	
									key={ variation }
									/* style={{
										backgroundColor: variationValue.rgb
									}} */
								>

									<div className="imgContainer">
										<Image
											src={ items[R(0,items.length-1)].image }
											layout="responsive"
										/>
									</div>
									
									<div className="modal">
										{/* { variationName } */}
									</div>
								</div>
							);
						})}
					</div>
				);
			})}
		</Layout>
	);
};

export default DemoGrid;
