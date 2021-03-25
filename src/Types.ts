export enum Style {
    Bold, Italic
}

export enum Tag {
    Paragraph
}

export type ControlType = {
    id: string;
    tag: Tag;
    text: string;
    styles: Style[];
    selected: boolean;
}

function styleToCssClass(style: Style): string {
    switch (style) {
        case Style.Bold: return "bold";
        case Style.Italic: return "italic"
    }
}

export function renderControlClasses(control: ControlType): string {
    return control.styles.map(styleToCssClass).join(' ');
}