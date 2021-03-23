const SELECTED_ATTR = "aria-selected";

function getSelectedElement(): Element | null {
    return document.querySelector("[aria-selected]");
}

const btnBold = document.getElementById("btn-bold");

if (btnBold) {
    btnBold.addEventListener("click", function (e: MouseEvent) {
        const selected = getSelectedElement();
        if (selected) {
            selected.classList.toggle("bold");
        }
    });
}

const btnItalic = document.getElementById("btn-italic");

if (btnItalic) {
    btnItalic.addEventListener("click", function (e: MouseEvent) {
        const selected = getSelectedElement();
        if (selected) {
            selected.classList.toggle("italic");
        }
    });
}

const textEditor = document.getElementById("text-editor");

enum Tag {
    Paragraph
}

function tagToHtmlTag(tag: Tag) {
    switch (tag) {
        case Tag.Paragraph: return "p";
    }
}

enum Style {
    Bold, Italic
}

function styleToCssClass(style: Style): string {
    switch (style) {
        case Style.Bold: return "bold";
        case Style.Italic: return "italic"
    }
}

class Line {
    private _tag: Tag;
    private _text: string;
    private _styles: Style[];
    public selected: boolean;

    constructor(tag: Tag, text: string, styles: Style[], selected: boolean) {
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

const lines: Line[] = [];

function clearSelection() {
    if (textEditor)
    {
        for (let item of textEditor.children) {
            item.removeAttribute(SELECTED_ATTR)
        }
    }
}

function addLineToDocument(line: Line, textEditorElement: Element) {
    const element = document.createElement(tagToHtmlTag(line.tag));

    element.textContent = line.text;
    element.classList.add(...line.styles.map(styleToCssClass));
    element.setAttribute("contenteditable", "true");
    element.addEventListener("focusin", function (e: FocusEvent) {
        clearSelection();
        element.setAttribute(SELECTED_ATTR, "true");
    });

    if (line.selected) {
        element.setAttribute("aria-selected", "true");
    }
    
    textEditorElement.appendChild(element);

    element.focus();
}


lines.push(new Line(Tag.Paragraph, "lalala", [Style.Bold], false))

if (textEditor) {
    for (const line of lines) {
        addLineToDocument(line, textEditor);
    }

    addLineToDocument(new Line(Tag.Paragraph, "", [], true), textEditor);

}


