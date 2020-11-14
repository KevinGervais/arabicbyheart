import { isDev } from "@/functions"

export function getHost(): string {
  if (isDev()) {
    return "http://localhost:8080/api"
  } else {
    return "https://vocabulary-by-heart.herokuapp.com/api"
  }
}