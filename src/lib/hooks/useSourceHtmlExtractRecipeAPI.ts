import {
  GetParamsType,
  GetResponseData,
} from "@/app/api/sources/[sourceId]/html/extract-recipe/route.schema";
import fetcher from "@/lib/fetcher";
import { ApiError } from "@/types";
import useSWRImmutable from "swr/immutable";

export default function useSourceHtmlExtractRecipeAPI(sourceId: string) {
  return useSWRImmutable<GetResponseData, ApiError<GetParamsType>>(
    `/api/sources/${sourceId}/html/extract-recipe`,
    fetcher,
  );
}
