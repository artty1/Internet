System.register([], function (exports_1, context_1) {
    "use strict";
    var DGColumn, ActionCallback, DatagridAction;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DGColumn = /** @class */ (function () {
                function DGColumn(title, fieldname, columnCSS, display) {
                    if (title === void 0) { title = ''; }
                    if (fieldname === void 0) { fieldname = ''; }
                    if (columnCSS === void 0) { columnCSS = "data-left"; }
                    if (display === void 0) { display = true; }
                    this.display = true;
                    this.title = title;
                    this.fieldName = fieldname;
                    this.align = columnCSS;
                    this.display = display;
                }
                return DGColumn;
            }());
            exports_1("DGColumn", DGColumn);
            ActionCallback = /** @class */ (function () {
                function ActionCallback() {
                }
                return ActionCallback;
            }());
            exports_1("ActionCallback", ActionCallback);
            (function (DatagridAction) {
                DatagridAction[DatagridAction["Select"] = 0] = "Select";
                DatagridAction[DatagridAction["View"] = 1] = "View";
                DatagridAction[DatagridAction["Edit"] = 2] = "Edit";
                DatagridAction[DatagridAction["Delete"] = 3] = "Delete";
                DatagridAction[DatagridAction["Check"] = 4] = "Check";
                DatagridAction[DatagridAction["Uncheck"] = 5] = "Uncheck";
            })(DatagridAction || (DatagridAction = {}));
            exports_1("DatagridAction", DatagridAction);
        }
    };
});
//# sourceMappingURL=dgconfig.js.map