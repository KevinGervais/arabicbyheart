import { Theme, AllColors } from "./model"
import { getColor } from "./getColor"

const theme: Theme = {
  isDark: Boolean(localStorage.getItem("isDark")) || false,
  // primary
  ...getColor(
    (localStorage.getItem("themeColor") as keyof AllColors | null) ||
    "cyan",
    "primary"
  ),
  // gray
  ...getColor("grey", "grey"),
  ...getColor("pink", "secondary"),
}

window.theme = theme
