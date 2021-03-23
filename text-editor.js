"use strict";
const SELECTED_ATTR = "aria-selected";
function getSelectedElement() {
    return document.querySelector("[aria-selected]");
}
const btnBold = document.getElementById("btn-bold");
if (btnBold) {
    btnBold.addEventListener("click", function (e) {
        const selected = getSelectedElement();
        if (selected) {
            selected.classList.toggle("bold");
        }
    });
}
const btnItalic = document.getElementById("btn-italic");
if (btnItalic) {
    btnItalic.addEventListener("click", function (e) {
        const selected = getSelectedElement();
        if (selected) {
            selected.classList.toggle("italic");
        }
    });
}
const textEditor = document.getElementById("text-editor");
var Tag;
(function (Tag) {
    Tag[Tag["Paragraph"] = 0] = "Paragraph";
})(Tag || (Tag = {}));
function tagToHtmlTag(tag) {
    switch (tag) {
        case Tag.Paragraph: return "p";
    }
}
var Style;
(function (Style) {
    Style[Style["Bold"] = 0] = "Bold";
    Style[Style["Italic"] = 1] = "Italic";
})(Style || (Style = {}));
function styleToCssClass(style) {
    switch (style) {
        case Style.Bold: return "bold";
        case Style.Italic: return "italic";
    }
}
class Line {
    constructor(tag, text, styles, selected) {
        this._tag = tag;
        this._text = text;
        this._styles = styles;
        this.selected = selected;
    }
    get tag() {
        return this._tag;
    }
    get text() {
        return this._text;
    }
    get styles() {
        return this._styles;
    }
}
const lines = [];
function clearSelection() {
    if (textEditor) {
        for (let item of textEditor.children) {
            item.removeAttribute(SELECTED_ATTR);
        }
    }
}
function addLineToDocument(line, textEditorElement) {
    const element = document.createElement(tagToHtmlTag(line.tag));
    element.textContent = line.text;
    element.classList.add(...line.styles.map(styleToCssClass));
    element.setAttribute("contenteditable", "true");
    element.addEventListener("focusin", function (e) {
        clearSelection();
        element.setAttribute(SELECTED_ATTR, "true");
    });
    if (line.selected) {
        element.setAttribute("aria-selected", "true");
    }
    textEditorElement.appendChild(element);
    element.focus();
}
lines.push(new Line(Tag.Paragraph, "lalala", [Style.Bold], false));
if (textEditor) {
    for (const line of lines) {
        addLineToDocument(line, textEditor);
    }
    addLineToDocument(new Line(Tag.Paragraph, "", [], true), textEditor);
}
