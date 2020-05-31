import React from 'react';
import axios from 'axios';

import Copyright from '../common/Copyright';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

class CreatePost extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      link: '',
      description: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  getId (url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  handleSubmit (e) {
    e.preventDefault();
    const {link, description} = this.state;
    if (link && description) {
      const videoId = this.getId(link);
      const linkFormat = '//www.youtube.com/embed/' + videoId;
      console.log(linkFormat);
      axios({
        method: 'POST',
        url: 'http://localhost/posts/create',
        headers: {'Authorization': localStorage.getItem('token')},
        data: {youtubeLink:  linkFormat, description: description}
      });
    }
  }

  render () {
    const {link, description} = this.state;
    const {classes} = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={ classes.paper }>
            <Box display='flex' justifyContent='center'>
              <Box display='flex' alignItems='center' flexDirection='row' style={ {cursor: 'pointer'} }>
                <Typography variant="h4" className={ classes.title }>Create Post</Typography>
              </Box>
            </Box>
            <form className={ classes.form } noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="link"
                label="Youtube Link"
                name="link"
                autoFocus
                value={ link }
                onChange={ this.handleChange }
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows={ 6 }
                name="description"
                label="description"
                type="description"
                id="description"
                value={ description }
                onChange={ this.handleChange }
              />
              <Box mt={ 1 }>
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                  className={ classes.submit }
                  onClick={ this.handleSubmit }
                >
                  Create Post
                </Button>
              </Box>
            </form>
          </div>
          <Box mt={ 8 }>
            <Copyright/>
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

export default (withStyles(useStyles)(CreatePost));
