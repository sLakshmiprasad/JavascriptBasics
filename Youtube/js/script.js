// Searchbar handler

$(function() {
	var searchField = $('#query');
	var icon = $('#searchbutton');


	// Focus event handler
	$(searchField).on('focus', function() {
		$(this).animate({
			width: '100%'
		},400);
		$(icon).animate({
			right: '10px'
		},400);
	});

	//Blur Event Handler
		$(searchField).on('blur', function() {
		 if (searchField.val() == '') {
		 	$(searchField).animate({
		 		width: '45%'
		 	},400);

		 	$(icon).animate({
		 		right: '360px'
		 	}, 400);
		 }
	});

	$('#search-form').submit(function(e) {
		e.preventDefault();
	});	
}); 

//https://www.googleapis.com/youtube/v3/search?part=snippet&q=Adele&key=AIzaSyAf4IEgy469xdmJu7VmYT3wOwpfvZrtwd4

function search() {
	//clear results

	console.log('inside search')

	$('#results').html('');

	$('#buttons').html('');

	// get form input
	q = $('#query').val();

	// Run get request on API

	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet,id',
			q:q,
			type:'video',
			key:'AIzaSyAf4IEgy469xdmJu7VmYT3wOwpfvZrtwd4'},
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				console.log(data);

				$.each(data.items, function(i, item){
					var output = getOutput(item);

					// display results 

					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				$('#buttons').append(buttons);
			}
		);	
}

// Next page fn

function nextPage(){

	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query');


	$('#results').html('');

	$('#buttons').html('');

	// get form input
	q = $('#query').val();

	// Run get request on API

	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet,id',
			q:q,
			pageToken: token,
			type:'video',
			key:'AIzaSyAf4IEgy469xdmJu7VmYT3wOwpfvZrtwd4'},
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				console.log(data);

				$.each(data.items, function(i, item){
					var output = getOutput(item);

					// display results 

					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				$('#buttons').append(buttons);
			}
		);	
}


// Previous page fn

function prevPage(){

	var token = $('#prev-button').data('token');
	var q = $('#prev-button').data('query');


	$('#results').html('');

	$('#buttons').html('');

	// get form input
	q = $('#query').val();

	// Run get request on API

	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet,id',
			q:q,
			pageToken: token,
			type:'video',
			key:'AIzaSyAf4IEgy469xdmJu7VmYT3wOwpfvZrtwd4'},
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				console.log(data);

				$.each(data.items, function(i, item){
					var output = getOutput(item);

					// display results 

					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				$('#buttons').append(buttons);
			}
		);	
}

function getOutput (item) {
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	// Build output String
	var output = '<li>' +
	'<div class="list-left">'+
	'<img src="'+thumb+'">'+
	'</div>' +
	'<div class="list-right">' +
	'<h3> <a data-fancybox class="fancybox fancybox.iframe iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
	'<small>By <span class="cTitle">' + channelTitle+ '</span> on '+videoDate + '</small>'+
	'<p>'+description+'</p>'+
	'</div>'+
	'</li>'+
	'<div class="clearfix"/>'+
	'';

	return output;
}


function getButtons (prevPageToken, nextPageToken) {
	if(! prevPageToken){
		var btnoutput = '<div class="button-container">' +
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' + 'onclick=nextPage();>  Next Page</button></div>';
	} else{
		var btnoutput = '<div class="button-container">' +
		'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' + 'onclick=prevPage();>  Prev Page</button>' +
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' + 'onclick=nextPage();>  Next Page</button></div>';
	}

	return btnoutput;
}