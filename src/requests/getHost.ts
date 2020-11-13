import { isDev } from "@/functions"

export function getHost(): string {
  if (isDev()) {
    return "localhost:8080/api"
  } else {
    return "vocabulary-by-heart.herokuapp.com/api"
  }
}