import React from 'react';

import { confMe } from '../store/actions/confAction';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { history } from '../helpers/history';

function EmailPage(props){
  let { token } = useParams();
  const classes = useStyles();

    if (!token) {
      return (
        <div className="col-md-6 col-md-offset-3">
          <Container component="main" maxWidth="xl">
            <CssBaseline/>
            <div className={ classes.paper }>
              <Box display='flex' justifyContent='center'>
                <Box mr='10px'>
                  <Avatar className={ classes.avatar }>
                    <LockOpenIcon/>
                  </Avatar>
                </Box>
                <Box display='flex' alignItems='center' flexDirection='row'>
                  <Typography variant="h4" className={ classes.title }>AMVBox</Typography>
                </Box>
              </Box>
              <Box mt={ 15 }>
                <Typography variant="h3" className={ classes.title }>Confirm your registration via Email!</Typography>
              </Box>
            </div>
            <Box mt={ 8 }>
              <Copyright/>
            </Box>
          </Container>
        </div>
      );
    }
    else {
      props.confMe({token: token});
      return (
        <div className="col-md-6 col-md-offset-3">
          <Container component="main" maxWidth="xl">
            <CssBaseline/>
            <div className={ classes.paper }>
              <Box display='flex' justifyContent='center'>
                <Box mr='10px'>
                  <Avatar className={ classes.avatar }>
                    <LockOpenIcon/>
                  </Avatar>
                </Box>
                <Box display='flex' alignItems='center' flexDirection='row'>
                  <Typography variant="h4" className={ classes.title }>AMVBox</Typography>
                </Box>
              </Box>
              <Box mt={ 15 }>
                <Typography variant="h3" className={ classes.title }>Thank you for using AMVBox</Typography>
              </Box>
            </div>
            <Box mt={ 8 }>
              <Copyright/>
            </Box>
          </Container>
        </div>
      )
    }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const mapStateToProps = function (state) {
  return {conf: state.conf};
};

const mapDispatchToProps = function(dispatch) {
  return {
    confMe: (payload) => dispatch(confMe(payload))
  };
};

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      { 'Copyright © ' }
      <Link color="inherit" href="/">
        AMVBox
      </Link>{ ' ' }
      { new Date().getFullYear() }
      { '.' }
    </Typography>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailPage);