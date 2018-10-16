export declare class CheckBox {
    private Root;
    private name;
    private checked?;
    private exclusive?;
    private group?;
    private Id?;
    private Class?;
    private Style?;
    private node;
    private clicked;
    private changed;
    clicked$: import("rxjs/internal/Observable").Observable<any>;
    changed$: import("rxjs/internal/Observable").Observable<any>;
    constructor(Root: HTMLElement, name: string, checked?: boolean, exclusive?: boolean, group?: string, Id?: string, Class?: string, Style?: string);
    create: () => void;
    isChecked: () => boolean;
    private NodeSelect;
}
