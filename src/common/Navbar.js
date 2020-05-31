import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles, fade } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import pink from '@material-ui/core/colors/pink';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LocalizedStrings from 'react-localization';


import { history } from '../helpers/history';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';

interface Props {
  window?: () => Window;
  //children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    title: {
      cursor: 'pointer'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    grow: {
      flexGrow: 1,
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${ theme.spacing(4) }px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  }),
);

function ScrollTop (props: Props) {
  const {children, window} = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target).ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  };

  return (
    <Zoom in={ trigger }>
      <div onClick={ handleClick } role="presentation" className={ classes.root }>
        { children }
      </div>
    </Zoom>
  );
}

export default function Navbar (props: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [language, setLanguage] = React.useState('en');
  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);
  strings.setLanguage(language);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  const renderMenu = (
    <Menu
      anchorEl={ anchorEl }
      anchorOrigin={ {vertical: 'top', horizontal: 'right'} }
      id={ menuId }
      keepMounted
      transformOrigin={ {vertical: 'top', horizontal: 'right'} }
      open={ isMenuOpen }
      onClose={ handleMenuClose }
    >
      <MenuItem onClick={ () => history.push('/profile') }>{strings.profile }</MenuItem>
      <MenuItem onClick={ () => history.push('/create') }>{strings.createPost }</MenuItem>
      {/*<MenuItem onClick={ () => history.push('/myposts') }>{strings.myPosts }</MenuItem>*/}
      <MenuItem onClick={ () => {
        localStorage.removeItem('token');
        history.push('/login');
      } }>{strings.signOut}</MenuItem>
    </Menu>
  );

    return (
  <React.Fragment>
      <CssBaseline/>
      <AppBar color={ 'primary' }>

        <Toolbar>
          { !props.main ?
            <Typography variant="h6" className={ classes.title } onClick={ () => history.push('/') }>AMVBox</Typography>
           : < Typography variant = "h6" >AMVBox</Typography>
          }
          <div className={ classes.search }>
            <div className={ classes.searchIcon }>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={ {
                root: classes.inputRoot,
                input: classes.inputInput,
              } }
              inputProps={ {'aria-label': 'search'} }
            />
          </div>

          {localStorage.getItem('token') &&
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={language}
            onChange={handleChange}
            className={classes.selectEmpty}
            color="inherit"
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="it">Italiano</MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
          </Select>
          }
          <div className={ classes.grow }/>
          <div className={ classes.sectionDesktop }>
            <Typography variant="h8" className={classes.title} onClick={() => history.push("/tracker")}>
              Covid-19 Tracker
            </Typography>
            {localStorage.getItem('token') && <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={ menuId }
              aria-haspopup="true"
              onClick={ handleProfileMenuOpen }
              color="inherit"
            ><AccountCircle/>
            </IconButton>}
          </div>
        </Toolbar>
      </AppBar>
      { renderMenu }
      <Toolbar id="back-to-top-anchor"/>
      <ScrollTop { ...props }>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon/>
        </Fab>
      </ScrollTop>
    </React.Fragment>);
}

let strings = new LocalizedStrings({
  en:{
    profile:"Profile",
    signOut:"Sign out",
    createPost:"Create Post",
    myPosts: "My Posts",
    },
  it: {
    profile:"Profilo",
    signOut:"Esci",
    createPost:"Aggiungi Post",
    myPosts: "Post miei",
    },
  ru: {
    profile: "Профиль",
    signOut: "Выйти",
    createPost:"Создать пост",
    myPosts: "Мои посты",
  }
});
