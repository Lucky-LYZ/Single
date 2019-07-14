import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @method 实现单例模式
   * @param {*} fn
   */
  getSingle(fn) {
    let result;
    return function() {
      if (result) {
        console.log("我已存在....");
        return result;
      } else {
        console.log("我是新创建的....");
        result = fn.apply(this, arguments);
        return result;
      }
    };
  }

  /**
   * @method 单一职责原则，创建模态框的逻辑
   */
  createModal() {
    let div = document.createElement("div");
    div.innerHTML = "我是模态框";
    div.style.display = "none";
    document.body.appendChild(div);
    return div;
  }

  /**
   * @method 单一职责原则，创建iframe的逻辑
   */
  createIframe() {
    let iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    return iframe;
  }

  /**
   * @method 获取createModal的单一实例
   */
  createSingleModal = this.getSingle(this.createModal);

  /**
   * @method 获取createIframe的单一实例
   */
  createSingleIframe = this.getSingle(this.createIframe);

  /**
   * @method 处理按钮事件
   */
  handleClick = type => {
    if (type === 1) {
      //let obj = this.createSingleModal();
      let obj = this.getSingle(this.createModal)(); // 对比两种方式的异同点，哪一种能实现单例模式？？？
      obj.style.display = "block";
    } else {
      let iframe = this.createSingleIframe();
      //let iframe = this.getSingle(this.createIframe)(); // 对比两种方式的异同点，哪一种能实现单例模式？？？
      iframe.src = "http://www.baidu.com";
    }
  };

  render() {
    return (
      <div className="App">
        <h2>惰性单例模式</h2>
        <h5>
          只有在需要的时候，才去执行创建逻辑，并获得单一实例；创建对象和管理单例的职责被分布在两个不同的方法中，这两个方法组合起来才具有单例模式的威力。
        </h5>
        <button onClick={this.handleClick.bind(this, 1)}>createModal</button>
        <button onClick={this.handleClick.bind(this, 2)}>createIframe</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
