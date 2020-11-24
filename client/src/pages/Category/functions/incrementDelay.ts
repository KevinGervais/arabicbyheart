import { diapositiveDelay } from "@/model"

export function incrementDelay(currentDelay: diapositiveDelay): diapositiveDelay {
  switch (currentDelay) {
    case false:
      return 2
    case 2:
      return 3
    case 3:
      return 5
    case 5:
      return 10
    case 10:
      return 15
    case 15:
      return false
  }
}