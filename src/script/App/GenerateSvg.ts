export interface CMYKColor {
  C: number,
  M: number,
  Y: number,
  K: number,
}

export interface RGBColor {
  R: number,
  G: number,
  B: number,
}

export const generateCommand = (CMYKColor: CMYKColor, RGBColor: RGBColor, fileName: string) => {
  let svgText = `
    <svg version="1.1" id="Layer_1"
       xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1600px"
       height="1600px"
       viewBox="0 0 1600 1600" enable-background="new 0 0 1600 1600" xml:space="preserve"
    >
      <rect width="100%" height="100%" fill="rgb(${RGBColor.R}, ${RGBColor.G}, ${RGBColor.B})" />
      <text transform="matrix(1 0 0 1 60.0039 231.0005)"><tspan x="0" y="0" style="font-family:'MyriadPro-Regular'; font-size:200;">C${CMYKColor.C} M${CMYKColor.M} </tspan><tspan x="0" y="240" style="font-family:'MyriadPro-Regular'; font-size:200;">Y${CMYKColor.Y} K${CMYKColor.K}</tspan></text>
    </svg>
  `;

  svgText = svgText.replace(/(\r\n|\n|\r)/gm,'');

  return `echo '${svgText}' > ${fileName}`;
}
