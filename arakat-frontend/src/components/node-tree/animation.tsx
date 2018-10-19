import animate from "css-animation";

export const animation = {
    enter(node, done) {
      let height;
      return animate(node, "rc-menu-collapse", {
        start() {
          height = node.offsetHeight;
          node.style.height = 0;
        },
        active() {
          node.style.height = `${height}px`;
        },
        end() {
          node.style.height = "";
          done();
        },
      });
    },

    appear() {
      return this.enter.apply(this, arguments);
    },

    leave(node, done) {
      return animate(node, "rc-menu-collapse", {
        start() {
          node.style.height = `${node.offsetHeight}px`;
        },
        active() {
          node.style.height = 0;
        },
        end() {
          node.style.height = "";
          done();
        },
      });
    },
};
