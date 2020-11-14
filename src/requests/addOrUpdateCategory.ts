import { getHost } from "./getHost"
import { AddCategoryRequest } from "./model"

export function addOrUpdateCategory(newCategory: AddCategoryRequest): Promise<Response> {
  return fetch(`${getHost()}/category`, {
    body: JSON.stringify(newCategory),
    method: "post",
    headers: {
      "content-type": "application/json"
    },
  })
}