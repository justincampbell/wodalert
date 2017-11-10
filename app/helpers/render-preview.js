import { helper } from '@ember/component/helper';

export function renderPreview(content) {
  return content.toString().replace(/\n/g, "<br>");
}

export default helper(renderPreview);
