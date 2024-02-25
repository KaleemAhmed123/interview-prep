const useTree = (tree) => {
	function insertNode(rootFolder, folderId, item, isFolder) {
		if (rootFolder.id === folderId) {
			if (isFolder) {
				rootFolder.items.unshift({
					id: new Date().getTime(),
					name: item,
					isFolder,
					items: [],
				});
			} else {
				rootFolder.items.push({
					id: new Date().getTime(),
					name: item,
					isFolder,
					items: [],
				});
			}

			return rootFolder;
		}

		rootFolder.items.forEach(function (subFolder) {
			insertNode(subFolder, folderId, item, isFolder);
		});

		return rootFolder;
	}

	// Delete Node
	function deleteNode(rootFolder, folderId) {
		if (rootFolder.id === folderId) {
			rootFolder.items = [];
			return rootFolder;
		}

		rootFolder.forEach(function (sub) {
			deleteNode(sub.items, folderId);
		});
	}

	// Edit Node
	function editNode(rootFolder, folderId, item, isFolder) {
		if (rootFolder.id === folderId) {
			rootFolder.name = item;
			return rootFolder;
		}

		rootFolder.items.forEach(function (subFolder) {
			editNode(subFolder, folderId, item, isFolder);
		});

		return rootFolder;
	}

	return { insertNode, deleteNode, editNode };
};

export default useTree;
