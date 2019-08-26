import React, {useRef} from 'react'
import { withLDConsumer } from 'launchdarkly-react-client-sdk';

const UserEntry = ({ flags, ldClient  }) => {
  const refUserName = useRef()
  const enterUser = () => {
    ldClient.identify({
        key: refUserName.current.value,
    email:"mvillaronga+ls1@cfchildren.org"
  })    
  console.log('fired:', ldClient.getUser())
}
const tmp = flags.userdetails
  return (
    <React.Fragment>
      <div>User ID</div>
      {tmp && <div>Flag on</div>}
      <input type="text" ref={refUserName} />
      <button onClick={enterUser}>click Me</button>
    </React.Fragment>
  )
}

export default withLDConsumer()(UserEntry)