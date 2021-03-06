import {RESOU_PREFIX, RESOU_URL} from "../Constants";
import got from "got";
import { HotSearchInterface } from "../interfaces/hot-search.interface";

export async function getHotSearches(): Promise<HotSearchInterface[]> {
  const res = await got(RESOU_URL);
  const text: string = res.body;
  const hssRE = /<a href="(\/weibo\?q=[^"]+)".*?>(.+)<\/a>/g;

  const matches = [...text.matchAll(hssRE)];
  if (matches.length === 0) {
    throw new Error("没有匹配到热搜");
  }

  const hss = [...matches].map((x) => ({
    title: x[2],
    url: RESOU_PREFIX + x[1],
  }));
  return hss;
}
