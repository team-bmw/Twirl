import { createMuiTheme } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';

// setting up the theme for Material-UI (will be updated later)
export default createMuiTheme({
  palette: {
    primary: {
      light: blue[100],
      main: blue[500],
      dark: blue[900],
      contrastText: blue[50],
    },
    secondary: {
      light: blueGrey[100],
      main: blueGrey[500],
      dark: blueGrey[900],
      contrastText: blueGrey[50],
    },
    background: {
      default: blue[500],
    },
    default: grey[50],
  },
});
