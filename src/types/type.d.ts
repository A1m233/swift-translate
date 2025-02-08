import { code } from "@/constants/constant";

export type LangType = keyof typeof code;
export interface TranslationItem
{
  sourceLang: LangType,
  destLang: LangType,
  leftTextareaContent: string,
  rightTextareaContent: string,
  time: number,
  id: number,
}