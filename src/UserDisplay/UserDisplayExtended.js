import React, {useEffect, useState} from 'react';

const UserDisplay = () => {
  const [name, setName] = useState({});
  const [role, setRole] = useState({});
  const [id, setId] = useState({});
  const [email, setEmail] = useState({});

  // useEffect( () => {
  //   setName('Bungalow Bill')
  //   setRole('Admin')
  //   setId('USER_KEY')
  //   setEmail('someuser@gmail.com')
  // }, [])

  async function fetchData() {
    const res = await fetch("/users"); //Access-Control-Allow-Origin
    console.log('error', res)

    res
      .json()
      .then(res => {
          console.log(res)
          const {name = 'name', role = 'role', id = -1, email = 'default@email.com'} = res
          setName(name)
          setRole(role)
          setId(id)
          setEmail(email)
        })
      .catch(err => console.log(err));
  }

  
  useEffect(() => {
    fetchData();
  });

  return (
  <React.Fragment>
    <div>{JSON.stringify(name)}</div>
    <div>{JSON.stringify(role)}</div>
    <div>{JSON.stringify(id)}</div>
    <div>{JSON.stringify(email)}</div>
  </React.Fragment>)
};

export default UserDisplay;