export default function CreateHOC(
  WrappedComponent,
  PropName: string = "filter"
) {
  return {
    props: {
      ...WrappedComponent.props,
      [PropName]: {
        type: Object,
        default() {
          return {
            read(val) {
              return val;
            },
            write(val) {
              return val;
            }
          };
        }
      }
    },
    computed: {
      state: {
        get() {
          return this[PropName].read(this.value);
        },
        set(val) {
          const value = this[PropName].write(val);
          this.$emit("input", value);
        }
      }
    },
    render(h) {
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        // 手动更正 context
        .map(vnode => {
          vnode.context = this._self;
          return vnode;
        });

      return h(
        WrappedComponent,
        {
          on: Object.assign(this.$listeners, {
            input: val => {
              this.state = val;
            }
          }),
          props: {
            ...this.$props,
            value: this.state
          },
          attrs: this.$attrs
        },
        slots
      );
    }
  };
}
