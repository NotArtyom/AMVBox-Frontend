import React from 'react';

import { signUp } from '../store/actions/regAction';
import { connect } from 'react-redux';
import { history } from '../helpers/history';
import Copyright from '../common/Copyright';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


class RegisterPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      surname: '',
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
    const {email, password, name, surname} = this.state;
    console.log(this.props);
    if (email && password && name && surname) {
      this.props.signUp({
        login: email,
        pass: password,
        name: name,
        surname: surname
      });
    }
  }

  render () {
    const {email, password, name, surname} = this.state;
    const {classes} = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={ classes.paper }>
          <Box display='flex' justifyContent='center'>
            <Box mr='10px'>
              <Avatar className={ classes.avatar }>
                <LockOutlinedIcon/>
              </Avatar>
            </Box>
            <Box display='flex' cursor='pointer' alignItems='center' flexDirection='row' style={{cursor: 'pointer'}} onClick={() => history.push("/")}>
              <Typography variant="h4" className={ classes.title }>AMVBox</Typography>
            </Box>
          </Box>
          <form className={ classes.form } noValidate>
            <Grid container spacing={ 2 }>
              <Grid item xs={ 12 } sm={ 6 }>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={ name }
                  onChange={ this.handleChange }
                />
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="surname"
                  autoComplete="lname"
                  value={ surname }
                  onChange={ this.handleChange }
                />
              </Grid>
              <Grid item xs={ 12 }>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </Grid>
              <Grid item xs={ 12 }>
                <TextField
                  variant="outlined"
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
              </Grid>
              <Grid item xs={ 12 }>
                <FormControlLabel
                  control={ <Checkbox value="allowExtraEmails" color="primary"/> }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={ classes.submit }
              onClick={ this.handleSubmit }
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={ 5 }>
          <Copyright/>
        </Box>
      </Container>
    );
  }
}

const useStyles = (theme) => ({
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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
    color: '#ffffff'
  },
});

const mapStateToProps = state => {
  return {reg: state.reg};
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (payload) => dispatch(signUp(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(RegisterPage));
