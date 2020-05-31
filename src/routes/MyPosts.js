import React, { useEffect } from 'react';
import axios from 'axios';

import Post from '../components/Post';
import { history } from '../helpers/history';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';

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

const useStyles = theme => ({
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
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class MyPosts extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: 'http://localhost/posts/' + this.props.prof.profile.id,
      headers: {'Authorization': localStorage.getItem('token')},
    }).then((data) => this.setState({posts: data.data}));
  }

  render () {
    const {classes} = this.props;
    const {posts} = this.state;
    console.log(posts);
    return (
      <React.Fragment>
        <CssBaseline/>
        <main className={ classes.main }>
          {/* Hero unit */ }
          <div className={ classes.heroContent }>
            <Container maxWidth="xs">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                MyPosts
              </Typography>
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
                  <Post youtubeLink={ post.youtubeLink } description={ post.description } likeCount={ post.likeCount }
                        dislikeCount={ post.dislikeCount } postId={post.ownerId}/>
                </Grid>
              )) }
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {prof: state.prof};
};

export default connect(mapStateToProps)(withStyles(useStyles)(MyPosts));

