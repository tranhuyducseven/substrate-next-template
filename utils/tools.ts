import classNames from "classnames";

/**
 * Mapping hotkey into className package for better usage
 */
const cx = classNames;
const prettyPrint = (obj: any) => {
  const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm;
  const replacer = (
    _match: any,
    pIndent: string,
    pKey: string,
    pVal: string | string[],
    pEnd: any
  ) => {
    const key = '<span class="json-key" style="color: brown">',
      val = '<span class="json-value" style="color: navy">',
      str = '<span class="json-string" style="color: green">';
    let r = pIndent || "";
    if (pKey) r = r + key + pKey.replace(/[": ]/g, "") + "</span>: ";
    if (pVal) r = r + (pVal[0] == '"' ? str : val) + pVal + "</span>";
    return r + (pEnd || "");
  };

  return JSON.stringify(obj, null, 3)
    .replace(/&/g, "&amp;")
    .replace(/\\"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(jsonLine, replacer);
};

export { cx, prettyPrint };
