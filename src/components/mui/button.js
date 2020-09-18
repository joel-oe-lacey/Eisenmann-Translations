import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

export default function Palette() {
  return (
    <ThemeProvider theme={theme}>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
    </ThemeProvider>
  );
}