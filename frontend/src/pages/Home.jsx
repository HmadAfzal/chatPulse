import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import MainComponent from '../components/MainComponent'

const Home = ({socket, setSocket}) => {
  const [userData, setUserData]=useState(null);
  const [count, setCount]=useState();
const getData=(data, count)=>{
setUserData(data);
setCount(count)
}
  return (
   <>
   <Header getData={getData}/>
   <MainComponent Uname={userData?.name} Uemail={userData?.email} Uid={userData?._id} count={count} socket={socket} setSocket={setSocket}/>
   </>
  )
}

export default Home