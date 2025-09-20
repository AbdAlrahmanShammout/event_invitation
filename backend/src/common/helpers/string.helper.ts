export function trimAndRemoveExtraWhiteSpaces(text: string): string {
  return text?.trim()?.replace(/\s\s+/g, ' ');
}
