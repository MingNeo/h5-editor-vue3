<script lang="ts" setup>
import StarterKit from '@tiptap/starter-kit'
import { BubbleMenu, Editor, EditorContent } from '@tiptap/vue-3'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const editor = ref()

watch(() => props.modelValue, (value) => {
  if (!editor.value)
    return
  const isSame = editor.value.getHTML() === value

  // JSON
  // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

  if (isSame)
    return

  editor.value.commands.setContent(value, false)
})

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
    ],
    content: props.modelValue,
    onUpdate: () => {
      // HTML
      emit('update:modelValue', editor.value.getHTML())

      // JSON
      // this.$emit('update:modelValue', this.editor.getJSON())
    },
  })
})

function handleChangeTitle() {
  ElMessage.success('触发生成标题')
}

onUnmounted(() => {
  editor.value.destroy()
})
</script>

<template>
  <div v-if="editor" class="container">
    <div class="button-group flex flex-wrap gap-[4px] mb-2">
      <button :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
        加粗
      </button>
      <button :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
        斜体
      </button>
      <button :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
        删除线
      </button>
      <button :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }" @click="editor.chain().focus().toggleCode().run()">
        代码
      </button>
      <!-- <button @click="editor.chain().focus().unsetAllMarks().run()">
          Clear marks
        </button>
        <button @click="editor.chain().focus().clearNodes().run()">
          Clear nodes
        </button> -->
      <!-- <button :class="{ 'is-active': editor.isActive('paragraph') }" @click="editor.chain().focus().setParagraph().run()">
          Paragraph
        </button> -->
      <button :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
        H1
      </button>
      <button :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
        H2
      </button>
      <button :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
        H3
      </button>
      <button :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
        H4
      </button>
      <button :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">
        H5
      </button>
      <button :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">
        H6
      </button>
      <button :class="{ 'is-active': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">
        Bullet list
      </button>
      <button :class="{ 'is-active': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()">
        Ordered list
      </button>
      <button :class="{ 'is-active': editor.isActive('codeBlock') }" @click="editor.chain().focus().toggleCodeBlock().run()">
        Code block
      </button>
      <button :class="{ 'is-active': editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()">
        Blockquote
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        Horizontal rule
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        Hard break
      </button>
      <button :disabled="!editor.can().chain().focus().undo().run()" @click="editor.chain().focus().undo().run()">
        Undo
      </button>
      <button :disabled="!editor.can().chain().focus().redo().run()" @click="editor.chain().focus().redo().run()">
        Redo
      </button>
      <button :class="{ 'is-active': editor.isActive('textStyle', { color: '#958DF1' }) }" @click="editor.chain().focus().setColor('#958DF1').run()">
        Purple
      </button>
    </div>
    <BubbleMenu
      class="bg-white border border-gray-200 rounded-lg shadow-md p-2 flex gap-[8px]"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
    >
      <div
        class="rounded-1 px-2 py-1 cursor-pointer bg-[#eee] hover:bg-blue"
        :class="{ 'is-active bg-blue': editor.isActive('bold') }" @click="handleChangeTitle"
      >
        优化标题
      </div>
      <div class="rounded-1 px-2 py-1 cursor-pointer bg-[#eee] hover:bg-blue" :class="{ 'is-active bg-blue': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
        优化需求
      </div>
    </BubbleMenu>
    <EditorContent :editor="editor" />
  </div>
</template>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }
}
</style>
