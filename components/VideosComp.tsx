import ButtonFav from "../islands/buttonfav.tsx"

export type video={
title:string,
thumbnail: string,
description: string,
duration: number,
youtubeid: string,
date: string,
id: string,
fav: boolean
}
export type propsVideos={
    videos:video[],
    name:string,
    userid:string,
}





export default function CompVideos(props:propsVideos){
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
            <div class="video-page-container">
                <h1 class="video-list-title">Curso Deno Fresh</h1>
                <div class="video-list-container">
                    {props.videos.map((char)=>(
                    <div class="video-item" data-fresh-key={char.id}>
                    <a href={`/video/${char.id}`} class="video-link">
                        <img src={char.thumbnail} alt={char.title}class="video-thumbnail"/>
                        <div class="video-info">
                            <h3 class="video-title">{char.title}</h3>
                            <p class="video-description">{char.description}</p>
                            <p class="video-release-date">Release date: {char.date}</p>
                        </div>
                    </a>
                    <ButtonFav
                    fav={char.fav}
                    userid={props.userid}
                    videoid={char.id}/>
                </div>
                    ))}
                </div>
            </div>
        </div>
    </body>
</html>

    );
}