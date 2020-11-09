import { Theme, AllColors } from "./model"
import { getColor } from "./getColor"

const theme: Theme = {
  // primary
  ...getColor(
    (localStorage.getItem("themeColor") as keyof AllColors | null) ||
    "lightblue",
    "primary"
  ),
  // gray
  ...getColor("grey", "grey"),
  ...getColor("orange", "secondary"),
  // success
  success: "hsl(120, 85%, 50%)",
  success95: "hsl(120, 80%, 95%)",
  success80: "hsl(120, 80%, 80%)",
  success70: "hsl(120, 80%, 70%)",
  success60: "hsl(120, 80%, 60%)",
  success40: "hsl(120, 80%, 40%)",
  success30: "hsl(120, 80%, 30%)",
  success20: "hsl(120, 80%, 20%)",
  // error
  error: "hsl(0, 85%, 60%)",
  error95: "hsl(0, 80%, 95%)",
  error80: "hsl(0, 80%, 80%)",
  error70: "hsl(0, 80%, 70%)",
  error60: "hsl(0, 80%, 60%)",
  error40: "hsl(0, 80%, 40%)",
  error30: "hsl(0, 80%, 30%)",
  error20: "hsl(0, 80%, 20%)",
  // warning
  warning: "hsl(55, 85%, 50%)",
  warning80: "hsl(55, 85%, 80%)",
  warning70: "hsl(55, 85%, 70%)",
  warning60: "hsl(55, 85%, 60%)",
  warning40: "hsl(55, 85%, 40%)",
  warning30: "hsl(55, 85%, 30%)",
  warning20: "hsl(55, 85%, 20%)"
}

window.theme = theme
