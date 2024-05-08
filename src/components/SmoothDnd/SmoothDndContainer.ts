import type { SmoothDnD } from 'smooth-dnd'
import { dropHandlers,smoothDnD } from 'smooth-dnd'
import { defineComponent, h } from "vue";

import { getTagProps, validateTagProp } from "./utils";

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler
smoothDnD.wrapChild = false

type EventKey = 'drag-start' | 'drag-end' | 'drop' | 'drag-enter' | 'drag-leave' | 'drop-ready'
// 抹平 API 差异，js 方法
const eventEmitterMap: Record<EventKey, string> = {
    'drag-start': 'onDragStart',
    'drag-end': 'onDragEnd',
    drop: 'onDrop',
    'drag-enter': 'onDragEnter',
    'drag-leave': 'onDragLeave',
    'drop-ready': 'onDropReady'
}

// 基于 composition API 的 Vue组件
export const SmoothDndContainer = defineComponent({
    name: 'SmoothDndContainer',
    setup() {
        return {
            container: null as SmoothDnD | null
        }
    },
    mounted() {
        // 初始化 SmoothDnd 容器
        // 将组件和 DOM 关联
        // 先初始化 props 相关参数
        const options: any = Object.assign({}, this.$props)
        // 触发事件
        for(const key in eventEmitterMap) {
            const eventKey = key as EventKey
            options[eventEmitterMap[eventKey]] = (props: any) => {
                this.$emit(eventKey, props)
            }
        }
        // 获取 DOM 元素
        const containerElement = this.$refs.container || this.$el
        // 初始化容器
        this.container = smoothDnD(containerElement, options)
    },
    unmounted() {
        if(this.container) {
           try {
            this.container.dispose()
           } catch {
            // ignore
           }
        }
    },
    emits: ['drag-start', 'drag-end', 'drop', 'drag-enter', 'drag-leave', 'drop-ready'],
    props: {
        orientation: { type: String, default: 'vertical' },
        removeOnDropOut: { type: Boolean, default: false },
        autoScrollEnabled: { type: Boolean, default: true },
        animationDuration: { type: Number, default: 250 },
        behaviour: String,
        groupName: String,
        dragHandleSelector: String,
        noneDragAreaSelector: String,
        lockAxis: String,
        dragClass: String,
        dropClass: String,
        dragBeginDelay: Number,
        getChildPayload: Function,
        shouldAnimateDrop: Function,
        shouldAcceptDrop: Function,
        getGhostParent: Function,
        dropPlaceholder: [Object, Boolean],
        tag: {
            validator: validateTagProp,
            default: 'div'
        }
    },
    render() {
        const tagProps = getTagProps(this)
        return h(
            tagProps.value,
            Object.assign({}, { ref: 'container' }, tagProps.props),
            this.$slots.default?.()
        )
    }
})