import React from "react"

import { HarakatProps } from "../model"

import { CategoryClass } from "./Category"
import { HarakatStyled } from "./HarakatStyled"

export function Harakat(this: CategoryClass, props: HarakatProps): JSX.Element {
  const { onChange } = props
  return (
    <HarakatStyled>
      <div className="content">
        {["أ", "إ", "ى", "ئ", "ؤ", "َ", "ُ", "ِ", "ْ", "ََ", "ُُ", "ِِ", "ّ"].map((char: string) =>
          <span onClick={() => onChange(char)}>{char}</span>
        )}
      </div>
      <div className="triangle" />
    </HarakatStyled>
  )
}