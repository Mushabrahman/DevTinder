import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'



function Profile() {

 let user = useSelector(store=>store.user);

  return (
    <div className=''>
     <EditProfile user={user}/>
    </div>
  )
}

export default Profile
