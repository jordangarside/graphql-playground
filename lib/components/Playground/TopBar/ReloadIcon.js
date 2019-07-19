"use strict";

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var index_1 = require("../../../styled/index");
var ReloadIcon = function ReloadIcon(props) {
    return React.createElement(
        Positioner,
        { onClick: props.onReloadSchema, title: "Reload Schema" },
        React.createElement(
            Svg,
            { viewBox: "0 0 20 20" },
            React.createElement(Circle, { cx: "9.5", cy: "10", r: "6", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", isReloadingSchema: props.isReloadingSchema }),
            React.createElement(Icon, { d: "M4.83 4.86a6.92 6.92 0 0 1 11.3 2.97l.41-1.23c.13-.4.56-.6.95-.47.4.13.6.56.47.95l-1.13 3.33a.76.76 0 0 1-.7.5.72.72 0 0 1-.43-.12l-2.88-1.92a.76.76 0 0 1-.2-1.04.75.75 0 0 1 1.03-.2l1.06.7A5.34 5.34 0 0 0 9.75 4.5a5.44 5.44 0 0 0-5.64 5.22 5.42 5.42 0 0 0 5.24 5.62c.41 0 .74.36.72.78a.75.75 0 0 1-.75.72H9.3a6.9 6.9 0 0 1-6.68-7.18 6.88 6.88 0 0 1 2.22-4.81z", isReloadingSchema: props.isReloadingSchema })
        )
    );
};
exports.default = ReloadIcon;
var refreshFrames = index_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n0% {\n  transform: rotate(0deg);\n  stroke-dashoffset: 7.92;\n}\n\n50% {\n  transform: rotate(720deg);\n  stroke-dashoffset: 37.68;\n}\n\n100% {\n  transform: rotate(1080deg);\n  stroke-dashoffset: 7.92;\n}\n"], ["\n0% {\n  transform: rotate(0deg);\n  stroke-dashoffset: 7.92;\n}\n\n50% {\n  transform: rotate(720deg);\n  stroke-dashoffset: 37.68;\n}\n\n100% {\n  transform: rotate(1080deg);\n  stroke-dashoffset: 7.92;\n}\n"
// same result for these 2 keyframes, however when the props change
// it makes the element animated with these keyframes to trigger
// again the animation
])));
// same result for these 2 keyframes, however when the props change
// it makes the element animated with these keyframes to trigger
// again the animation
var reloadAction = function reloadAction(props) {
    return index_1.keyframes(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n0% {\n  transform: rotate(", "deg);\n}\n\n100% {\n  transform: rotate(", "deg);\n}"], ["\n0% {\n  transform: rotate(", "deg);\n}\n\n100% {\n  transform: rotate(", "deg);\n}"])), props.isReloadingSchema ? 0 : 360, props.isReloadingSchema ? 360 : 720);
};
var Positioner = index_1.styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  right: 5px;\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  transform: rotateY(180deg);\n"], ["\n  position: absolute;\n  right: 5px;\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  transform: rotateY(180deg);\n"])));
var Svg = index_1.styled.svg(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  fill: ", ";\n  transition: 0.1s linear all;\n\n  &:hover {\n    fill: ", ";\n  }\n"], ["\n  fill: ", ";\n  transition: 0.1s linear all;\n\n  &:hover {\n    fill: ", ";\n  }\n"])), function (p) {
    return p.theme.editorColours.icon;
}, function (p) {
    return p.theme.editorColours.iconHover;
});
var Circle = index_1.styled('circle')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  fill: none;\n  stroke: ", ";\n  stroke-dasharray: 37.68;\n  transition: opacity 0.3s ease-in-out;\n  opacity: ", ";\n  transform-origin: 9.5px 10px;\n  animation: ", " 2s linear\n    ", ";\n"], ["\n  fill: none;\n  stroke: ", ";\n  stroke-dasharray: 37.68;\n  transition: opacity 0.3s ease-in-out;\n  opacity: ", ";\n  transform-origin: 9.5px 10px;\n  animation: ", " 2s linear\n    ", ";\n"])), function (p) {
    return p.theme.editorColours.icon;
}, function (p) {
    return p.isReloadingSchema ? 1 : 0;
}, refreshFrames, function (p) {
    return p.isReloadingSchema ? 'infinite' : '';
});
var Icon = index_1.styled('path')(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  transition: opacity 0.3s ease-in-out;\n  opacity: ", ";\n  transform-origin: 9.5px 10px;\n  animation: ", " 0.5s linear;\n"], ["\n  transition: opacity 0.3s ease-in-out;\n  opacity: ", ";\n  transform-origin: 9.5px 10px;\n  animation: ", " 0.5s linear;\n"])), function (p) {
    return p.isReloadingSchema ? 0 : 1;
}, reloadAction);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=ReloadIcon.jsx.map