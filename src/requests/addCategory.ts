import { getHost } from "./getHost"
import { AddCategoryRequest } from "./model"

export function addCategory(newCategory: AddCategoryRequest): void {
  fetch(`${getHost()}/category`, {
    body: JSON.stringify(newCategory),
    method: "post",
    headers: {
      "content-type": "application/json"
    },
  }).then()
    .catch()
}