import React, {useState, useEffect} from 'react';
// import axios {axios} from 'axios'

const UserDisplay = () => {
  const [name, setName] = useState({});

  // useEffect( () => {
  //   setName('Bungalow Bill')
  // }, [])

  async function fetchData() {
    const res = await fetch("/users"); //Access-Control-Allow-Origin
    console.log('error', res)
    res
      .json()
      .then(res => {
          console.log("users", res)
          const {name} = res
          setName(name)
        })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  });


  return <div>{JSON.stringify(name)}</div>
};

export default UserDisplay;