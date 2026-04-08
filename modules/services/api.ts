import request, { createHeaders, urls, requestMiddleware } from "@/lib/api/client.js"

// for custom api
// import axios from "axios";

// const api = axios.create({
//   baseURL: urls.apiApp,
//   withCredentials: true,
// });

// api.interceptors.request.use(requestMiddleware);

export async function getServices() {
  let url = "/services"
  const headers = createHeaders()
  return request({ url, method: "GET", headers })
}

export async function checkout({ body }: any) {
  const url = `/checkout`
  const headers = createHeaders()
  return request({ url, method: "POST", headers, body })
}
