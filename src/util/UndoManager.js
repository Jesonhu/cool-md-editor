//========================================
// undo(撤销)或者redo(重做)类.
//
//  @update 2019/01/24
// @author Jesonhu(github)
// @email jesonhu_web@163.com
//========================================

// @see https://github.com/jzaefferer/undo
class UndoManager {
  constructor(handleObj) {
    this.init(handleObj)
  }
  init(handleObj) {
    this.initData(handleObj);
  }
  initData(handleObj) {
    this.initDefaultData(handleObj);
  }
  initDefaultData() {
    this.undoStack = [];
  }
}
