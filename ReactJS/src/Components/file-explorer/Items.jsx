import React, { useState } from "react";

const Items = ({ data }) => {
	const [expand, setExpand] = useState(true);

	if (data.isFolder) {
		return (
			<div>
				<div className="folder" onClick={() => setExpand(!expand)}>
					<span> 📂{data.name}</span>
					{/* button next to folder */}
					<div>
						<button>+📂</button>
						<button>+📄</button>
					</div>
				</div>
				{/*  */}
				<div className={` {expand ? "hide" : ""} subitems`}>
					{expand &&
						data.items.map((sub) => {
							return <Items data={sub} key={sub.id} />;
						})}
				</div>
			</div>
		);
	} else {
		return (
			<div className="files">
				<span>📄 {data.name}</span>
			</div>
		);
	}
};

export default Items;
