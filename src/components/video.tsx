import React, { RefObject, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import useMediaStream from '../hooks/useMediaStream'
import { addUser } from '../store/actions'

type Props = {
    ownVideo: boolean
}

const Video = ({ ownVideo }: Props) => {

    const ref = useRef<HTMLVideoElement>(null)
    const mediaStream = useMediaStream()
    const dispatch = useDispatch()


    useEffect(() => {

        if (!mediaStream) return;

        if (mediaStream && ref.current && !ref.current.srcObject) {
        console.log(ownVideo)

            ref.current.srcObject = mediaStream;
            ref.current.muted = ownVideo;
            ref.current.autoplay = true
            
        }


    }, [mediaStream])

    return (
        <video ref={ref}></video>
    )
}

export default Video