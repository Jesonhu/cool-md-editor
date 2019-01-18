const domRender = {
  init(parent) {
    return new Promise((resolve, reject) => {
      this.renderTools(parent)
      .then(() => {
        this.renderCode(parent);
      })
      .then(() => {
        this.renderPriview(parent);
      })
      .then(() => {
        this.renderStatus(parent);
      })
      .then(() => {
        resolve();
      })
      .catch(error => error);
    });

    // better way but must think browser support
    // await this.renderTools(parent);
    // await this.renderCode(parent);
    // await this.renderPriview(parent);
    // await this.renderStatus(parent);
  },
  renderTools(parent) {
    return new Promise((resolve, reject) => {
      parent.innerHTML += `
      <div class="editor-tools"></div>
      ` 
      resolve();
    });
  },
  renderCode(parent) {
    return new Promise((resolve, reject) => {
      parent.innerHTML += `
        <div class="editor-md">
        <form>
          <textArea id="area"></textArea>
        </form>
      </div>
      `;
      resolve();
    })
    
  },
  renderPriview(parent) {
    return new Promise((resolve, reject) => {
      parent.innerHTML += `
      <div class="editor-preview">
        <div class="preview-bd">
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
          1<br>
        </div>
      </div>
      `;
      resolve();
    });
  },
  renderStatus(parent) {
    return new Promise((resolve, reject) => {
      parent.innerHTML += `
      <div class="editor-status"></div>
      `;
      resolve();
    })
  }
}

export default domRender;