import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import MainComponent from '../components/MainComponent'

const Home = () => {
  const [userData, setUserData]=useState(null);
  const [count, setCount]=useState();
const getData=(data, count)=>{
setUserData(data);
setCount(count)
}
  return (
   <>
   <Header getData={getData}/>
   <MainComponent Uname={userData?.name} Uemail={userData?.email} Uid={userData?._id} count={count}/>
   </>
  )
}

export default Home