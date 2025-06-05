let curentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`${folder}/`)
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }

    //show allt he song in playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = " "
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>

        <img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div> ${song.replaceAll("%20", " ")}</div>
                                <div>Krish2Good</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div>

        
        </li>`;
    }

    //attach a event listion to each songs
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })

    })
    return songs;
}

const playMusic = (track, pause = false) => {
    curentSong.src = `/${currFolder}/` + track
    if (!pause) {
        curentSong.play();
    }
    play.src = "img/pause.svg"
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

//this albums is also use in add multiple items in my D&S electronics
async function displayAlbums() {
    let a = await fetch(`/musics/`)
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(anchors)

    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/musics")) {
            let folder = e.href.split("/").slice(-2)[0]
            //get meta data
            let a = await fetch(`/musics/${folder}/info.json`)
            let response = await a.json();
            console.log(response);
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
                <div class="play">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" stroke-width="1.5"
                            stroke-linejoin="round" />
                </svg>
            </div>
            <img src="musics/${folder}/cover.jpg" alt="">
            <h2>${response.title}</h2>
            <p>${response.descrition}</p>
        </div>`
        }
    }

    //load the playlist by click
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log("fetching songs");
            songs = await getSongs(`musics/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])
        })
    })

    console.log(anchors);
}

async function main() {

    //get songs
    await getSongs("musics/ncs")
    playMusic(songs[0], true);

    //disply all the dynamical albums
    displayAlbums()

    //attach n event listner to play next and previous
    play.addEventListener("click", () => {
        if (curentSong.paused) {
            curentSong.play()
            play.src = "img/pause.svg"
        }
        else {
            curentSong.pause()
            play.src = "img/play.svg"
        }
    })

    //listion for time update event
    curentSong.addEventListener("timeupdate", () => {
        console.log(curentSong.currentTime, curentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(curentSong.currentTime)} / ${secondsToMinutesSeconds(curentSong.duration)}`
        document.querySelector(".cicle").style.left = (curentSong.currentTime / curentSong.duration) * 100 + "%"
    })

    //add an evnet for seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".cicle").style.left = percent + "%";
        curentSong.currentTime = ((curentSong.duration) * percent) / 100
    })

    // Add an event listion for hamberger function
    document.querySelector(".hamberger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    //eventlistion for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    //add an event lisnter to pervios
    previous.addEventListener("click", () => {
        let index = songs.indexOf(curentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    //next
    next.addEventListener("click", () => {
        let index = songs.indexOf(curentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })


}

main();