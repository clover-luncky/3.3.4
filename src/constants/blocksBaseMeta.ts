import {
    ChartLine, Form, HamburgerButton,
    ImageFiles, Notes, Quote, Table, TitleLevel
} from '@icon-park/vue-next'
import type { Icon } from '@icon-park/vue-next/lib/runtime'
import { nanoid } from 'nanoid'

import type { Block, BlockType } from '@/types/block'

export const blocksBaseMetaList: { type: BlockType, label: string, icon: Icon }[] =
[{
    type: 'text',
    label: '引述',
    icon: Quote
},{
    type: 'image',
    label: '图片',
    icon: ImageFiles
},{
    type: 'chart',
    label: '图标',
    icon: ChartLine
},{
    type: 'view',
    label: '视图',
    icon: Table
},{
    type: 'title',
    label: '标题',
    icon: TitleLevel
},{
    type: 'form',
    label: '表单',
    icon: Form
},{
    type: 'button',
    label: '按钮',
    icon: HamburgerButton
},{
    type: 'notes',
    label: '笔记',
    icon: Notes
}]
export const blocksBaseMeta = Object.fromEntries(
    blocksBaseMetaList.map(item => [item.type, item])
)

export const getBlocksDefaultData = (type: BlockType): Block => {
    const id = nanoid()
    switch (type) {
        case 'text': 
            return {
                id,
                type: 'text',
                label: '引述',
                props: {
                    content: '引述文本 quote',
                    status: 'success'
                }
            }
        case 'notes': 
            return {
                id,
                type: 'notes',
                label: '笔记',
                props: {
                    content: ''
                }
            }
        case 'title': 
            return {
                id,
                type: 'title',
                label: '标题',
                props: {
                    content: '标题'
                }
            }
        case 'image': 
            return {
                id,
                type: 'image',
                label: '图片',
                props: {
                    src: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
                    alt: ''
                }
            }
        case 'view': 
            return {
                id,
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
            }
        case 'chart': 
            return {
                id,
                type: 'chart',
                label: '图表',
                props: {
                    type: 'echarts'
                }
            }
        case 'button': 
            return {
                id,
                type: 'button',
                label: '按钮',
                props: {
                    content: '按钮'
                }
            }
        case 'form': 
            return {
                id,
                type: 'form',
                label: '表单',
                props: {
                    fields: []
                }
            }
    }
}