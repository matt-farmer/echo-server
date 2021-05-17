
// 
// renders the specified svg file using the 'invisible pen' efffect
// 
function render(layerName, type, duration, finishedCB) {
	const layer = new Vivus('map-container', {
		file: 'maps/' + layerName + '.svg',
		type: type, //"scenario-sync",
		start: "autostart",
		duration: duration,
		dashGap: 10,
		reverseStack: true,
		forceRender: false
	}, finishedCB);
}

// 
// allows sequencing of async renders 
// 
function renderPromiseWrapper(layerName, type, duration) {
	return new Promise((resolve, reject) => {
		render(layerName, type, duration, (successResponse) => {
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
		document.getElementById("map-container").innerHTML = ""; // clear any existing content
		
		// await renderPromiseWrapper('background', "scenario-sync", 10);
		// await renderPromiseWrapper('trees',"sync", 20);
		await renderPromiseWrapper('roads',"scenario-sync", 10);
		await renderPromiseWrapper('parks',"sync", 120);
		await renderPromiseWrapper('buildings',"delayed", 120);
		await renderPromiseWrapper('trees',"sync", 15);
		await renderPromiseWrapper('blocks',"scenario-sync", 5);
		await renderPromiseWrapper('lots',"sync", 10);

		
		console.log('animation complete.');
	} catch (error) {
		console.error("ERROR:" + error);
	}
}


