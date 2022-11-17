import { EditorState, basicSetup } from "./dependency/pkg/@codemirror/basic-setup.js";
import { defaultTabBinding } from "./dependency/pkg/@codemirror/commands.js";
import { EditorView, keymap } from "./dependency/pkg/@codemirror/view.js";
import { json } from "./dependency/pkg/@codemirror/lang-json.js";

export default function setupEditors() {
  const jsonRequestBody = document.querySelector("[data-json-request-body]");
  const jsonResponseBody = document.querySelector("[data-json-response-body]");

  const basicExtensions = [
    basicSetup,
    keymap.of([defaultTabBinding]),
    json(),
    EditorState.tabSize.of(2),
  ];

  const requestEditor = new EditorView({
    state: EditorState.create({
      doc: "{\n\t\n}",
      extensions: basicExtensions,
    }),
    parent: jsonRequestBody,
  });

  const responseEditor = new EditorView({
    state: EditorState.create({
      doc: "{}",
      extensions: [...basicExtensions, EditorView.editable.of(false)],
    }),
    parent: jsonResponseBody,
  });

  function updateResponseEditor(value) {
    responseEditor.dispatch({
      changes: {
        from: 0,
        to: responseEditor.state.doc.length,
        insert: JSON.stringify(value, null, 2),
      },
    });
  }

  return { requestEditor, updateResponseEditor };
}
