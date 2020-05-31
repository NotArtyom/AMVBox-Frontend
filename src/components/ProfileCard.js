import React, { useEffect } from 'react';
import { history } from '../helpers/history';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import * as axios from 'axios';


const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 400,
    minHeight: 500,
    textAlign: 'center',
    maxWidth: '50%',
    maxHeight: '50%'
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 'auto',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 18,
    color: palette.grey[500],
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 16,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}));

const ProfileCard = ({props}) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardContent>
        {(!props.fileInfo) ?
        <Avatar className={styles.avatar} src={'https://i.pravatar.cc/300'}/> :
          <Avatar className={styles.avatar} src={'http://localhost/files/' + props.fileInfo.storageFileName}/>}
        <h3 className={styles.heading}>{props.name} {props.surname}</h3>
        <span className={styles.subheader}>Our User Number: {props.id}</span>
      </CardContent>
      <Divider light />
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} >
          <p className={styles.statLabel}>Likes You Gave</p>
          {props.likes && <p className={styles.statValue}>{props.likes.length}</p>}
        </Box>
        <Box p={2} flex={'auto'} >
          <p className={styles.statLabel}>Dislikes You Gave</p>
          {props.dislikes && <p className={styles.statValue}>{props.dislikes.length}</p>}
        </Box>
      </Box>
      <Box>
        <Button onClick={() => history.push('/myposts')}>My Posts</Button>
      </Box>
    </Card>
  );
};


export default ProfileCard;
