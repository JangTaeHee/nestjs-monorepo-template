export function checkErrorType(errorType: {
  [index: string]: {
    code: number;
    message: string;
    reference: string;
  };
}) {
  const codeSet = new Set();

  Object.keys(errorType).forEach((key) => {
    if (codeSet.has(errorType[key].code)) {
      throw new Error(`Error code is duplicated: ${errorType[key].code}`);
    }
    codeSet.add(errorType[key].code);
  });
  return errorType;
}
