export const middleEllipsis = (
  text: string = "",
  keepFirst = 5,
  keepLast = 4,
  dotCount = 3
) => {
  let convertedStr = "";
  convertedStr += text.substring(0, keepFirst);
  convertedStr += ".".repeat(dotCount);
  convertedStr += text.substring(text.length - keepLast, text.length);
  return convertedStr;
};
