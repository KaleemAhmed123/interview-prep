import React, { useState } from "react";

const Items = ({ data, insertNew, deleteCurr }) => {
	const [expand, setExpand] = useState(true);
	const [showInput, setShowInput] = useState({
		visible: false,
		isFolder: null,
	});

	const handleNewInput = (e, isFolder) => {
		e.stopPropagation(); // Corrected method name
		// fixed else nothing will be shown so show input and expand chids
		setExpand(true);

		setShowInput({ visible: true, isFolder });
	};

	const addNewFoldernFile = (e) => {
		if (e.key == "Enter" && e.target.value) {
			setShowInput({ ...showInput, visible: false });
			// addNew filenFolder
			insertNew(data, data.id, e.target.value, showInput.isFolder);
		}
	};

	const handleDelete = (e, id) => {
		setShowInput({ ...showInput, visible: false });
		e.stopPropagation();
		console.log("getting clicked ... " + data.id + id);
		deleteCurr(main, id);
	};

	if (data.isFolder) {
		return (
			<div>
				<div className="folder" onClick={() => setExpand(!expand)}>
					<span> 📂{data.name}</span>
					{/* button next to folder */}
					<div>
						<button onClick={(e) => handleNewInput(e, true)}>📂</button>
						<button onClick={(e) => handleNewInput(e, false)}>📄</button>
						{/* <button onClick={(e) => handleDelete(e, data.id)}>🗑️</button> */}
					</div>
				</div>
				{/*  */}
				<div className={`subitems ${expand ? "" : "hide"}`}>
					{showInput.visible && (
						<div className="inputContainer">
							<span>{showInput.isFolder ? "📂" : "📄"}</span>
							<input
								type="text"
								className="input"
								autoFocus
								onBlur={() => setShowInput({ ...showInput, visible: false })}
								onKeyDown={(e) => addNewFoldernFile(e)}
							/>
						</div>
					)}

					{data?.items?.map((sub) => {
						return (
							<Items
								data={sub}
								insertNew={insertNew}
								deleteCurr={deleteCurr}
								key={sub.id}
							/>
						);
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
