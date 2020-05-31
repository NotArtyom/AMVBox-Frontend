import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Post from '../components/Post';
import { history } from '../helpers/history';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      { 'Copyright © ' }
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{ ' ' }
      { new Date().getFullYear() }
      { '.' }
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  main: {
    backgroundColor: '#eeeeee'
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function MainPage (props) {
  const classes = useStyles();
  const [posts,setPosts] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost/posts/',
    }).then((data) => setPosts(data.data));

  }, []);

  return (
    <React.Fragment>
      <CssBaseline/>
      <main className={ classes.main }>
        {/* Hero unit */ }
        <div className={ classes.heroContent }>
          <Container maxWidth="xs">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              AMVBox
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              It is not just a website. It is not just a fun page. It is a soul, an inspiration, an excitement. For the
              ones, that are obsessed with AMV
            </Typography>
            { !localStorage.getItem('token') &&
            <div className={ classes.heroButtons }>
              <Grid container spacing={ 2 } justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={ () => history.push('/reg') }>
                    sign Up
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={ () => history.push('/login') }>
                    sign In
                  </Button>
                </Grid>
              </Grid>
            </div>
            }
          </Container>
        </div>
        <Container className={ classes.cardGrid } maxWidth="md">
          {/* End hero unit */ }
          <Grid container
                direction="column"
                justify="flex-start"
                alignItems="center" spacing={ 5 }>
            { posts.map((post) => (
              <Grid item key={ post } xs={ 15 } sm={ 14 } md={ 7 }>
                {console.log(post)}
                <Post youtubeLink={ post.youtubeLink } description={ post.description } likeCount={ post.likeCount }
                      dislikeCount={ post.dislikeCount } postId={post.ownerId} user={post.userDTO}/>
              </Grid>
            )) }
          </Grid>
        </Container>
      </main>
      {/* Footer */ }
      <footer className={ classes.footer }>
        <Typography variant="h6" align="center" gutterBottom>
          AMV
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Thanks For Using AMVBox
        </Typography>
        <Copyright/>
      </footer>
      {/* End footer */ }
    </React.Fragment>
  );
}
