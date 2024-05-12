import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'

import { findColor } from '../helper'

export const ColorHighlighter = Extension.create({
    name: 'colorHighlighter',
    addProseMirrorPlugins() {
        return [
            new Plugin({
                state: {
                    init(_, { doc }) {
                        return findColor(doc)
                    },
                    apply(transaction, oldState) {
                        return transaction.docChanged ? findColor(transaction.doc) : oldState
                    }
                },
                props: {
                    decorations(state) {
                        return this.getState(state)
                    }
                }
            })
        ]
    }
})