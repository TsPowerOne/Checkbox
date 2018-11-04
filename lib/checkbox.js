"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var core_1 = require("@tspower/core");
/*
export class CheckBoxOld{

    private node:HTMLInputElement;
    private clicked = new Subject<any>();
    private changed = new Subject<any>();
    private enab = new Subject<any>();
    private disab = new Subject<any>();

    public clicked$ = this.clicked.asObservable();
    public changed$ = this.changed.asObservable();
    public enabled$ = this.enab.asObservable();
    public disabled$ = this.disab.asObservable();
    

    constructor(
                private Root:HTMLElement,
                private name:string,

                private group?:string,
                private Id?:string,
                private Class?:string,
                private Style?:string,

                private checked:boolean = false,
                private exclusive:boolean = false,
                private disabled:boolean = false
                )
    {
        this.create();
    }
    
    create = () => {
        let that = this;

        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", this.name);

        if(this.group)input.setAttribute("data-group", this.group);
        if(this.checked)input.setAttribute("checked", "checked");
        if(this.disabled)input.setAttribute("disabled", "disabled");




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

    isChecked = ():boolean => {
        this.checked = (this.node.getAttribute("checked"))?true:false;
        return this.checked;
    }

    check = ():void => {
                this.checked = true;
                this.node.setAttribute("checked", "checked");
                this.node.checked = true;

                if(this.exclusive){
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

                
                this.changed.next( { name:this.name, checked:this.checked } );
    }

    uncheck = ():void => {
        this.checked = false;
        this.node.removeAttribute("checked");
        this.node.checked = false;
        this.changed.next( { name:this.name, checked:this.checked } );
    }
    
    isEnabled = ():boolean =>{
        this.disabled = (this.node.getAttribute("disabled"))? true : false;
        return !this.disabled;
    }

    enable = ():void =>{
        this.node.disabled = false;
        this.node.removeAttribute("disabled");
        this.enab.next( { name:this.name, enabled: true } );
    }

    disable = ():void =>{
        this.node.disabled = true;
        this.node.setAttribute("disabled", "disabled");
        this.disab.next( { name:this.name, enabled: false } );
    }
    
    private NodeSelect = (selector:string):Array<any>=>{
        let nodes = document.querySelectorAll(selector);
        return collToArray(nodes);
    }

}*/
var CheckBox = /** @class */ (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox(Root, name, group, Id, Class, Style, checked, exclusive, disabled) {
        if (checked === void 0) { checked = false; }
        if (exclusive === void 0) { exclusive = false; }
        if (disabled === void 0) { disabled = false; }
        var _this = _super.call(this, "input", Id, Class, Style) || this;
        _this.Root = Root;
        _this.name = name;
        _this.group = group;
        _this.checked = checked;
        _this.exclusive = exclusive;
        _this.disabled = disabled;
        // private node:HTMLInputElement;
        _this.clicked = new rxjs_1.Subject();
        _this.changed = new rxjs_1.Subject();
        _this.enab = new rxjs_1.Subject();
        _this.disab = new rxjs_1.Subject();
        _this.clicked$ = _this.clicked.asObservable();
        _this.changed$ = _this.changed.asObservable();
        _this.enabled$ = _this.enab.asObservable();
        _this.disabled$ = _this.disab.asObservable();
        _this.Init = function () {
            var that = _this;
            _this.setAttr("type", "checkbox");
            _this.setAttr("name", _this.name);
            if (_this.group)
                _this.setAttr("data-group", _this.group);
            if (_this.checked)
                _this.setAttr("checked", "checked");
            if (_this.disabled)
                _this.setAttr("disabled", "disabled");
            _this.node.addEventListener("click", function (event) {
                _this.clicked.next({ name: _this.name });
            });
            _this.node.addEventListener("change", function (event) {
                if (_this.node.getAttribute("checked")) {
                    _this.checked = false;
                    _this.node.removeAttribute("checked");
                    _this.node.checked = false;
                }
                else {
                    _this.checked = true;
                    _this.node.setAttribute("checked", "checked");
                    _this.node.checked = true;
                }
                _this.changed.next({ name: _this.name, checked: _this.checked });
            });
            if (_this.exclusive)
                _this.node.addEventListener("change", function (event) {
                    if (_this.isChecked()) {
                        var selector = (_this.group) ? "input[type=checkbox][data-group=\"" + _this.group + "\"]" : "input[type=\"checkbox\"]";
                        var otherCheckbox = _this.NodeSelect(selector);
                        otherCheckbox.forEach(function (e) {
                            var name = e.getAttribute("name");
                            if (name != _this.name) {
                                e.removeAttribute("checked");
                                e.checked = false;
                            }
                        });
                    }
                });
            _this.Root.appendChild(_this.node);
        };
        _this.isChecked = function () {
            _this.checked = (_this.node.getAttribute("checked")) ? true : false;
            return _this.checked;
        };
        _this.check = function () {
            _this.checked = true;
            _this.node.setAttribute("checked", "checked");
            _this.node.checked = true;
            if (_this.exclusive) {
                var selector = (_this.group) ? "input[type=checkbox][data-group=\"" + _this.group + "\"]" : "input[type=\"checkbox\"]";
                var otherCheckbox = _this.NodeSelect(selector);
                otherCheckbox.forEach(function (e) {
                    var name = e.getAttribute("name");
                    if (name != _this.name) {
                        e.removeAttribute("checked");
                        e.checked = false;
                    }
                });
            }
            _this.changed.next({ name: _this.name, checked: _this.checked });
        };
        _this.uncheck = function () {
            _this.checked = false;
            _this.node.removeAttribute("checked");
            _this.node.checked = false;
            _this.changed.next({ name: _this.name, checked: _this.checked });
        };
        _this.isEnabled = function () {
            _this.disabled = (_this.node.getAttribute("disabled")) ? true : false;
            return !_this.disabled;
        };
        _this.enable = function () {
            _this.node.disabled = false;
            _this.node.removeAttribute("disabled");
            _this.enab.next({ name: _this.name, enabled: true });
        };
        _this.disable = function () {
            _this.node.disabled = true;
            _this.node.setAttribute("disabled", "disabled");
            _this.disab.next({ name: _this.name, enabled: false });
        };
        _this.NodeSelect = function (selector) {
            var nodes = document.querySelectorAll(selector);
            return core_1.collToArray(nodes);
        };
        _this.Init();
        return _this;
    }
    return CheckBox;
}(core_1.CoreElement));
exports.CheckBox = CheckBox;
