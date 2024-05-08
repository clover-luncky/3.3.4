import type { App } from 'vue';

import ButtonBlock from '@/blocks/external/ButtonBlock.vue';
import FormBlock from '@/blocks/external/FormBlock.vue';
import NoteBlock from '@/blocks/external/NoteBlock.vue';
import ChartBlock from '@/blocks/internal/ChartBlock.vue';
// import FallbackBlock from '@/blocks/internal/FallbackBlock.vue';
import ImageBlock from '@/blocks/internal/ImageBlock.vue';
import TextBlock from '@/blocks/internal/TextBlock.vue';
import TitleBlock from '@/blocks/internal/TitleBlock.vue';
import ViewBlock from '@/blocks/internal/ViewBlock.vue';

const baseBlocks = [{
    type: 'text',
    material: TextBlock
},{
    type: 'title',
    material: TitleBlock
},{
    type: 'image',
    material: ImageBlock
},{
    type: 'chart',
    material: ChartBlock
},{
    type: 'text',
    material: TextBlock
},{
    type: 'view',
    material: ViewBlock
}]

class BlockSuite {
    private blocks = baseBlocks
    constructor() {}
    getBlocksMap() {
        return Object.fromEntries(this.blocks.map((block) => [block.type, block]))
    }
    addBlock(block: any) {
        this.blocks.push(block)
    }
}

const blockSuite = new BlockSuite()

blockSuite.addBlock({
    type: 'button',
    material: ButtonBlock
})

blockSuite.addBlock({
    type: 'form',
    material: FormBlock
})
blockSuite.addBlock({
    type: 'notes',
    material: NoteBlock
})

const blocksMap = blockSuite.getBlocksMap()

export const blocksMapSymbol = Symbol('blocksMap')

export const setup = (app: App<Element>) => {
    console.log('app', app)
    const ins = {
        install(app: App<Element>) {
            // 待补充-provide
            app.provide(blocksMapSymbol, blocksMap)
            app.config.globalProperties.$blocksMap = blocksMap
        }
    }

    app.use(ins)
}

// 待补充-declare | ComponentCustomProperties
// @ts-ignore: works on Vue 3, fails in Vue 2
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $blocksMap: string
    }
}