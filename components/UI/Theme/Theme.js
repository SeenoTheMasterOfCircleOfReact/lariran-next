import { createTheme } from "@mui/material/styles";
import { red, lightBlue, white } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: red[700],
    },
    black: {
      main: "#333",
      contrastText: "#fff",
      lighter: "#555",
    },
    lightBlue: {
      main: lightBlue[500],
      contrastText: "#fff",
    },
    white: {
      main: "#fff",
    },
  },
  direction: "rtl",
  typography: {
    fontFamily: "IRANSansXFaNum",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
            font-family: IRANSansXFaNum;
            font-style: normal;
            font-weight: 100;
            src: url('/fonts/IranSans/woff/IRANSansXFaNum-thin.woff') format('woff'),   
            url('/fonts/IranSans/woff2/IRANSansXFaNum-thin.woff2') format('woff2');		
        }
        @font-face {
            font-family: IRANSansXFaNum;
            font-style: normal;
            font-weight: 200;
            src: url('/fonts/IranSans/woff/IRANSansXFaNum-UltraLight.woff') format('woff'),   
            url('/fonts/IranSans/woff2/IRANSansXFaNum-UltraLight.woff2') format('woff2');	
        }
        @font-face {
            font-family: IRANSansXFaNum;
            font-style: normal;
            font-weight: 300;
            src: url('/fonts/IranSans/woff/IRANSansXFaNum-light.woff') format('woff'),   
            url('/fonts/IranSans/woff2/IRANSansXFaNum-light.woff2') format('woff2');		 
        }
        @font-face {
            font-family: IRANSansXFaNum;
            font-style: normal;
            font-weight: 500;
            src: url('/fonts/IranSans/woff/IRANSansXFaNum-medium.woff') format('woff'),   
            url('/fonts/IranSans/woff2/IRANSansXFaNum-medium.woff2') format('woff2');		 
        }
        @font-face {
            font-family: IRANSansXFaNum;
            font-style: normal;
            font-weight: 600;
            src: url('/fonts/IranSans/woff/IRANSansXFaNum-demibold.woff') format('woff'),   
            url('/fonts/IranSans/woff2/IRANSansXFaNum-demibold.woff2') format('woff2');	 
        }
        @font-face {
            font-family: IRANSansXFaNum;
            font-style: normal;
            font-weight: 800;
            src: url('/fonts/IranSans/woff/IRANSansXFaNum-extrabold.woff') format('woff'),   
            url('/fonts/IranSans/woff2/IRANSansXFaNum-extrabold.woff2') format('woff2');		 
        }
        @font-face {
            font-family: IRANSansXFaNum;
            font-style: normal;
            font-weight: 900;
            src: url('/fonts/IranSans/woff/IRANSansXFaNum-black.woff') format('woff'),   
            url('/fonts/IranSans/woff2/IRANSansXFaNum-black.woff2') format('woff2');		 
        }
        @font-face {
            font-family: IRANSansXFaNum;
            font-style: normal;
            font-weight: bold;
            src: url('/fonts/IranSans/woff/IRANSansXFaNum-bold.woff') format('woff'),   
            url('/fonts/IranSans/woff2/IRANSansXFaNum-bold.woff2') format('woff2');	 
        }
        @font-face {
            font-family: IRANSansXFaNum;
            font-style: normal;
            font-weight: normal;
            src: url('/fonts/IranSans/woff/IRANSansXFaNum-regular.woff') format('woff'),   
            url('/fonts/IranSans/woff2/IRANSansXFaNum-regular.woff2') format('woff2');	
        }
      `,
    },
  },
});
