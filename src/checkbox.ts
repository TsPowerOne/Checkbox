import {Subject}from 'rxjs';
import {collToArray, CoreElement, InputElement, InputData} from '@tspower/core';
export class CheckBoxData{
    name:string;
    id:string;
    checked:boolean;
    constructor(name:string, id:string, checked:boolean){
        this.name = name;
        this.id = id;
        this.checked = checked;
    }
}
export class CheckBox extends InputElement{

    constructor(
                    private Root:HTMLElement,
                    private name:string,
                    private Group?:string,
                    
                    Id?:string, 
                    Class?:string, 
                    Style?:string,

                    private checked:boolean = false,
                    private exclusive:boolean = false,
                    private _disabled:boolean = false
                    ){

                        super(Root, name, !_disabled, "checkbox", Id, Class, Style);
                        this.Init();

                    }

    Init = () => {
        this.DisableInputObservable(true);
        this.DisableClickObservable(true);
        this.DisableChangeObservable(true);
        
        if(this.Group)this.setAttr("data-group", this.Group);
        if(this.checked)this.setAttr("checked", "checked");
        if(this._disabled)this.setAttr("disabled", "disabled");


        this.node.addEventListener("change", (event)=>{

            if(this.node.getAttribute("checked")){
                this.checked = false;
                this.node.removeAttribute("checked");
                (this.node as HTMLInputElement).checked = false;
            }else{
                this.checked = true;
                this.node.setAttribute("checked", "checked");
                (this.node as HTMLInputElement).checked = true;
            }
            let data = new InputData(this.name, this.Id, null, this._enabled, this.checked, true);
            this.changed.next(data);
        });

        if(this.exclusive)this.node.addEventListener("change", (event)=>{
            if(this.isChecked()){
                let selector = (this.Group)?`input[type=checkbox][data-group="${this.Group}"]`: `input[type="checkbox"]`;

                let otherCheckbox = this.NodeSelect(selector);

                otherCheckbox.forEach(e=>{
                    let name = e.getAttribute("name");
                    if(name!=this.name){
                        e.removeAttribute("checked");
                        e.checked = false;
                    }
                });
        }

        });

        this.Root.appendChild(this.node);
    }
setGroup = (value:string):void=>{
    if(value){
        this.Group = value;
        this.setAttr("data-group", this.Group);
    }
}
group = (value:string):this=>{
    this.Group = value;
    this.setAttr("data-group", this.Group);
    return this;
}
isChecked = ():boolean => {
    this.checked = (this.node.getAttribute("checked"))?true:false;
    return this.checked;
}

check = ():void => {
            this.checked = true;
            this.node.setAttribute("checked", "checked");
            (this.node as HTMLInputElement).checked = true;

            if(this.exclusive){
                let selector = (this.Group)?`input[type=checkbox][data-group="${this.Group}"]`: `input[type="checkbox"]`;
                let otherCheckbox = this.NodeSelect(selector);
                otherCheckbox.forEach(e=>{
                    let name = e.getAttribute("name");
                    if(name!=this.name){
                        e.removeAttribute("checked");
                        e.checked = false;
                    }
                });
            }

            
            let data = new InputData(this.name, this.Id, null, this._enabled, this.checked, true);
            this.changed.next(data);
}

uncheck = ():void => {
    this.checked = false;
    this.node.removeAttribute("checked");
    (this.node as HTMLInputElement).checked = false;
    let data = new InputData(this.name, this.Id, null, this._enabled, this.checked, true);
            this.changed.next(data);
}

private NodeSelect = (selector:string):Array<any>=>{
    let nodes = document.querySelectorAll(selector);
    return collToArray(nodes);
}
}