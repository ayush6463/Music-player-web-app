console.log("Lets write JavaScript")

let currentSong= new Audio();
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


async function getSongs(folder){
    currFolder=folder
    let a= await fetch(`${folder}/`)
    let response= await a.text();
    
    let div= document.createElement("div")
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    let songs=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/${folder}/`)[1].replaceAll("%20"," "))
            
        }
        
    }
     
    let songUL= document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML=""
    for (const song of songs) {
        songUL.innerHTML= songUL.innerHTML + `
        <li>
        <img class="invert" src="img/music.svg" alt=""> 
        <div class="info">
            <div>${song.replaceAll("%20"," ")}</div>
            <div>Top 50</div>
            
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="img/playnow.svg" alt="">
            
        </div>
    
    </li>`
        
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML)
        })
      
    })
    playMusic(songs[0],true)

return songs
}

function playMusic(track, pause=false){
   
    currentSong.src= `/${currFolder}/` + track
  
    
  play.src="img/pause.svg"
    
    currentSong.play()
    
    
    document.querySelector(".songinfo").innerHTML=track
    document.querySelector(".songtime").innerHTML="00:00/00:00"
    
}


    

async function main(){

    
   

    await getSongs("songs/f1")
    console.log(songs)
    

    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src="img/pause.svg"
            
        }
        else{
            currentSong.pause()
            play.src="img/playnow.svg"
        }
    })
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })
    
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    
next.addEventListener("click",()=>{
    console.log("next")
    
    let i= songs.indexOf(currentSong.src.split("/").slice(-1)  [0].replaceAll("%20"," "))
    
    if(i>=songs.length-1){
        playMusic(songs[0])
    }
    else{
       playMusic(songs[i+1])
    }
    
})

prev.addEventListener("click",()=>{
    console.log("prev")
    
    let i= songs.indexOf(currentSong.src.split("/").slice(-1)  [0].replaceAll("%20"," "))
    if(i<=0){
        playMusic(songs[songs.length-1])
    }
    else{
       playMusic(songs[i-1])
    }
    
})


document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left="0"
})


document.querySelector(".back").addEventListener("click",()=>{
    document.querySelector(".left").style.left="-112%"
})


Array.from(document.getElementsByClassName("card")).forEach(e=>{
    e.addEventListener("click",async item=>{
        
        songs= await getSongs(`songs/${item.currentTarget.dataset.folder}`)
       
        
    })

})


}



main()   


