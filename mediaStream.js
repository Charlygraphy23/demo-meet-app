export const getStream = async  () =>{
    const stream = await navigator.mediaDevices.getUserMedia({
        audio : true,
        video : true
    })

    return stream
}

export const createVideo = (stream , userId) => {
    const videoContainer = document.querySelector(".video__container")

    const video = document.createElement('video')
    video.srcObject = stream;
    video.muted = true
    video.autoplay = true
    video.id = userId
    videoContainer.appendChild(video)

}