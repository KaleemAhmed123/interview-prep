const explorer = {
	id: "1",
	name: "root",
	isFolder: true,
	items: [
		{
			id: "2",
			name: "public",
			isFolder: true,
			items: [
				{
					id: "3",
					name: "static",
					isFolder: true,
					items: [
						{
							id: "4",
							name: "index.html",
							isFolder: false,
							items: [],
						},
						{
							id: "5",
							name: "hello.html",
							isFolder: false,
							items: [],
						},
					],
				},
			],
		},
		{
			id: "7",
			name: "src",
			isFolder: true,
			items: [
				{
					id: "3",
					name: "Comments",
					isFolder: true,
					items: [
						{
							id: "4",
							name: "Comments.js",
							isFolder: false,
							items: [],
						},
						{
							id: "5",
							name: "Comments.css",
							isFolder: false,
							items: [],
						},
					],
				},
				{
					id: "8",
					name: "App.js",
					isFolder: false,
					items: [],
				},
				{
					id: "9",
					name: "Index.js",
					isFolder: false,
					items: [],
				},
				{
					id: "10",
					name: "styles.css",
					isFolder: false,
					items: [],
				},
			],
		},
		{
			id: "11",
			name: "package.json",
			isFolder: false,
			items: [],
		},
	],
};

export default explorer;
