
// 
// renders the specified svg file using the 'invisible pen' efffect
// 
function render(layerName, finishedCB) {
	const layer = new Vivus('map-container', {
		file: 'maps/' + layerName + '.svg',
		type: "scenario-sync",
		start: "autostart",
		duration: 10,
		dashGap: 10,
		reverseStack: true,
		forceRender: false
	}, finishedCB);
}

// 
// allows sequencing of async renders 
// 
function renderPromiseWrapper(layerName) {
	return new Promise((resolve, reject) => {
		render(layerName, (successResponse) => {
			resolve(successResponse);
		}, (errorResponse) => {
			reject(errorResponse);
		});
	});
}

// 
// sets the overall playlist of animation elements
// 
async function playAnimationSequence() {
	try {
		await renderPromiseWrapper('lots');
		await renderPromiseWrapper('roads');
		console.log('animation complete.');
	} catch (error) {
		console.error("ERROR:" + error);
	}
}


