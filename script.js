const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyBEVo404szTU7fAsv_Ia0mIqTwD0xXSLFw";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http="https://www.googleapis.com/youtube/v3/channels?"
let playlist_http="https://www.googleapis.com/youtube/v3/playlists"
let subs_http="https://www.googleapis.com/youtube/v3/subscriptions?"
let search_http="https://www.googleapis.com/youtube/v3/search?"

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostpopular',
    maxResults: 20,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}


//  fetch(playlist_http + new URLSearchParams({
//      key: api_key,
//      part: 'snippet',
//      channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
//      maxResults: 5,
//      regionCode: 'IN'
//  }))
//  .then(res => res.json())
//  .then(data => {console.log(data);
//  })


// fetch(subs_http + new URLSearchParams({
//     key: api_key,
//     part: 'snippet',
//     channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
//     maxResults: 5,
//     regionCode: 'IN'
// }))
// .then(res => res.json())
// .then(data => {console.log(data);
// })

// fetch(search_http + new URLSearchParams({
//     key: api_key,
//     part: 'snippet',
//     maxResults: 5,
//     q:'surfing'
// }))
// .then(res => res.json())
// .then(data => {console.log(data);
// })



const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h6 class="title">${data.snippet.title}</h6>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

