export default {
  /**
   * 获取当前激活的类型. 
   * 
   * @param {cm} codemirror 对象.
   * @param {pos} pos 位置.
   */
  getState(cm, pos) {
    pos = pos || cm.getCursor("start");
    var stat = cm.getTokenAt(pos);
    if (!stat.type) return {};

    var types = stat.type.split(" ");

    var ret = {},
      data, text;
    for (var i = 0; i < types.length; i++) {
      data = types[i];
      if (data === "strong") {
        ret.bold = true;
      } else if (data === "variable-2") {
        text = cm.getLine(pos.line);
        if (/^\s*\d+\.\s/.test(text)) {
          ret["ordered-list"] = true;
        } else {
          ret["unordered-list"] = true;
        }
      } else if (data === "atom") {
        ret.quote = true;
      } else if (data === "em") {
        ret.italic = true;
      } else if (data === "quote") {
        ret.quote = true;
      } else if (data === "strikethrough") {
        ret.strikethrough = true;
      } else if (data === "comment") {
        ret.code = true;
      } else if (data === "link") {
        ret.link = true;
      } else if (data === "tag") {
        ret.image = true;
      } else if (data.match(/^header(\-[1-6])?$/)) {
        ret[data.replace("header", "heading")] = true;
      }
    }
    return ret;
  }
}