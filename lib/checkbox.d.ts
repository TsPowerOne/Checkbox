import { InputElement } from '@tspower/core';
export declare class CheckBoxData {
    name: string;
    id: string;
    checked: boolean;
    constructor(name: string, id: string, checked: boolean);
}
export declare class CheckBox extends InputElement {
    private Root;
    private name;
    private Group?;
    private checked;
    private exclusive;
    private _disabled;
    constructor(Root: HTMLElement, name: string, Group?: string, Id?: string, Class?: string, Style?: string, checked?: boolean, exclusive?: boolean, _disabled?: boolean);
    Init: () => void;
    setGroup: (value: string) => void;
    group: (value: string) => this;
    isChecked: () => boolean;
    check: () => void;
    uncheck: () => void;
    private NodeSelect;
}
