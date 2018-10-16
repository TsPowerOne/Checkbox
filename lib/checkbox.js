"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var core_1 = require("@tspower/core");
var CheckBox = /** @class */ (function () {
    function CheckBox(Root, name, group, Id, Class, Style, checked, exclusive, disabled) {
        if (checked === void 0) { checked = false; }
        if (exclusive === void 0) { exclusive = false; }
        if (disabled === void 0) { disabled = false; }
        var _this = this;
        this.Root = Root;
        this.name = name;
        this.group = group;
        this.Id = Id;
        this.Class = Class;
        this.Style = Style;
        this.checked = checked;
        this.exclusive = exclusive;
        this.disabled = disabled;
        this.clicked = new rxjs_1.Subject();
        this.changed = new rxjs_1.Subject();
        this.enab = new rxjs_1.Subject();
        this.disab = new rxjs_1.Subject();
        this.clicked$ = this.clicked.asObservable();
        this.changed$ = this.changed.asObservable();
        this.enabled$ = this.enab.asObservable();
        this.disabled$ = this.disab.asObservable();
        this.create = function () {
            var that = _this;
            var input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("name", _this.name);
            if (_this.group)
                input.setAttribute("data-group", _this.group);
            if (_this.checked)
                input.setAttribute("checked", "checked");
            if (_this.disabled)
                input.setAttribute("disabled", "disabled");
            input.addEventListener("click", function (event) {
                _this.clicked.next({ name: _this.name });
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
                _this.changed.next({ name: _this.name, checked: _this.checked });
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
            _this.checked = (_this.node.getAttribute("checked")) ? true : false;
            return _this.checked;
        };
        this.check = function () {
            _this.checked = true;
            _this.node.setAttribute("checked", "checked");
            _this.node.checked = true;
            _this.changed.next({ name: _this.name, checked: _this.checked });
        };
        this.uncheck = function () {
            _this.checked = false;
            _this.node.removeAttribute("checked");
            _this.node.checked = false;
            _this.changed.next({ name: _this.name, checked: _this.checked });
        };
        this.isEnabled = function () {
            _this.disabled = (_this.node.getAttribute("disabled")) ? true : false;
            return !_this.disabled;
        };
        this.enable = function () {
            _this.node.disabled = false;
            _this.node.removeAttribute("disabled");
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
            _this.enab.next({ name: _this.name, enabled: true });
        };
        this.disable = function () {
            _this.node.disabled = true;
            _this.node.setAttribute("disabled", "disabled");
            _this.disab.next({ name: _this.name, enabled: false });
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
