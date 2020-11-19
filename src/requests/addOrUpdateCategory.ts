import { getHost } from "./getHost"
import { AddCategoryQuery } from "./model"

export function addOrUpdateCategory(newCategory: AddCategoryQuery): Promise<Response> {
  return fetch(`${getHost()}/category`, {
    body: JSON.stringify(newCategory),
    method: "post",
    headers: {
      "content-type": "application/json"
    },
  })
}