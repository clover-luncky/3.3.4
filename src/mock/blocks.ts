import type { Block } from '@/types/block'

export const blocks: Block[] = [
    {
        id: '1',
        type: 'text',
        label: '引述',
        props: {
            content: '引述文本 quote',
            status: 'success'
        }
    }, {
        id: '2',
        type: 'chart',
        label: '图表',
        props: { 
            chartType: 'echarts'
        }
    }, {
        id: '3',
        type: 'image',
        label: '图片',
        props: {
            src: 'https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg?auto=compress&cs=tinysrgb&w=1600',
            alt: ''
        }
    }, {
        id: '4',
        type: 'title',
        label: '标题',
        props: {
            content: '标题'
        }
    }, {
        id: '5',
        type: 'view',
        label: '视图',
        props: {
            fields: {
                'id': {
                    type: 'text'
                }
            },
            fieldProps: [],
            data: []
        }
    },{
        id: '6',
        type: 'button',
        label: '按钮',
        props: {
            content: '按钮'
        }
    }, {
        id: '7',
        type: 'form',
        label: '表单',
        props: {
            fields: []
        }
    }, {
        id: '8',
        type: 'notes',
        label: '笔记',
        props: {
            content: ''
        }
    }]