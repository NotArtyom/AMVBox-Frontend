import React from 'react';

import { signIn } from '../store/actions/authAction';
import { connect } from 'react-redux';
import { history } from '../helpers/history'
import Copyright from '../common/Copyright';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

class LoginPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit (e) {
    e.preventDefault();
    this.setState({submitted: true});
    const {email, password} = this.state;
    console.log(this.props);
    if (email && password) {
      this.props.signIn({login: email, pass: password});
    }
  }

  render () {
    const {username, password} = this.state;
    const { classes, auth } = this.props;
    return (
        <div className="col-md-6 col-md-offset-3">
          <Container component="main" maxWidth="xs">
            <CssBaseline/>
              <div className={ classes.paper }>
                <Box display='flex' justifyContent='center'>
                  <Box mr='10px'>
                    <Avatar className={ classes.avatar }>
                      <LockOutlinedIcon/>
                    </Avatar>
                  </Box>
                  <Box  onClick={() => history.push("/")} display='flex' alignItems='center' flexDirection='row' style={{cursor: 'pointer'}}>
                    <Typography variant="h4" className={ classes.title }>AMVBox</Typography>
                  </Box>
                </Box>
                <form className={ classes.form } noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={ username }
                    onChange={ this.handleChange }
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={ password }
                    onChange={ this.handleChange }
                  />
                  <Box mt={1}>
                    <Button
                      type="submit"
                      color="primary"
                      fullWidth
                      variant="contained"
                      className={ classes.submit }
                      onClick={ this.handleSubmit }
                    >
                      Sign In
                    </Button>
                  </Box>
                  <Box mt={ 0.5 }>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="/reg" variant="body2">
                          { 'Don\'t have an account? Sign Up' }
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
          </Container>
        </div>
    );
  }
}

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
    color: '#ffffff'
  },
});

const mapStateToProps = state => {
  return {auth: state.auth};
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (payload) => dispatch(signIn(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(LoginPage));
