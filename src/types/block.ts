export type InternalBlockType = 'title' | 'view' | 'chart' | 'text' | 'image'
export type ExternalBlockType = 'button' | 'form' | 'notes'

// 模块类型
export type BlockType = InternalBlockType | ExternalBlockType

export type BaseBlock = {
    id: string,
    type: string,
    label: String
}

// 基础模块

// 引述模块
export type TextBlockStatus = 'success' | 'warning' | 'error'

export type TextBlock = BaseBlock & {
    type: 'text',
    props: {
        content: string,
        status: TextBlockStatus
    }
}

// 图表模块
export type ChartType = 'echarts' | 'canvas' | 'svg'
export type ChartBlock = BaseBlock & {
    type: 'chart',
    props:  {
        chartType: ChartType
    }
}

// 图片模块
export type ImageBlock = BaseBlock & {
    type: 'image',
    props:  {
        src: string,
        alt?: string
    }
}

// 视图模块
export type ViewBlock = BaseBlock & {
    type: 'view',
    props:  {
        fields: Record<string, {
            type: string
        }>
        fieldProps: {
            width: number,
            visible: boolean
        }[]
        data: {
            id: string,
            value: string
        }[]
    }
}

// 标题模块
export type TitleBlock = BaseBlock & {
    type: 'title',
    props: {
        content: string
    }
}

// 复杂模块
// 按钮模块
export type ButtonBlock = BaseBlock & {
    type: 'button',
    props: {
        content: string
    }
}

// 表单模块
export type FormBlock = BaseBlock & {
    type: 'form',
    props: {
        fields: {
            type: string
            label: string
            placeholder?: string
            required?: boolean
        }[]
    }
}

// 笔记模块
export type NoteBlock = BaseBlock & {
    type: 'notes',
    props: {
        content: string
    }
}


export type Block = TextBlock | ChartBlock | ImageBlock | ViewBlock | TitleBlock | ButtonBlock | FormBlock | NoteBlock