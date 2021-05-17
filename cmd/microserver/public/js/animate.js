// 
// Map Layer Drawing Code
// 

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
function renderSVGPromiseWrapper(layerName, type, duration) {
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

		// await renderSVGPromiseWrapper('roads', "scenario-sync", 10);
		// await renderSVGPromiseWrapper('parks', "sync", 120);
		// await renderSVGPromiseWrapper('buildings', "delayed", 120);
		// await renderSVGPromiseWrapper('trees', "sync", 15);
		// await renderSVGPromiseWrapper('blocks', "scenario-sync", 5);
		// await renderSVGPromiseWrapper('lots', "sync", 10);


		// console.log('animation complete.');
	} catch (error) {
		console.error("ERROR:" + error);
	}
}


// 
// Text Animation Code
// 

async function playTextAnimations(){
	await new Promise(r => setTimeout(r, 1000));
	await animateText('road and rail connections...');
	await new Promise(r => setTimeout(r, 1000));
	await renderSVGPromiseWrapper('roads', "scenario-sync", 10);
	
	await new Promise(r => setTimeout(r, 4000));
	await animateText('sports grounds...');
	await new Promise(r => setTimeout(r, 1000));
	await renderSVGPromiseWrapper('parks', "sync", 120);

	await new Promise(r => setTimeout(r, 4000));
	await animateText('amenities and offices...');
	await new Promise(r => setTimeout(r, 1000));
	await renderSVGPromiseWrapper('buildings', "delayed", 120);

	await new Promise(r => setTimeout(r, 4000));
	await animateText('parks and tree-lined streets...');
	await new Promise(r => setTimeout(r, 1000));
	await renderSVGPromiseWrapper('trees', "sync", 10);
	
	await new Promise(r => setTimeout(r, 4000));
	await animateText('but most of all...');
	
	// await new Promise(r => setTimeout(r, 1000));
	await animateText('it needs YOU');
	await new Promise(r => setTimeout(r, 1000));
	await renderSVGPromiseWrapper('blocks', "scenario-sync", 5);
	await renderSVGPromiseWrapper('lots', "sync", 10);

}


function animateText(content) {
	// $(".typewriter").empty();
	var ele = '<span>' + content.split('').join('</span><span>') + '</span>';
	$(ele).hide().appendTo('.typewriter').each(function(i) {
		$(this).delay(10 * i).css({
			display: 'inline',
			opacity: 0
		}).animate({
			opacity: 1
		}, 100);
	});
	$(".typewriter").append("</br>")
}



//