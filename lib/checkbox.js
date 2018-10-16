"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var core_1 = require("@tspower/core");
var CheckBox = /** @class */ (function () {
    function CheckBox(Root, name, checked, exclusive, group, Id, Class, Style) {
        var _this = this;
        this.Root = Root;
        this.name = name;
        this.checked = checked;
        this.exclusive = exclusive;
        this.group = group;
        this.Id = Id;
        this.Class = Class;
        this.Style = Style;
        this.clicked = new rxjs_1.Subject();
        this.changed = new rxjs_1.Subject();
        this.clicked$ = this.clicked.asObservable();
        this.changed$ = this.changed.asObservable();
        this.create = function () {
            var that = _this;
            var input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("name", _this.name);
            if (_this.group)
                input.setAttribute("data-group", _this.group);
            if (_this.checked)
                input.setAttribute("checked", "checked");
            input.addEventListener("click", function (event) {
                _this.clicked.next(true);
            });
            input.addEventListener("change", function (event) {
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
                _this.changed.next(_this.checked);
            });
            if (_this.exclusive)
                input.addEventListener("change", function (event) {
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
            if (_this.Id)
                input.setAttribute("id", _this.Id);
            if (_this.Class)
                input.setAttribute("class", _this.Class);
            if (_this.Style)
                input.setAttribute("style", _this.Style);
            _this.node = input;
            _this.Root.appendChild(input);
        };
        this.isChecked = function () {
            var ck = _this.node.getAttribute("checked");
            _this.checked = (ck) ? true : false;
            return _this.checked;
        };
        this.NodeSelect = function (selector) {
            var nodes = document.querySelectorAll(selector);
            return core_1.collToArray(nodes);
        };
        this.create();
    }
    return CheckBox;
}());
exports.CheckBox = CheckBox;
