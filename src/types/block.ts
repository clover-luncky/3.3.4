export type BaseBlock = {
    id: string,
    type: string
}

export type TextBlock = BaseBlock & {
    type: 'text',
    props: {
        content: string
    },
    actions: {
        onCopy: () => void
        onEdit: () => void
    }
}

export type ChartBlock = BaseBlock & {
    type: 'chart',
    props:  {},
    actions: {
        onFilter: () => void
        onSwitch: () => void
    }
}

export type ImageBlock = BaseBlock & {
    type: 'image',
    props:  {
        src: string,
        alt: string
    },
    actions: {
        onEdit: () => void
    }
}

export type Block = TextBlock | ChartBlock | ImageBlock