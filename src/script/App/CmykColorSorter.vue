<template>
  <div class="cmyk-color-sorter">
    <textarea v-model="inputText" class="w-full h-96"></textarea>
    <div v-for="color in colors"
         :style="`background-color: #${color.hex}`"
         class="w-3 h-3 inline-block"
    >
    </div>
    <div>
      <h2>Copy this</h2>
      <pre>{{ outputText }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import {generateCommand} from "./GenerateSvg";

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

import {ref, computed} from 'vue';
import {getColorHue} from './RGBColorSort';
import colorConvert from 'color-convert';
import {filter, map, flow, values, join} from 'lodash-es';

export default {
  name: "CmykColorSorter",
  setup() {
    const inputText = ref(`
    C100M0Y40K0.jpg\t
C40M20Y20K80.jpg
C0M0Y0K0.jpg
C100M0Y45K34.jpg
C40M20Y20M40K0.jpg
C0M0Y0K70.jpg
C100M100Y100K100.jpg\t
C40M40Y0K0.jpg
C0M0Y0K80.jpg\t\t
C100M20Y100K0.jpg\t
C40M40Y20K80.jpg
C0M0Y0K85.jpg\t\t
C100M20Y100K20.jpg\t
C40M40Y60K0.jpg
C0M0Y100K0.jpg\t\t
C100M20Y20K0.jpg\t
C40M40Y60K20.jpg
C0M0Y11K10.jpg\t\t
C100M20Y20K60.jpg\t
C40M60Y0K0.jpg
C0M0Y2K29.jpg\t\t
C100M20Y40K0.jpg\t
C40M60Y0K40.jpg
C0M100Y100K20.jpg\t
C100M20Y40K40.jpg\t
C40M80Y0K80.jpg
C0M100Y22K5.jpg\t\t
C100M40Y0K0.jpg\t\t
C42M0Y22K0.jpg
C0M100Y45K68.jpg\t
C100M40Y20K0.jpg\t
C42M27Y28K30.jpg
C0M100Y46K3.jpg\t\t
C100M60Y0K0.jpg\t\t
C42M30Y40K0.jpg
C0M100Y54K46.jpg\t
C100M60Y0K40.jpg\t
C46M49Y0K0.jpg
C0M100Y60K0.jpg\t\t
C100M60Y0K52.jpg\t
C49M47Y0K0.jpg
C0M100Y80K0.jpg\t\t
C100M80K0Y0.jpg\t\t
C4M68Y0K0.jpg
C0M100Y80K20.jpg\t
C100M80Y0K0.jpg\t\t
C51M16Y0K48.jpg
C0M100Y80K40.jpg\t
C100M80Y0K20.jpg\t
C52M0Y100K28.jpg
C0M17Y100K0.jpg\t\t
C100M80Y0K80.jpg\t
C53M0Y85K0.jpg
C0M17Y42K0.jpg\t\t
C100M80Y100K0.jpg\t
C53M20Y0K0.jpg
C0M18Y25K68.jpg\t\t
C100M80Y20K40.jpg\t
C56M0Y23K0.jpg
C0M18Y31K43.jpg\t\t
C100M80Y20K60.jpg\t
C5M0Y100K62.jpg
C0M23Y24K95.jpg\t\t
C100M80Y20K80.jpg\t
C5M95Y0K0.jpg
C0M25Y28K21.jpg\t\t
C100M80Y40K20.jpg\t
C60M0Y40K0.jpg
C0M27Y40K72.jpg\t\t
C100M80Y40K40.jpg\t
C60M0Y47K0.jpg
C0M28Y5K0.jpg\t\t
C100M80Y60K40.jpg\t
C60M100Y10K10.jpg
C0M28Y5K5.jpg\t\t
C100M84Y0K20.jpg\t
C60M100Y40K20.jpg
C0M30Y100K42.jpg
C10M8Y9K39.jpg\t\t
C60M20Y0K60.jpg
C0M31Y10K14.jpg\t\t
C13M98Y0K0.jpg\t\t
C60M20Y20K20.jpg
C0M32Y45K0.jpg\t\t
C20M0Y0K060.jpg\t\t
C60M20Y80K20.jpg
C0M33Y100K4.jpg\t\t
C20M100Y0K80.jpg\t
C60M2Y0K0.jpg
C0M34Y24K98.jpg\t\t
C20M100Y18K19.jpg\t
C60M40Y0K0.jpg
C0M37Y100K0.jpg\t\t
C20M100Y20K0.jpg\t
C60M40Y0K80.jpg
C0M37Y29K90.jpg\t\t
C20M100Y40K20.jpg\t
C60M40Y20K20.jpg
C0M39Y60K55.jpg\t\t
C20M100Y40K40.jpg\t
C60M40Y20K60.jpg
C0M40Y0K0.jpg\t\t
C20M100Y80K0.jpg\t
C60M40Y40K60.jpg
C0M40Y100K20.jpg\t
C20M100Y80K20.jpg\t
C60M60Y0K0.jpg
C0M40Y40K0.jpg\t\t
C20M19Y10K63.jpg\t
C60M80Y80K40.jpg
C0M40Y60K20.jpg\t\t
C20M20Y0K40.jpg\t\t
C62M93Y0K0.jpg
C0M47Y40K72.jpg\t\t
C20M20Y40K0.jpg\t\t
C63M36Y0K0.jpg
C0M50Y95K30.jpg\t\t
C20M40Y60K20.jpg\t
C65M0Y95K32.jpg
C0M53Y8K0.jpg\t\t
C20M60Y100K0.jpg\t
C66M71Y0K0.jpg
C0M56Y100K4.jpg\t\t
C20M80Y0K20.jpg\t\t
C79M0Y71K0.jpg
C0M5Y68K0.jpg\t\t
C20M80Y20K0.jpg\t\t
C80K80Y0K20.jpg
C0M60Y0K0.jpg\t\t
C100M0Y30K40.jpg\t
C40M20Y20K40.jpg\t
C9M10Y30K18.jpg
C20M80Y40K40.jpg\t
C80M0Y100K0.jpg
C0M60Y40K0.jpg\t\t
C20M80Y80K0.jpg\t\t
C80M0Y20K0.jpg
C0M60Y60K0.jpg\t\t
C20M9Y10K45.jpg\t\t
C80M0Y20K20.jpg
C0M60Y80K0.jpg\t\t
C23M62Y0K0.jpg\t\t
C80M100Y0K0.jpg
C0M65Y93K0.jpg\t\t
C23Y62Y0K0.jpg\t\t
C80M100Y40K40.jpg
C0M66Y91K0.jpg\t\t
C24M0Y56K0.jpg\t\t
C80M20Y0K20.jpg
C0M67Y20K0.jpg\t\t
C28M0Y4K0.jpg\t\t
C80M20Y0K60.jpg
C0M6Y82K2.jpg\t\t
C2M80Y0K0.jpg\t\t
C80M20Y100K60.jpg
C0M70Y90K40.jpg\t\t
C30M9Y0K0.jpg\t\t
C80M60Y0K80.jpg
C0M75Y90K0.jpg\t\t
C31M0Y9K0.jpg\t\t
C80M60Y40K60.jpg
C0M80Y40K0.jpg\t\t
C31M56Y0K74.jpg\t\t
C80M80Y0K20.jpg
C0M80Y90K88.jpg\t\t
C33M3Y0K0.jpg\t\t
C80M80Y0K40.jpg
C0M84Y75K0.jpg\t\t
C33M59Y0K0.jpg\t\t
C80M80Y20K40.jpg
C0M8Y13K36.jpg\t\t
C34M0Y85K0.jpg\t\t
C82M95Y0K0.jpg
C0M90Y35K66.jpg\t\t
C34M36Y59K0.jpg\t\t
C90M95Y0K0.jpg
C0M95Y64K34.jpg\t\t
C35M0Y28K0.jpg\t\t
C91M0Y69K5.jpg
C100M0Y0K58.jpg\t\t
C37M7Y0K98.jpg\t\t
C92M0Y84K20.jpg
C100M0Y0K70.jpg\t\t
C39M39Y0K0.jpg\t\t
C95M0Y3K26.jpg
C100M0Y14K87.jpg\t
C3M80Y0K0.jpg\t\t
C96M0Y13K32.jpg
C100M0Y18K42.jpg\t
C3M80Y0K20.jpg\t\t
C97M0Y67K28.jpg
C100M0Y20K0.jpg\t\t
C40M0Y100K0.jpg\t\t
C98M0Y14K5.jpg
C100M0Y28K26.jpg\t
C40M100Y0K20.jpg\t
C98M59Y0K0.jpg
    `);

    const tryMatchPart = (value: string, regex: RegExp): number => {
      try {
        return parseInt(value.match(regex)[1])
      } catch (e) {
        return 0;
      }
    }

    const parseItem = (value: string): CMYKColor => {
      console.log('Parsing filename', value);
      const c = tryMatchPart(value, new RegExp('C([0-9]+)'))
      const m = tryMatchPart(value, new RegExp('M([0-9]+)'))
      const y = tryMatchPart(value, new RegExp('Y([0-9]+)'))
      const k = tryMatchPart(value, new RegExp('K([0-9]+)'))
      const result = {
        C: c,
        M: m,
        Y: y,
        K: k
      };
      console.log('Result CMYK', result)
      return result;
    }

    const convertCMYKToRGB = (cmykColor: CMYKColor): RGBColor => {
      console.log('Converting CMYK', cmykColor);
      const [R, G, B] = colorConvert.cmyk.rgb(cmykColor.C, cmykColor.M, cmykColor.Y, cmykColor.K);
      const result = {R, G, B};
      console.log('Result RGB', result)
      return result
    }

    const convertRGBtoHEX = (rgbColor: RGBColor): string => {
      console.log('Converting RGB', rgbColor);
      const result = colorConvert.rgb.hex(rgbColor.R, rgbColor.G, rgbColor.B);
      console.log('Result HEX', result)
      return result;
    }

    const colors = computed(() => {
      try {
        return  map(filter(inputText.value.split('\n'), (row: string) => row.trim().length), (fileName: string) => {
          const cmykColor = parseItem(fileName)
          const rgbColor = convertCMYKToRGB(cmykColor);
          const hex = convertRGBtoHEX(rgbColor);
          const hue = getColorHue(hex);
          return {
            fileName: fileName,
            cmykColor: cmykColor,
            rgbColor: rgbColor,
            hex: hex,
            hue: hue
          }
        }).sort((a, b) => {
          return a.hue - b.hue;
        });
      } catch (e) {
        console.error(e);
        return e.message;
      }
    })

    // const outputText = computed(() => {
    //   return join(map(colors.value, (color, index) => `mv ${color.fileName} ${index + 1}_${color.fileName.trim()}`), `\n`);
    // })

    const outputText = computed(() => {
      const patchName = (fileName: string, index: number) => {
        return `${index}_${fileName.replace('.jpg', '.svg')}`
      }
      return join(map(colors.value, (color, index) => generateCommand(color.cmykColor, color.rgbColor, patchName(color.fileName, index))), `\n`);
    })

    return {
      outputText,
      inputText,
      colors,
    }
  }
}
</script>
