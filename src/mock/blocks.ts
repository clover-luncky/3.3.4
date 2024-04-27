import type { Block } from '@/types/block'

export const blocks: Block[] = [
    {
        id: '1',
        type: 'text',
        props: {
            content: '这是一段文本',
        },
        actions: {
            onCopy: () => {},
            onEdit: () => {}
        }
    }, {
        id: '2',
        type: 'chart',
        props: { },
        actions: {
            onFilter: () => {},
            onSwitch: () => {}
        }
    }, {
        id: '3',
        type: 'image',
        props: {
            src: 'https://www.baidu.com/img/flexible/logo/pc/result.png'
        },
        actions: {
            onEdit: () => {}
        }
    }]