import Rx, { Subject } from "rxjs";
import Vue from "vue";
import VueRx from "vue-rx";

const sub = new Subject<EventItem>();

interface EventItem {
  n: string;
  v: any;
}

const RxEvent = {
  install(Vue: any) {
    Vue.prototype.$rx_on = function(name: string, func: Function) {
      if (func == null) return sub.filter(t => t.n === name).map(t => t.v);
      this.$subscribeTo(sub.filter(t => t.n === name).map(t => t.v), func);
    };

    Vue.prototype.$rx_emit = function(n: string, v) {
      sub.next({ n, v });
    };
  }
};

Vue.use(VueRx, Rx);
Vue.use(RxEvent);
