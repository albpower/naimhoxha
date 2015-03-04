function listVideos(data) {
	//console.log(data);
    var output = '';
    for (var i=0; i<data.feed.entry.length; i++)
    {
        //titulli
        var title = data.feed.entry[i].title.$t;
        //pershkrimi
        var description = data.feed.entry[i].media$group.media$description.$t;
        //thumbnail
        var thumbnail = data.feed.entry[i].media$group.media$thumbnail[0].url;
        //ID
        var id = data.feed.entry[i].id.$t.substring(38);
        
        output += '<div id="playlist">';
        output += '<a href="#video-player" onclick="playVideo(\''+ id + '\',\'' + title + '\', \'' + escape(description) +'\')" style="text-decoration:none; color:#333" data-role="none" data-transition="none">';
        output += '<p style="border-bottom: solid 3px crimson;"><img class="videoThumb" src="' + thumbnail + '" /></p>';
        output += '<h3 class="videoTitle">' + title + '</h3>';
        output += '</a>';
        output += '</div>';
        output+='<div style="height:15px;background:rgb(210, 215, 217);"></div>';
        $('#playlista').html(output);
    }
}

function playVideo(id, title, description){
    var output = '<iframe src="http://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen class="video-player"></iframe>';
    output += '<h3 class="player-title">' + title + '</h3>';
    output += '<p class="player-description">' + unescape(description) + '</p>';
    
    $('#playeri').html(output);
}


//URL handlers
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    // Mock device.platform property if not available
    if (!window.device) {
        window.device = { platform: 'Browser' };
    }

    handleExternalURLs();
}

function handleExternalURLs() {
    // Handle click events for all external URLs
    if (device.platform.toUpperCase() === 'ANDROID') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            navigator.app.loadUrl(url, { openExternal: true });
            e.preventDefault();
        });
    }
    else if (device.platform.toUpperCase() === 'IOS') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            window.open(url, '_system');
            e.preventDefault();
        });
    }
    else {
        // Leave standard behaviour
    }
}