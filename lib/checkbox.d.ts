export declare class CheckBox {
    private Root;
    private name;
    private group?;
    private Id?;
    private Class?;
    private Style?;
    private checked;
    private exclusive;
    private disabled;
    private node;
    private clicked;
    private changed;
    private enab;
    private disab;
    clicked$: import("rxjs/internal/Observable").Observable<any>;
    changed$: import("rxjs/internal/Observable").Observable<any>;
    enabled$: import("rxjs/internal/Observable").Observable<any>;
    disabled$: import("rxjs/internal/Observable").Observable<any>;
    constructor(Root: HTMLElement, name: string, group?: string, Id?: string, Class?: string, Style?: string, checked?: boolean, exclusive?: boolean, disabled?: boolean);
    create: () => void;
    isChecked: () => boolean;
    check: () => void;
    uncheck: () => void;
    isEnabled: () => boolean;
    enable: () => void;
    disable: () => void;
    private NodeSelect;
}
