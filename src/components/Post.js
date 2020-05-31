import React from 'react';
import ReadMore from './ReadMore';

import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '50vw'
  },
  cardMedia: {
    minHeight: '300px'
  },
  avatar: {
    width: 30,
    height: 30,
    margin: 'auto',
  },
  likes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: '3%'
  },
});

class Post extends React.Component {
  state = {
    isLikeClicked: false,
    isDisLikeClicked: false,
    likes: this.props.likeCount,
    dislikes: this.props.dislikeCount,
  };

  render () {
    const { classes, description, youtubeLink, postId, user } = this.props;
    const { likes,dislikes } = this.state;
    console.log(user);
    const name = user.name +" "+ user.surname;
    return (
      <div>
        <Card className={ classes.card }>
          { user.fileInfo ?
            < CardHeader
              title={ name }
              avatar={
                <Avatar className={classes.avatar} src={'http://localhost/files/' + user.fileInfo.storageFileName}/>
              }
            />
            :
            < CardHeader
            title={ name }
            // avatar={
            //   // <Avatar className={classes.avatar} src={'http://localhost/files/' + user.fileInfo.storageFileName}/>
            // }
          />
          }

          <CardMedia
            className={ classes.cardMedia }
            component="iframe"
            src={youtubeLink}
            title="Image title"
          />
          <CardContent className={ classes.cardContent }>
            <Typography>
              <ReadMore
                text={ description }/>
            </Typography>
          </CardContent>
          <CardActions className={ classes.likes }>
            <Box onClick={ () => {
              axios({
                method: 'POST',
                url: 'http://localhost/rate',
                headers: {'Authorization': localStorage.getItem('token')},
                data: {postId: postId, like: true}
              }).then((data) => console.log(data));
              this.setState(prevState => ({
                  isLikeClicked: !prevState.isLikeClicked, isDisLikeClicked: false
              }));
            } }>
              { this.state.isLikeClicked ? <ThumbUpAltIcon fontSize='large' color='secondary'/> :
                <ThumbUpAltOutlinedIcon
                  fontSize='large'/> }
            </Box> {likes}
            <Box onClick={ () => {
              axios({
                method: 'POST',
                url: 'http://localhost/rate',
                headers: {'Authorization': localStorage.getItem('token')},
                data: {postId: postId, like: false}
              }).then((data) => console.log(data));
              this.setState(prevState => ({
                isDisLikeClicked: !prevState.isDisLikeClicked, isLikeClicked: false
              }));
            } }>
              { this.state.isDisLikeClicked ? <ThumbDownIcon fontSize='large' color='secondary'/> :
                <ThumbDownAltOutlinedIcon
                  fontSize='large'/> }
            </Box> {dislikes}
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default (withStyles(useStyles)(Post));
