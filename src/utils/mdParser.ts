import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

export const mdParser = MarkdownIt({
  html: true,
  highlight: function (str: string, lang: string) {
    // https://github.com/MinecraftForge/Documentation/pull/433
    const _lang = lang === 'json5' ? 'js' : lang;
    if (_lang && hljs.getLanguage(_lang)) {
      try {
        const code = hljs
          .highlight(str, { language: _lang, ignoreIllegals: true })
          .value;

        return `<pre class="omb-code-wrap"><code class="omb-code-container hljs language-${_lang}">${code}</code></pre>`;
      } catch (__) { }
    }
    return ''; // use external default escaping
  },
});
