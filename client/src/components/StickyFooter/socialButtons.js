import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
// @material-ui/icons components
// core components

// import componentStylesButtons from "assets/theme/components/button.js";

// const useStylesButtons = makeStyles(componentStylesButtons);

const socialButtonColors = [
  {
    icon: "fab fa-facebook",
    text: "Facebook",
    color: "buttonContainedFacebook",
  },
  {
    icon: "fab fa-twitter",
    text: "Twitter",
    color: "buttonContainedTwitter",
  },
  {
    icon: "fab fa-google-plus-g",
    text: "Google +",
    color: "buttonContainedGoogle",
  },
  {
    icon: "fab fa-instagram",
    text: "Instagram",
    color: "buttonContainedInstagram",
  },
  
  {
    icon: "fab fa-youtube",
    text: "Youtube",
    color: "buttonContainedYoutube",
  },
];

const SocialButtons = () => {
  // const classes = { ...useStylesButtons() };
  return (
    <>
      {socialButtonColors.map((prop, key) => {
        // const buttonRootClasses = { root: classes[prop.color] };
        return (
          <Box
            key={key}
            display="inline-block"
            marginRight="1rem"
            marginBottom="1rem"
          >
            <Button variant="contained" >
              <Box component="i" marginRight=".5rem" className={prop.icon} />
              {prop.text}
            </Button>
          </Box>
        );
      })}
    </>
  );
};

export default SocialButtons;