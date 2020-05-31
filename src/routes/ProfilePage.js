import React, { Component, useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import ProfileCard from '../components/ProfileCard';
import PicUpload from '../components/PicUpload';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { profile } from '../store/actions/profileAction';
import { connect } from 'react-redux';
import * as axios from 'axios';

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

function ProfilePage (props) {
  const [pic,setPic ] = React.useState(false);
  const [picForm,setPicForm ] = React.useState(false);
  const [profileFetched, setProfileFetched] = React.useState( false);

  useEffect(() => {
      if (!props.profile.fetched) {
        props.profile()
      }
    },[]
  );

  const styles = useStyles();
  return (
    <div>
      <Box className={ styles.container }>
        {props.prof.fetching && <div> Loading ... </div>}
        {!props.prof.fetched && <div> Error occured </div>}
        {picForm ? <PicUpload/> : <ProfileCard props={props.prof.profile}/>}
        {!props.prof.profile.fileInfo && <Button  color="secondary" onClick={() => setPicForm(!picForm)}>Set Profile Pic</Button>}
      </Box>
    </div>
  );
}

const mapStateToProps = state => {
  return {prof: state.prof};
};

const mapDispatchToProps = (dispatch) => {
  return {
    profile: () => dispatch(profile)
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);
