import  { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 } from 'uuid'
import Video from '../components/video'
import {StoreType} from '../store'
import { addUser } from '../store/actions'
import { peer } from '../utils/peer'

const PreviewPage = () => {

    const params = useParams()
    const navigate = useNavigate()
    const {socket} = useSelector((store : StoreType) => store.SocketReducer)
    const {activeUsers} = useSelector((store : StoreType) => store.UserReducer)
    const ref = useRef()

    const dispatch = useDispatch()


    useEffect(() => {

        if (!params?.id) return navigate(`/${v4()}` , {
            replace : true
        })


        if(!socket?.active) return;
        socket.on('new-user-joined' , (userId) => {
            console.log("New User Joined trggered" , userId)
            dispatch(addUser({
                id : userId , ownId : false
            }))
        })

    
        return () => {
            socket.off('join-room')
            socket.off('new-user-joined')
            socket.off()
        }

    } , [params?.id])

    useEffect(() => {
        if(!socket?.active) return;

        if(ref.current) return;
        //@ts-expect-error
        ref.current = true

        peer.on('open' , (clientId : any) => {
            console.log("Id" , clientId)
            socket.emit('join-room' , params?.id , clientId)
            dispatch(addUser({
                id : clientId , ownId :true
            }))
        })


    } , [])

    return (
        <div className="video__container">

            {activeUsers.map((user , i)=> <Video key={i} ownVideo={user.ownId}/>)}
           
        </div>
    )
}

export default PreviewPage