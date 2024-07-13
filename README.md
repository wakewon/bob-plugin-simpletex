# Bob Plugin - SimpleTex

SimpleTex 提供了免费且好用的公式/文档识别 API。本插件使用了通用图片识别接口，目前的免费额度详见 [官网说明](https://simpletex.cn/api)。

## 使用说明

### 安装插件

请在 [Release 页面](https://github.com/wakewon/bob-plugin-simpletex/releases/latest) 下载最新版本的插件安装包，并参照 [插件安装教程](https://bobtranslate.com/guide/advance/plugin.html) 安装。

如果你的电脑上无法看到文件的 `.zip` 后缀名，请参照下面这篇文档显示后缀名：

[【Apple 官网】在 Mac 上显示或隐藏文件扩展名](https://support.apple.com/zh-cn/guide/mac-help/mchlp2304)

### 申请密钥

本插件需要申请 SimpleTex 的 API，申请教程可参考：

[【知乎】SimpleTex 申请 API 教程](https://zhuanlan.zhihu.com/p/695315620)

申请完成后，请在 `Bob 偏好设置` -> `翻译` -> `服务` -> `文本识别` 中添加 `SimpleTex 公式识别` 服务，并填写刚刚申请时得到的 `App ID` 和 `App Secret`。

❗️请务必注意，目前本插件只支持作为 `截图翻译` 功能的文本识别服务使用，不支持在各类 `截图OCR` 功能中使用❗️

你可以在 `截图翻译` 后点击输入框中的复制按钮复制识别结果，也可以在翻译界面右上角的按钮中开启 `自动复制截图翻译 OCR 结果` 实现自动复制。

### 小技巧

你还可以搭配 OpenAI 等 AI 服务进一步把识别出来的 LaTeX 公式转换为 MathML 格式，方便在 Word 中直接粘贴。这里提供一个可供参考的自定义 Prompt：

```
As an academic expert, kindly translate the following content from ${detectFrom} to ${detectTo}. If the original text is a LaTeX formula, please convert it into MathML format. Please provide only the translated result without any additional information. The original content is as follows:

${text}
```

## 致谢

[selaselah/bob-plugin-mathpix](https://github.com/selaselah/bob-plugin-mathpix)

[Zotero Action Scripts: OCR math to latex from image annotations](https://github.com/windingwind/zotero-actions-tags/discussions/220)

[gemini-1.5-flash-latest](https://ai.google.dev/gemini-api)

[gpt-3.5-turbo](https://openai.com/api/)
