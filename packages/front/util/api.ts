import axios, { AxiosRequestConfig } from "axios";
import { SignInRequestDto } from "@api/modules/auth/usecases/sign-in/SignInRequestDto";
import { VerifyOtpRequestDto } from "@api/modules/auth/usecases/verify/VerifyOtpRequestDto";
import { CoreApiResponse } from "@api/core/client-response/CoreApiResponse";
import { GetMeResponseDto } from "@api/modules/auth/usecases/get-me/GetMeResponseDto";
import {
  ConversationListItemResponseDto
} from "@api/modules/conversations/usecases/get-conversations/ConversationListItemResponseDto";
import {
  GetConversationByIdResponseDto
} from "@api/modules/conversations/usecases/get-conversations/GetConversationByIdResponseDto";
import { SendMessageRequestDto } from "@api/modules/conversations/usecases/send-message/SendMessageRequestDto";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001"
});
const config: AxiosRequestConfig = { withCredentials: true };

export const postSignIn = async (data: SignInRequestDto) =>
  axiosInstance.post("auth/sign-in", data);

export const postVerify = async (data: VerifyOtpRequestDto) =>
  axiosInstance.post<CoreApiResponse<string>>("auth/verify", data);

export const getMe = async () =>
  axiosInstance.get<CoreApiResponse<GetMeResponseDto>>("auth/me", config);

export const getAllConversations = async () =>
  axiosInstance.get<CoreApiResponse<ConversationListItemResponseDto[]>>("conversations/list", config);

export const getConversationById = async (id: string) =>
  axiosInstance.get<CoreApiResponse<GetConversationByIdResponseDto>>("conversations/" + id, config);

export const postMessage = async (data: SendMessageRequestDto & {
  conversationId: string
}) =>
  await axiosInstance.post("conversations/"+ data.conversationId, {
    message: data.message,
  }, config);

export const postMarkAsRead = async (conversationId: string) =>
  await axiosInstance.post("conversations/mark-as-read/" + conversationId, {}, config);
