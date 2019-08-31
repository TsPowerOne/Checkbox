"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@tspower/core");
var CheckBoxData = /** @class */ (function () {
    function CheckBoxData(name, id, checked) {
        this.name = name;
        this.id = id;
        this.checked = checked;
    }
    return CheckBoxData;
}());
exports.CheckBoxData = CheckBoxData;
var CheckBox = /** @class */ (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox(Root, name, Group, Id, Class, Style, checked, exclusive, _disabled) {
        if (checked === void 0) { checked = false; }
        if (exclusive === void 0) { exclusive = false; }
        if (_disabled === void 0) { _disabled = false; }
        var _this = _super.call(this, Root, name, !_disabled, "checkbox", Id, Class, Style) || this;
        _this.Root = Root;
        _this.name = name;
        _this.Group = Group;
        _this.checked = checked;
        _this.exclusive = exclusive;
        _this._disabled = _disabled;
        _this.Init = function () {
            _this.DisableInputObservable(true);
            _this.DisableClickObservable(true);
            _this.DisableChangeObservable(true);
            if (_this.Group)
                _this.setAttr("data-group", _this.Group);
            if (_this.checked)
                _this.setAttr("checked", "checked");
            if (_this._disabled)
                _this.setAttr("disabled", "disabled");
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
                var data = new core_1.InputData(_this.name, _this.Id, null, _this._enabled, _this.checked, true);
                _this.changed.next(data);
            });
            if (_this.exclusive)
                _this.node.addEventListener("change", function (event) {
                    if (_this.isChecked()) {
                        var selector = (_this.Group) ? "input[type=checkbox][data-group=\"" + _this.Group + "\"]" : "input[type=\"checkbox\"]";
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
        _this.setGroup = function (value) {
            if (value) {
                _this.Group = value;
                _this.setAttr("data-group", _this.Group);
            }
        };
        _this.group = function (value) {
            _this.Group = value;
            _this.setAttr("data-group", _this.Group);
            return _this;
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
                var selector = (_this.Group) ? "input[type=checkbox][data-group=\"" + _this.Group + "\"]" : "input[type=\"checkbox\"]";
                var otherCheckbox = _this.NodeSelect(selector);
                otherCheckbox.forEach(function (e) {
                    var name = e.getAttribute("name");
                    if (name != _this.name) {
                        e.removeAttribute("checked");
                        e.checked = false;
                    }
                });
            }
            var data = new core_1.InputData(_this.name, _this.Id, null, _this._enabled, _this.checked, true);
            _this.changed.next(data);
        };
        _this.uncheck = function () {
            _this.checked = false;
            _this.node.removeAttribute("checked");
            _this.node.checked = false;
            var data = new core_1.InputData(_this.name, _this.Id, null, _this._enabled, _this.checked, true);
            _this.changed.next(data);
        };
        _this.NodeSelect = function (selector) {
            var nodes = document.querySelectorAll(selector);
            return core_1.collToArray(nodes);
        };
        _this.Init();
        return _this;
    }
    return CheckBox;
}(core_1.InputElement));
exports.CheckBox = CheckBox;
