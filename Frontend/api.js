import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  const { data } = await api.post("/resume/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const matchToJob = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);
  const { data } = await api.post("/resume/match", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
