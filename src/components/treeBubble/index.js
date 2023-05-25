import React, { useState } from "react";

const TreeBubble = ({
	value,
	parentVal,
	id,
	updateParent,
	activeParent,
	activeChildId,
	updateActiveChildId,
	setSelectedParentArr,
	setSelectedChild,
}) => {
	const [showParent, setShowParent] = useState(false);
	return (
		<div
			className={
				"circle" +
				(activeChildId === id ? " has-parent" : "") +
				(activeParent ? " active-parent" : "")
			}
			title={parentVal}
			onClick={() => {
				if (activeChildId !== "") {
					setShowParent(false);
					updateParent([]);
					updateActiveChildId("");
					setSelectedChild("");
					setSelectedParentArr([]);
				} else {
					setShowParent(true);
					updateParent(parentVal);
					updateActiveChildId(id);
					setSelectedChild(value);
					setSelectedParentArr(parentVal);
				}
			}}
		>
			{value}
		</div>
	);
};

export default TreeBubble;
