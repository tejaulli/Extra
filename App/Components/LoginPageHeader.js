import * as React from "react"
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
function LoginPageDesign(props) {
  return (
    <Svg width={412} height={281} viewBox="0 0 412 281" {...props}>
      <Defs>
        <ClipPath id="prefix__a">
          <Path
            data-name="Rectangle 158"
            transform="translate(225 149)"
            fill="#fff"
            stroke="#707070"
            d="M0 0h412v281H0z"
          />
        </ClipPath>
      </Defs>
      <G
        data-name="Mask Group 4"
        clipPath="url(#prefix__a)"
        transform="translate(-225 -149)"
      >
        <G transform="translate(225 149)" filter="url(#prefix__b)">
          <Path
            data-name="Path 3"
            d="M-118.116 204.668s92.892 69.5 212.73 53.208c50.212-6.828 83.49-58.794 123.483-64.389 55.3-7.736 126.122 39.542 196.366 28.335 120.9-19.288 156.926-125.936 156.926-125.936l6.832-355.456-696.337 71.831z"
            fill="#05327e"
            opacity={0.68}
          />
        </G>
        <G transform="translate(225 149)" filter="url(#prefix__c)">
          <Path
            data-name="Path 4"
            d="M-166.116 296.423S-117.542 236.5-5.141 220.2 92.017 238.911 203 232.614c73.2-13.381 105.256-66.6 151.83-66.134 58.17-5.38 132.179 62.245 132.179 62.245v-440.294l-653.125 71.83z"
            fill="#1d3557"
          />
        </G>
      </G>
    </Svg>
  )
}

export default LoginPageDesign