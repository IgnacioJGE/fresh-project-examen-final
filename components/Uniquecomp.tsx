import {video} from "./VideosComp.tsx"
import ButtonFav from "../islands/buttonfav.tsx"


export type videounicoprops={
    video:video,
    name:string,
    userid:string,
}





export default function  CompVideo(props:videounicoprops){
return(
<html>

    <body>
        <div class="page-container">
            <header class="header-container">
                <div class="header-content">
                    <span class="user-name">{props.name}</span>
                    <a class="logout-button">Logout</a>
                </div>
            </header>
            <div class="video-detail-container">
                <a href="/videos" class="back-button">← Go Back to List</a>
                <div class="video-frame">
                    <iframe width="100%" height="400px" src={`https://www.youtube.com/embed/${props.video.youtubeid}`} title={props.video.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <h2 class="video-detail-title">{props.video.title}</h2>
                <p class="video-detail-description">{props.video.description}</p>
                <ButtonFav
                    fav={props.video.fav}
                    userid={props.userid}
                    videoid={props.video.id}/>
            </div>
        </div>
      
    </body>
</html>

);
}