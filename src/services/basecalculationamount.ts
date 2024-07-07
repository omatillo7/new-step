import ApiService, { API_URL } from "@/services/base";

const BasecalculationamountService = {
  Get<T>(id: string | number) {
    if (id === "0" || !id) {
      return ApiService.get<T>(`/basecalculationamount/Get`);
    }
    return ApiService.get(`/basecalculationamount/Get/${id}`);
  },
  GetList(params: any) {
    return ApiService.post(`/basecalculationamount/GetList`, params);
  },
  Delete(id: number) {
    return ApiService.post(`/basecalculationamount/Delete/${id}`);
  },
  Update(data: any) {
    if (data.id === "0" || !data.id) {
      return ApiService.post("/basecalculationamount/Create", data);
    }

    return ApiService.post("/basecalculationamount/Update", data);
  },
};

export default BasecalculationamountService;