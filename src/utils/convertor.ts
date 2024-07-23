import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export const getConvertedHtml = (delta: any) => {

    const converter = new QuillDeltaToHtmlConverter(delta.ops, {})
    return converter.convert()
}


export const htmlToJson = (html: string): any => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const body = doc.body;

  const traverse = (node: Node): any => {
    const obj: any = {};

    if (node.nodeType === Node.TEXT_NODE) {
      obj.text = node.textContent || "";
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = (node as HTMLElement).tagName.toLowerCase();
      obj.type = tag;

      if ((node as HTMLElement).hasChildNodes()) {
        obj.children = [];
        (node as HTMLElement).childNodes.forEach((child) => {
          obj.children.push(traverse(child));
        });
      }

      if ((node as HTMLElement).attributes.length > 0) {
        obj.attributes = {};
        for (let i = 0; i < (node as HTMLElement).attributes.length; i++) {
          const attr = (node as HTMLElement).attributes[i];
          obj.attributes[attr.name] = attr.value;
        }
      }
    }

    return obj;
  };

  const json = traverse(body);
  return json.children ? json.children : [];
};
