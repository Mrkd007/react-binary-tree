import React, { useState } from "react";
import "./App.css";
import InputForm from "./components/inputForm";
import TreeBubble from "./components/treeBubble";

function App() {
	const [inputArr, setInputArr] = useState([
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	]);
	const [currentParent, updateParent] = useState([]);
	const [activeChildId, updateActiveChildId] = useState("");
	const [selectedChild, setSelectedChild] = useState("");
	const [selectedParetArr, setSelectedParentArr] = useState([]);

	let treeObj = {};

	// ignoring the greater value
	let obj = {};

	const createBinaryTree = (array, obj, parentArrData) => {
		let ts = "parent" + array[0];
		let tempArr = [...array];
		obj.value = tempArr.shift();
		obj.parentArrData = [...parentArrData];
		obj.id = ts;
		let length = tempArr.length / 2;
		let leftArr = tempArr.slice(0, length),
			rightArr = tempArr.slice(length);
		if (leftArr.length) {
			obj.left = createBinaryTree(leftArr, {}, [...parentArrData, ts]);
		}
		if (rightArr.length) {
			obj.right = createBinaryTree(rightArr, {}, [...parentArrData, ts]);
		}
		return obj;
	};
	const tree = createBinaryTree(inputArr, obj, []);

	// let previousNumber = "";
	// considering the greater value actual concept (unfinished)
	// const createTree = (objData, number, parentArrData = []) => {
	// 	if (objData.value === undefined) {
	// 		objData.value = number;
	//    previousNumber = number;
	// 	} else if (number > objData.value) {
	// 		if (objData.right === undefined) {
	// 			objData.right = { value: number, parentArrData: [...parentArrData, number] };
	// 		} else {
	// 			objData.right = createTree(objData.right, number);
	// 		}
	// 	} else {
	// 		if (objData.left === undefined) {
	// 			objData.left = { value: number };
	// 		} else {
	// 			objData.left = createTree(objData.left, number);
	// 		}
	// 	}
	// 	return objData;
	// }

	// inputArr.forEach((inputElm) => {
	// 	inputElm = parseInt(inputElm);
	// 	createTree(treeObj, inputElm);
	// });

	const createBubbleData = (obj, parentArr = []) => {
		let objKeys = Object.keys(obj);
		return (
			<>
				{objKeys.map((key, i) => {
					let currVal = obj[key];
					let parentData = obj["parentArrData"];
					let currId = obj.id;
					if (currVal && typeof currVal === "number") {
						parentArr.push(currVal);
					}
					return (
						<React.Fragment key={i}>
							{currVal && typeof currVal === "number" ? (
								<div className='circle-bubble'>
									<TreeBubble
										value={currVal}
										parentVal={parentData}
										id={currId}
										updateParent={updateParent}
										activeParent={currentParent.indexOf(currId) > -1}
										activeChildId={activeChildId}
										updateActiveChildId={updateActiveChildId}
										setSelectedParentArr={setSelectedParentArr}
										setSelectedChild={setSelectedChild}
									/>
								</div>
							) : (
								<></>
							)}
							{currVal && key === "left" && typeof currVal === "object" ? (
								<div className='circle-bubble-left'>
									{createBubbleData(currVal, parentArr)}
								</div>
							) : (
								<></>
							)}
							{currVal && key === "right" && typeof currVal === "object" ? (
								<div className='circle-bubble-right'>
									{createBubbleData(currVal, parentArr)}
								</div>
							) : (
								<></>
							)}
						</React.Fragment>
					);
				})}
			</>
		);
	};

	let str = "",
		nextstr = "";

	if (selectedChild !== "") {
		str += "Selected child is : " + selectedChild;
	}
	if (selectedParetArr.length) {
		nextstr +=
			"Selected parents are : " +
			selectedParetArr.toString().replace(/parent/g, "");
	}

	return (
		<div className='app-container'>
			<InputForm setInputArr={setInputArr} />
			<div className='bubble-conatiner'>
				{inputArr.length && createBubbleData(tree)}
			</div>
			<hr style={{ marginBottom: "40px", transform: "translateY(20px)" }} />
			<h3>{str}</h3>
			<h3>{nextstr}</h3>
		</div>
	);
}

export default App;
