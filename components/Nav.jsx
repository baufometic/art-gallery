import Link from "next/link";
import styled from "styled-components";
import { Log, SASS } from "maximilian";
import { useComponent } from "../hooks/useComponent";
import { FontList } from "./Fonts";
import { withRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const menuItems = [
	{
		name : "home",
		href : "/"
	},
	{
		name : "ethos",
		href : "/ethos"
	},
	{
		name : "shop",
		href : "/shop"
	},
	{
		name : "contact",
		href : "/contact"
	}
];

const MenuLayout = styled.div`
	${ SASS.Size.Full }
	align-items: center;
	display: inline-flex;
	justify-content: space-evenly;
	transform-style: preserve-3d;

	// ITEMS
	a {
		${ FontList.Rajdhani.Use }
		align-items: center;
		display: flex;
		justify-content: center;
		position: relative;
		text-transform: uppercase;
		touch-action: none;
		transition: cubic-bezier(0.075, 0.82, 0.165, 1);
		transition-duration: 300ms;

		&.active {
			border-bottom: 1px solid rgba(0,128,128, 0.5);
			color: #b18d56; // wood
			font-size: 18px;
			font-weight: bold;
		}
		&.inactive {
			font-size: 16px;
		}

		&:hover {
			border-bottom: 1px solid rgb(0,255,255);
			border-bottom-left-radius: 2px;
			border-bottom-right-radius: 2px;
			color: rgb(0,255,255);
			cursor: pointer;
		}
	}
`;

const Menu = withRouter(({ router }) => {
	__DEV && useComponent("Menu");

	return(
		<MenuLayout>
			{ menuItems.map((item, idx) => (
				<Link
					key={ idx.toString() }
					href={ item.href }>

					<a
						className={ item.href === router.pathname ? "active" : "inactive" }

						onMouseEnter={(e) => {
							__DEV && Log.MouseEnter(e.target);
						}}
						onMouseLeave={(e) => {
							__DEV && Log.MouseLeave(e.target);
						}}
						onClick={(e) => {
							__DEV && Log.Message(`Clicked: ${ e.target }`);					
						}}>

						{ item.name }
					</a>
				</Link>
			)) }
			<FontAwesomeIcon
				icon={ faShoppingBasket }
				id="shoppingBasketIcon"
				style={{
					color     : "#b18d56",
					transform : "scale(1.2)"
				}}/>
		</MenuLayout>
	);
});

//________________________________________ NAV ________________________________________
const Nav = () => {
	__DEV && useComponent("Nav");
	
	return(
		<Menu />
	);
};

export default Nav;
