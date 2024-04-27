import { defineComponent, h } from "vue";
import { getTagProps, validateTagProp } from "./utils";
import { constants } from "smooth-dnd";
// 基于 composition API 的 Vue组件
export const SmoothDndDraggable = defineComponent({
    name: 'SmoothDndDraggable',
    props: {
        tag: {
            validator: validateTagProp,
            default: 'div'
        }
    },
    render() {
        const tagProps = getTagProps(this, constants.wrapperClass)
        return h(tagProps.value, Object.assign({}, tagProps.props), this.$slots.default?.())
    }
})