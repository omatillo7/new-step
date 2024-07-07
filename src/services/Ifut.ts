import ApiService, { API_URL } from "@/services/base";

const IfutService = {
  Get<T>(id: string | number) {
    if (id === "0" || !id) {
      return ApiService.get<T>(`/Oked/Get`);
    }
    return ApiService.get(`/Oked/Get/${id}`);
  },
  GetList(params: any) {
    return ApiService.post(`/Oked/GetList`, params);
  },
  Delete(id: number) {
    return ApiService.post(`/Oked/Delete/${id}`);
  },
  Update(data: any) {
    if (data.id === "0" || !data.id) {
      return ApiService.post("/Oked/Create", data);
    }

    return ApiService.post("/Oked/Update", data);
  },
};

export default IfutService;