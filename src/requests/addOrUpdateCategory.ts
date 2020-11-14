import { getHost } from "./getHost"
import { AddCategoryRequestResult } from "./model"

export function addOrUpdateCategory(newCategory: AddCategoryRequestResult): Promise<Response> {
  return fetch(`${getHost()}/category`, {
    body: JSON.stringify(newCategory),
    method: "post",
    headers: {
      "content-type": "application/json"
    },
  })
}