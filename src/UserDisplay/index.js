import React from 'react';
import { withLDConsumer } from 'launchdarkly-react-client-sdk';
import UserDisplay from './UserDisplay'
import UserDisplayExtended from './UserDisplayExtended'

const UserDisplayController = ({ flags }) => {
  const { userDetails } = flags

  return !userDetails ? 
    <UserDisplay />
    : <UserDisplayExtended />
};

export default withLDConsumer()(UserDisplayController);