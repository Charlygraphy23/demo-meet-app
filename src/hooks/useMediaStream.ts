import  { useCallback, useEffect, useState } from 'react'

const useMediaStream = () => {
    const [stream , setStream] = useState<MediaStream | null>(null)


    const getStream = useCallback(async ()=> {

        const videoStream = await navigator.mediaDevices.getUserMedia({
            video : true,
            audio : true
        })

        setStream(videoStream)


    } , [])


    useEffect(() => {
        getStream()

        return () => {
            stream?.getTracks().forEach(track => track.stop())
        }
    } , [])

    return stream
  
}

export default useMediaStream