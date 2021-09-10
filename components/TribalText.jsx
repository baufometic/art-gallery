/* eslint-disable no-console */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { MATH, Random, SASS, STR } from "maximilian";
import { FontList } from "./Fonts";
import { useComponent } from "../hooks/useComponent";

//________________________________________ TESTING FORMAT ________________________________________
const Layout = styled.div`
	align-items: center;
	display: grid;
	grid-template-areas: "_word1" "_word2" "_word3" "_space" "_cta";
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 1fr 1fr 50px 1fr;
	justify-content: center;
	height: 30%;
	left: 50%;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
	z-index: 10000;
	
	.word {
		${ FontList.Rajdhani.Use }
		align-items: center;
		color: #2FEBD2;
		cursor: pointer;
		display: grid;
		font-size: 4vw;
		// grid-template-columns is set using inline jsx further down
		height: 100%;
		position: relative;
		justify-content: center;
		text-transform: uppercase;
		width: 100%;

		&:nth-of-type(1) {
			grid-area: _word1;
		}
		&:nth-of-type(2) {
			grid-area: _word2;
		}
		&:nth-of-type(3) {
			grid-area: _word3;
		}

		&:hover {
			transform: scaleY(1.1); // scaleX causes overflow
			transition: 200ms ease-out;
		}

		.character {
			${ SASS.Position.CentreFlex }
			${ SASS.Size.Full }
		}
	}
`;

const Word = ({ text }) => {
	__DEV && useComponent("Word");
	
	return(
		<div
			className="word"
			style={{
				gridTemplateColumns: `repeat(${ text.length }, 1fr)`
			}}>

			{ text.split("").map((letter, idx) => (
				<Character
					char={ letter }
					key={ `${ text }_${ idx }` }
				/>
			)) }
		</div>
	);
};

const Character = ({ char }) => {
	const [ count, setCount ] = useState(0);
	const timeout = useRef();
	
	const steps = useMemo(() => {
		//const SEED_STRING = "abcdefghijklmnopqrstuvwxyz";
		const SEED_STRING = STR.Rearrange("0123456789&+-@*%£$,.'abcdefghijklmnopqrstuvwxyz園迎簡益大诶比西迪伊弗吉尺杰开艾勒马娜 "); // purposeful space at end
		const initialCharIndex	= 0;
		const endChar			= char.toLowerCase();
		const endCharIndex		= SEED_STRING.indexOf(endChar); if (endCharIndex === -1) throw new Error(`TribalText. Add char '${ char }'' to SEED_STRING to use it in loops.`);
		const noOfSteps			= (endCharIndex - initialCharIndex) + 1;
		const randomDir			= Random.NumberBetween(0,2);
		const animDirection		= randomDir === 0 ? "none" : randomDir === 1 ? "up" : "down";
		const yStep				= animDirection === "up" ? -1 : animDirection === "down" ? 1: 0;
		const initialYPos		= -noOfSteps * yStep;
		const initialOpacity	= 0;
		const opacityStep		= 100 / noOfSteps;

		let arr = [];

		for (let i = 0; i < noOfSteps; i++) {
			let yPos = (initialYPos + (yStep * i));
			if (i === (noOfSteps - 1)) yPos = 0;
			const char = SEED_STRING[initialCharIndex + i];
			let opacity = MATH.RoundTo2DP(initialOpacity + (opacityStep * (i + 1)) / 100);
			const transform = `translateY(${ yPos }px)`;

			arr.push({
				char      : char,
				opacity   : opacity,
				transform : transform,
			});
		}

		return arr;
	}, [ char ]);

	//__DEV && useComponent("Character");
	useEffect(() => {
		//Log.Mounted(`Character: ${ char }, steps: ${ steps.length }`);
		NextStep();

		return() => {
			clearTimeout(timeout.current);
		};
	}, []);

	const NextStep = () => {
		clearTimeout(timeout.current);

		setCount(prev => {
			const updateNeeded = (prev < (steps.length - 1));
			
			if (updateNeeded) {
				// Schedule the next iteration then update current
				timeout.current = setTimeout(() => {
					NextStep();
				}, 30);
				
				// Update now
				return(prev + 1);
			}

			// No updates required
			return(prev);
		});
	};

	return(
		<div
			className="character"
			style={{
				opacity   : steps[count].opacity,
				transform : steps[count].transform,
			}}>

			{ steps[count].char }
		</div>
	);
};

//______________________________ MAIN COMPONENT ________________________________________
const titleArray = [
	[
		" authentic    ",
		"   channeled  ",
		"       divine "
	],
	[
		"   welcome to       ",
		"    indian nation   "
	],
	[
		"    "
	]
];

const __titleArray = [
	[
		"   welcome to       ",
		"    tech & tribal   "
	],
	"   web three     ",
	"   web solid     ",
	"       solidity  ",
	[
		"       Whether you're   ",
		"       at summit        ",
		"   or brain-wave        "
	],
	[
		"  lets grow together       ",
		"  and see how thin         ",
		"  the air gets at the top  "
	],
	[
		"       bespoke,        ",
		"    laser targeted,    ",
		"  full-stack websites  "
	],
	[
		"  you're closer     ",
		"    than you think  "
	],

	/*
	[
		"adaptive css",
		"like a quantised pool",
		"based on personality",
	],

	[
		"css should be fluent",
		"and js makes that possible"
	],
	
	[
		"no neural nets learning",
		"your every spending habit"
	],

	[
		"or giving your data away",
		"web three changes all of that",
		"it's on the cusp of human fabric"
	]*/
];

const REPEAT = false;

const TribalText = () => {
	__DEV && useComponent("TribalText");
	const timeout = useRef();

	const [ title, setTitle ] = useState();
	const titleIndex = useRef(-1);

	const NextTitle = useCallback(
		() => {
			const end = titleArray.length - 1;
			const prevIdx = titleIndex.current;
			const newIdx = prevIdx < end ? prevIdx + 1 : REPEAT ? 0 : prevIdx;
			titleIndex.current = newIdx;

			if (typeof titleArray[newIdx] === "object") { // it's an array of a list of strings
				setTitle(
					titleArray[newIdx].map(lineContent => (
						<Word
							key={ lineContent }
							text={ lineContent }
						/>
					))
				);
			} else {
				let lineContent = titleArray[newIdx];
				setTitle(
					<Word
						key={ lineContent }
						text={ lineContent }
					/>
				);
			}

			clearTimeout(timeout.current);
			timeout.current = setTimeout(() => {
				NextTitle();
			}, 5000);
		},
		[]
	);

	useEffect(() => {
		NextTitle();

		return () => {
			clearTimeout(timeout.current);
		};
	}, []);
	
	return(
		<Layout>
			{ title }
		</Layout>
	);
};

export default TribalText;
