import fetcher from "../fetcher";
import { ApiError } from "@/types";
import {
  GetParamsType,
  GetResponseData,
} from "@/app/api/sources/[sourceId]/html/extract-recipe/route.schema";
import useSWRImmutable from "swr/immutable";

export default function useSourceHtmlExtractRecipeAPI(sourceId: string) {
  return useSWRImmutable<GetResponseData, ApiError<GetParamsType>>(
    `/api/sources/${sourceId}/html/extract-recipe`,
    fetcher,
  );
}
