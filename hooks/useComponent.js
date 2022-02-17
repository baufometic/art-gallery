import { useEffect, useRef } from "react";
import { Log } from "maximilian";

let noOfManagers = 0; // should remain at 1

const ComponentManager = new function() {
	noOfManagers++;
	__DEV && Log.Testing(`${ noOfManagers } ComponentManager instances running`);
	let components = [];

	const IsValidName = (componentName) => {
		if (componentName === null)					throw new Error("[ComponentManager] componentName passed is null");
		else if (typeof componentName !== "string")	throw new Error("[ComponentManager] componentName passed is not a string");
		else if (componentName === "")				throw new Error("[ComponentManager] componentName passed is empty string");
		return(true);
	};

	const Lifecycle = new function() {
		let mountedCount = 0;
		let unmountedCount = 0;
		let overallCount = 0;

		const GetCountStr = () => `mounted [${ mountedCount }] | unmounted [${ unmountedCount }] | overall [${ overallCount }]`;

		this.RegisterMounted = (name) => {
			mountedCount++;
			overallCount = mountedCount - unmountedCount;
			__DEV && Log.Mounted(`${ name } ${ GetCountStr() }`);
		};

		this.RegisterUnmounted = (name) => {
			unmountedCount++;
			overallCount = mountedCount - unmountedCount;
			__DEV && Log.Unmounted(`${ name } ${ GetCountStr() }`);
		};
	};

	const NameExists = (name) => components.findIndex(c => c.rawName === name) !== -1;
	const GetMaxCount = (obj) => obj.reduce((prev, current) => (prev.count > current.count) ? prev : current);

	this.Add = (name, payload) => {
		if (!IsValidName(name)) {
			throw new Error("Error setting component name within ComponentManager");
		}

		let count = 0;
		if (NameExists(name)) {
			const filteredItems = components.filter(comp => comp.rawName === name);
			count = GetMaxCount(filteredItems).count + 1;
		}

		const obj = {
			rawName    : name,
			uniqueName : `${ name }__${ count }`,
			count      : count,
			payload    : payload
		};
		
		components.push(obj);
		Lifecycle.RegisterMounted(obj.uniqueName);

		return(obj.uniqueName);
	};

	this.Remove = (name) => {
		const idx = components.findIndex(c => c.uniqueName === name);
		if (idx === -1) {
			throw new Error("Error finding idx of componentName to remove in ComponentManager");
		} else {
			__DEV && Log.Attempt(`Removing idx [${ idx }] in ComponentManager`);
		}

		components.splice(idx, 1);
		Lifecycle.RegisterUnmounted(name);
	};
};

export const useComponent = (componentName = "", onMountFunction, onUnmountFunction, LogRenders = true) => {
	const myName = useRef();

	useEffect(() => {
		myName.current = ComponentManager.Add(componentName);
		if (typeof onMountFunction === "function") onMountFunction();

		return () => {
			ComponentManager.Remove(myName.current);
			if (typeof onUnmountFunction === "function") onUnmountFunction();
		};
	}, []);

	useEffect(() => {
		if (LogRenders) __DEV && Log.Render(myName.current);
	});
};

