import {
  GetParamsType,
  GetResponseDataType,
} from "@/app/api/sources/[sourceId]/create-recipe/route.schema";
import fetcher from "@/lib/fetcher";
import { ApiError } from "@/types";
import useSWRImmutable from "swr/immutable";

export default function useSourceCreateRecipeAPI(sourceId: string) {
  return useSWRImmutable<GetResponseDataType, ApiError<GetParamsType>>(
    `/api/sources/${sourceId}/create-recipe`,
    fetcher,
  );
}
