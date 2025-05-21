import { liteClient as algoliasearch } from "algoliasearch/lite";

import { APP_ID, SEARCH_API_KEY } from "../Constants/Constants";

export const searchClient = algoliasearch(APP_ID, SEARCH_API_KEY);
