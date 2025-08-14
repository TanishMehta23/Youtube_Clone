async function getData() {
    const Topic = document.getElementById('search-text').value;

    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=100&q=${Topic}&key=${API_Key}`
    );

    const data = await res.json();

    const videos = data.items;
    const videosDiv = document.getElementById('videos-div');
    videosDiv.innerHTML = "";

    videos.forEach(element => {
        videosDiv.innerHTML += `
            <div class="hover:bg-gray-200 p-2 hover:rounded-xl hover:cursor-pointer"
                 onclick="playVideo('${element.id.videoId}')">
                <img src="${element.snippet.thumbnails.high.url}" class="rounded-3xl h-40">
                <div class="flex pt-2 gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png"
                        class="w-6 h-6 rounded-full">
                    <p class="font-bold leading-snug line-clamp-2">${element.snippet.title}</p>
                </div>
                <p class="text-gray-600 pl-8">${element.snippet.channelTitle}</p>
                <div class="text-gray-600 pl-8 flex gap-1">
                    <p>1M Views</p>
                    <p>.</p>
                    <p>${new Date(element.snippet.publishedAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
    });
}



// Function to open the video in YouTube
function playVideo(videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
}

