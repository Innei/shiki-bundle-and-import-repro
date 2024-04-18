import './style.css'

async function main() {
  const codeHighlighter = await (async () => {
    const [{ getHighlighterCore }, getWasm] = await Promise.all([
      import('shiki'),
      import('shiki/wasm').then((m) => m.default),
    ])

    const shiki = await getHighlighterCore({
      themes: [
        import('shiki/themes/github-light.mjs'),
        import('shiki/themes/github-dark.mjs'),
      ],
      langs: [
        () => import('shiki/langs/javascript.mjs'),
        () => import('shiki/langs/typescript.mjs'),
        () => import('shiki/langs/css.mjs'),
        () => import('shiki/langs/tsx.mjs'),
        () => import('shiki/langs/jsx.mjs'),
        () => import('shiki/langs/json.mjs'),
        () => import('shiki/langs/sql.mjs'),
        () => import('shiki/langs/rust.mjs'),
        () => import('shiki/langs/go.mjs'),
        () => import('shiki/langs/cpp.mjs'),
        () => import('shiki/langs/c.mjs'),
        () => import('shiki/langs/markdown.mjs'),
        () => import('shiki/langs/vue.mjs'),
        () => import('shiki/langs/html.mjs'),
        () => import('shiki/langs/asm.mjs'),
        () => import('shiki/langs/shell.mjs'),
        () => import('shiki/langs/ps.mjs'),
      ],
      loadWasm: getWasm,
    })

    return (o: { lang: string; attrs: string; code: string }) =>
      shiki.codeToHtml(o.code, {
        lang: o.lang,
        theme: 'github-light',
      })
  })()

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   ${codeHighlighter({
     lang: 'typescript',
     attrs: '',
     code: `import typescriptLogo from './typescript.svg'`,
   })}
  </div>
`
}
main()
