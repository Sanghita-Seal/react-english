import React , {useContext} from 'react'
import UserContext from '../context/UserContext.js'
function Profile() {

    const {user} = React.useContext(UserContext);

    if(!user) return <div>Not logged in!!</div>;
  return (
    <div>Profile : {user.username}</div>
  )
}

export default Profile  