import fetcher from "../fetcher";
import { ApiError } from "@/types";
import {
  GetParamsType,
  GetResponseData,
} from "@/app/api/sources/[sourceId]/html/route.schema";
import useSWRImmutable from "swr/immutable";

export default function useSourceHtmlAPI(sourceId: string) {
  return useSWRImmutable<GetResponseData, ApiError<GetParamsType>>(
    `/api/sources/${sourceId}/html`,
    fetcher,
  );
}
