import {Subject}from 'rxjs';
import {collToArray} from '@tspower/core';


export class CheckBox{
    private node:HTMLInputElement;
    private clicked = new Subject<any>();
    private changed = new Subject<any>();
    public clicked$ = this.clicked.asObservable();
    public changed$ = this.changed.asObservable();
    
    

    constructor(private Root:HTMLElement,
                private name:string,
                private checked?:boolean,
                private exclusive?:boolean,
                private group?:string,
                private Id?:string, 
                private Class?:string, 
                private Style?:string)
    {
        this.create();
    }
    
    create = ()=>{
        let that = this;
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", this.name);

        if(this.group)input.setAttribute("data-group", this.group);

        if(this.checked)input.setAttribute("checked", "checked");

        input.addEventListener("click", (event)=>{
            this.clicked.next( { name:this.name } );
            
        });
        input.addEventListener("change", (event)=>{

            if(this.node.getAttribute("checked")){
                this.checked = false;
                this.node.removeAttribute("checked");
                this.node.checked = false;
            }else{
                this.checked = true;
                this.node.setAttribute("checked", "checked");
                this.node.checked = true;
            }
            this.changed.next( { name:this.name, checked:this.checked } );
        });

        if(this.exclusive)input.addEventListener("change", (event)=>{
            if(this.isChecked()){
                let selector = (this.group)?`input[type=checkbox][data-group="${this.group}"]`: `input[type="checkbox"]`;

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


        if(this.Id)input.setAttribute("id", this.Id);
        if(this.Class)input.setAttribute("class", this.Class);
        if(this.Style)input.setAttribute("style", this.Style);
        this.node = input;
        this.Root.appendChild(input);
    }
    isChecked = ():boolean=>{
        let ck = this.node.getAttribute("checked");
        this.checked = (ck)?true:false;
        return this.checked;
    }
    private NodeSelect = (selector:string):Array<any>=>{
        let nodes = document.querySelectorAll(selector);
        return collToArray(nodes);
    }

}