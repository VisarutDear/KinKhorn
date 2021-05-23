import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright Reserve © '}
      <Link color="inherit" href="https://material-ui.com/">
        KinKhorn
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MonetizationOnIcon  />
        </Avatar>
        <Typography component="h1" variant="h5">
          Top Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Top Up Amount"
            name="Top Up Amount"
            autoComplete="amount"
            autoFocus
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Confirm
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
// import React, { useReducer, useEffect } from 'react';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// import TextField from '@material-ui/core/TextField';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import CardHeader from '@material-ui/core/CardHeader';
// import Button from '@material-ui/core/Button';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       width: 600,
//       margin: `${theme.spacing(0)} auto`
//     },
//     // root: {
//     //   maxWidth: 500
//     // },
  

//     loginBtn: {
//       marginTop: theme.spacing(2),
//       flexGrow: 1
//     },
//     header: {
//       textAlign: 'center',
//       background: '#212121',
//       color: '#fff'
//     },
//     card: {
//       marginTop: theme.spacing(10)
//       // maxWidth: 500
//     }
//   })
// );

// //state type

// type State = {
//   username: string
//   password:  string
//   isButtonDisabled: boolean
//   helperText: string
//   isError: boolean
// };

// const initialState:State = {
//   username: '',
//   password: '',
//   isButtonDisabled: true,
//   helperText: '',
//   isError: false
// };

// type Action = { type: 'setUsername', payload: string }
//   | { type: 'setPassword', payload: string }
//   | { type: 'setIsButtonDisabled', payload: boolean }
//   | { type: 'loginSuccess', payload: string }
//   | { type: 'loginFailed', payload: string }
//   | { type: 'setIsError', payload: boolean };

// const reducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case 'setUsername': 
//       return {
//         ...state,
//         username: action.payload
//       };
//     case 'setPassword': 
//       return {
//         ...state,
//         password: action.payload
//       };
//     case 'setIsButtonDisabled': 
//       return {
//         ...state,
//         isButtonDisabled: action.payload
//       };
//     case 'loginSuccess': 
//       return {
//         ...state,
//         helperText: action.payload,
//         isError: false
//       };
//     case 'loginFailed': 
//       return {
//         ...state,
//         helperText: action.payload,
//         isError: true
//       };
//     case 'setIsError': 
//       return {
//         ...state,
//         isError: action.payload
//       };
//   }
// }

// const Login = () => {
//   const classes = useStyles();
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     if (state.username.trim() && state.password.trim()) {
//      dispatch({
//        type: 'setIsButtonDisabled',
//        payload: false
//      });
//     } else {
//       dispatch({
//         type: 'setIsButtonDisabled',
//         payload: true
//       });
//     }
//   }, [state.username, state.password]);

//   const handleLogin = () => {
//     if (state.username === 'abc@email.com' && state.password === 'password') {
//       dispatch({
//         type: 'loginSuccess',
//         payload: 'Login Successfully'
//       });
//     } else {
//       dispatch({
//         type: 'loginFailed',
//         payload: 'Incorrect username or password'
//       });
//     }
//   };

//   const handleKeyPress = (event: React.KeyboardEvent) => {
//     if (event.keyCode === 13 || event.which === 13) {
//       state.isButtonDisabled || handleLogin();
//     }
//   };

//   const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
//     (event) => {
//       dispatch({
//         type: 'setUsername',
//         payload: event.target.value
//       });
//     };

//   const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
//     (event) => {
//       dispatch({
//         type: 'setPassword',
//         payload: event.target.value
//       });
//     }
//   return (
//     <form className={classes.container} noValidate autoComplete="off">
//       <Card className={classes.card}>
//         <CardHeader className={classes.header} title="Card Top Up" />
//         <CardContent>
//           <div>
//             {/* <TextField
//               error={state.isError}
//               fullWidth
//               id="Username"
//               type="email"
//               label="Username"
//               placeholder="Username"
//               margin="normal"
//               onChange={handleUsernameChange}
//               onKeyPress={handleKeyPress}
//             />
//             <TextField
//               error={state.isError}
//               fullWidth
//               id="password"
//               type="password"
//               label="Password"
//               placeholder="Password"
//               margin="normal"
//               helperText={state.helperText}
//               onChange={handlePasswordChange}
//               onKeyPress={handleKeyPress}
//             /> */}
//             <TextField
//               error={state.isError}
//               // fullWidth
//               id="Top Up Amount"
//               type="Top Up Amount"
//               label="Top Up Amount"
//               placeholder="Top Up Amount"
//               margin="normal"
//               helperText={state.helperText}
//               onChange={handlePasswordChange}
//               onKeyPress={handleKeyPress}
//             />
//           </div>
//         </CardContent>
//         <CardActions>
//           <Button
//             variant="contained"
//             size="large"
//             color="secondary"
//             className={classes.loginBtn}
//             onClick={handleLogin}
//             disabled={state.isButtonDisabled}>
//             Confirm
//           </Button>
//         </CardActions>
//       </Card>
//     </form>
//   );
// }

// export default Login;

