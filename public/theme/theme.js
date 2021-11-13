import { extendTheme, Heading } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Korolev Medium",
    body: "Korolev Medium"
  },
  colors: {
    blue: {
      550: "#0776ef",
      75: "#d9eaff"
    },
  },
  styles: {
    global: {
      body: {
        bg: "black",
        // color: "white",
      }
    }
  },
  layerStyles: {
    checked: {
      background: "blue.550"
    }
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "Fairy Tales JF",
        fontWeight: "normal",
        color: "blue.550"
      },
      defaultProps: {
        size: "3xl"
      }
    },
    Button: {
      baseStyle: {
          borderRadius: "4rem",
          alignSelf:"flex-end"
      },
      variants: {
        solid: {
          bg: "blue.550",
          color: "white",
          textTransform: "uppercase",
          fontSize:"12px",
          _hover: { bg: "green.300" }
        },
      },
      defaultProps: {
        variant: "solid",
        size: "md"
      }
    },
    Badge: {
      variants: {
        subtle: {
          borderRadius: "xl",
          color: "blue.550",
          bg: "blue.75",
          textTransform: "capitalize",
          pl: "0.5rem",
          pr: "0.5rem",
          pt: "0.2rem",
          ml: "2"
        }
      },
      defaultProps: {
        variant: "subtle"
      }
    },
    Modal: {
      baseStyle: {
        p:"6",
        borderRadius:"xl"
      }
    },
    Text: {
      baseStyle: {
        wordBreak: "break-word"
      }
    }
  }
})

export default theme