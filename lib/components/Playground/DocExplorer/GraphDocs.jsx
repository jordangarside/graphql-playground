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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var keycode = require("keycode");
var elementPosition_1 = require("graphiql/dist/utility/elementPosition");
var FieldDoc_1 = require("./FieldDoc");
var ColumnDoc_1 = require("./ColumnDoc");
var actions_1 = require("../../../state/docs/actions");
var Spinner_1 = require("../../Spinner");
var constants_1 = require("../../../constants");
var RootColumn_1 = require("./RootColumn");
var stack_1 = require("../util/stack");
var selectors_1 = require("../../../state/docs/selectors");
var selectors_2 = require("../../../state/sessions/selectors");
var reselect_1 = require("reselect");
var styled_1 = require("../../../styled");
var GraphDocs = /** @class */ (function (_super) {
    __extends(GraphDocs, _super);
    function GraphDocs(props) {
        var _this = _super.call(this, props) || this;
        _this.clientX = 0;
        _this.clientY = 0;
        _this.setRef = function (ref) {
            _this.ref = ref;
        };
        _this.showDocFromType = function (type) {
            _this.props.setDocsVisible(_this.props.sessionId, true);
            _this.props.addStack(_this.props.sessionId, type, 0, 0);
        };
        _this.setDocExplorerRef = function (ref) {
            _this.refDocExplorer = ref;
        };
        _this.handleSearch = function (value) {
            _this.setState({ searchValue: value });
        };
        _this.handleToggleDocs = function () {
            if (!_this.props.docs.docsOpen && _this.refDocExplorer) {
                _this.refDocExplorer.focus();
            }
            _this.props.toggleDocs(_this.props.sessionId);
            _this.setWidth();
        };
        _this.handleKeyDown = function (e) {
            // we don't want to interfere with inputs
            if (e.target instanceof HTMLInputElement ||
                e.metaKey ||
                e.shiftKey ||
                e.altKey ||
                e.ctrlKey) {
                return;
            }
            e.preventDefault();
            _this.props.changeKeyMove(_this.props.sessionId, true);
            var lastNavStack = _this.props.docs.navStack.length > 0 &&
                _this.props.docs.navStack[_this.props.docs.navStack.length - 1];
            var beforeLastNavStack = _this.props.docs.navStack.length > 0 &&
                _this.props.docs.navStack[_this.props.docs.navStack.length - 2];
            var keyPressed = keycode(e);
            switch (keyPressed) {
                case 'esc':
                    _this.props.setDocsVisible(_this.props.sessionId, false);
                    break;
                case 'left':
                    if (beforeLastNavStack) {
                        _this.props.addStack(_this.props.sessionId, beforeLastNavStack.field, beforeLastNavStack.x, beforeLastNavStack.y);
                    }
                    break;
                case 'right':
                    if (lastNavStack) {
                        var obj = stack_1.serialize(_this.props.schema, lastNavStack.field);
                        var firstElement = stack_1.getElement(obj, 0);
                        if (firstElement) {
                            _this.props.addStack(_this.props.sessionId, firstElement, lastNavStack.x + 1, 0);
                        }
                    }
                    else {
                        var obj = stack_1.serializeRoot(_this.props.schema);
                        var element = stack_1.getElementRoot(obj, 0);
                        if (element) {
                            _this.props.addStack(_this.props.sessionId, element, 0, 0);
                        }
                    }
                    break;
                case 'up':
                case 'down':
                    if (beforeLastNavStack) {
                        var obj = stack_1.serialize(_this.props.schema, beforeLastNavStack.field);
                        var element = stack_1.getElement(obj, keyPressed === 'up' ? lastNavStack.y - 1 : lastNavStack.y + 1);
                        if (element) {
                            _this.props.addStack(_this.props.sessionId, element, lastNavStack.x, keyPressed === 'up' ? lastNavStack.y - 1 : lastNavStack.y + 1);
                        }
                    }
                    else {
                        var obj = stack_1.serializeRoot(_this.props.schema);
                        var y = lastNavStack ? lastNavStack.y : 0;
                        var element = stack_1.getElementRoot(obj, keyPressed === 'up' ? y - 1 : y + 1);
                        if (element) {
                            _this.props.addStack(_this.props.sessionId, element, 0, keyPressed === 'up' ? y - 1 : y + 1);
                        }
                    }
                    break;
            }
        };
        _this.handleDocsResizeStart = function (downEvent) {
            downEvent.preventDefault();
            var hadWidth = _this.props.docs.docsWidth;
            var offset = downEvent.clientX - elementPosition_1.getLeft(downEvent.target);
            var onMouseMove = function (moveEvent) {
                if (moveEvent.buttons === 0) {
                    return onMouseUp();
                }
                var app = _this.ref;
                var cursorPos = moveEvent.clientX - elementPosition_1.getLeft(app) - offset;
                var newSize = app.clientWidth - cursorPos;
                var maxSize = window.innerWidth - 50;
                var docsSize = maxSize < newSize ? maxSize : newSize;
                if (docsSize < 100) {
                    _this.props.setDocsVisible(_this.props.sessionId, false);
                }
                else {
                    _this.props.setDocsVisible(_this.props.sessionId, true);
                    _this.props.changeWidthDocs(_this.props.sessionId, docsSize);
                }
            };
            var onMouseUp = function () {
                if (!_this.props.docs.docsOpen) {
                    _this.props.changeWidthDocs(_this.props.sessionId, hadWidth);
                }
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                onMouseMove = null;
                onMouseUp = null;
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
        _this.handleMouseMove = function (e) {
            _this.clientX = e.clientX;
            _this.clientY = e.clientY;
            if (_this.props.docs.keyMove &&
                _this.clientX !== e.clientX &&
                _this.clientY !== e.clientY) {
                _this.props.changeKeyMove(_this.props.sessionId, false);
            }
        };
        _this.state = {
            searchValue: '',
            widthMap: {},
        };
        window.d = _this;
        return _this;
    }
    GraphDocs.prototype.componentWillReceiveProps = function (nextProps) {
        // If user use default column size % columnWidth
        // Make the column follow the clicks
        if (this.props.docs.navStack.length !== nextProps.docs.navStack.length ||
            this.props.docs.navStack.slice(-1)[0] !==
                nextProps.docs.navStack.slice(-1)[0] ||
            (!this.props.schema && nextProps.schema)) {
            this.setWidth(nextProps);
        }
    };
    GraphDocs.prototype.setWidth = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        requestAnimationFrame(function () {
            var width = _this.getWidth(props);
            _this.props.changeWidthDocs(props.sessionId, Math.min(width, window.innerWidth - 86));
        });
    };
    GraphDocs.prototype.getWidth = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        var rootWidth = this.state.widthMap.root || constants_1.columnWidth;
        var stackWidths = props.docs.navStack.map(function (stack) { return _this.state.widthMap[stack.field.path] || constants_1.columnWidth; });
        return [rootWidth].concat(stackWidths).reduce(function (acc, curr) { return acc + curr; }, 0);
    };
    GraphDocs.prototype.componentDidMount = function () {
        this.setWidth();
    };
    GraphDocs.prototype.render = function () {
        var _this = this;
        var _a = this.props.docs, docsOpen = _a.docsOpen, docsWidth = _a.docsWidth, navStack = _a.navStack;
        var schema = this.props.schema;
        var docsStyle = { width: docsOpen ? docsWidth : 0 };
        var emptySchema;
        if (schema === undefined) {
            // Schema is undefined when it is being loaded via introspection.
            emptySchema = <Spinner_1.default />;
        }
        else if (schema === null) {
            // Schema is null when it explicitly does not exist, typically due to
            // an error during introspection.
            emptySchema = <ErrorContainer>{'No Schema Available'}</ErrorContainer>;
        }
        return (<Docs open={docsOpen} style={docsStyle} ref={this.setRef}>
        <DocsButton onClick={this.handleToggleDocs}>Schema</DocsButton>
        <DocsResizer onMouseDown={this.handleDocsResizeStart}/>
        <DocsGradient />
        <DocsExplorer onKeyDown={this.handleKeyDown} onMouseMove={this.handleMouseMove} tabIndex={0} ref={this.setDocExplorerRef}>
          <DocsExplorerContainer>
            {emptySchema && <ColumnDoc_1.default>{emptySchema}</ColumnDoc_1.default>}
            {!emptySchema &&
            schema && (<RootColumn_1.default schema={schema} width={this.state.widthMap.root || constants_1.columnWidth - 1} searchValue={this.state.searchValue} handleSearch={this.handleSearch} sessionId={this.props.sessionId}/>)}
            {navStack.map(function (stack, index) { return (<ColumnDoc_1.default key={index} width={_this.state.widthMap[stack.field.path] || constants_1.columnWidth}>
                <FieldDoc_1.default schema={schema} field={stack.field} level={index + 1} sessionId={_this.props.sessionId}/>
              </ColumnDoc_1.default>); })}
          </DocsExplorerContainer>
        </DocsExplorer>
      </Docs>);
    };
    return GraphDocs;
}(React.Component));
var mapDispatchToProps = function (dispatch) {
    return redux_1.bindActionCreators({
        addStack: actions_1.addStack,
        toggleDocs: actions_1.toggleDocs,
        changeWidthDocs: actions_1.changeWidthDocs,
        changeKeyMove: actions_1.changeKeyMove,
        setDocsVisible: actions_1.setDocsVisible,
    }, dispatch);
};
var mapStateToProps = reselect_1.createStructuredSelector({
    docs: selectors_1.getSessionDocs,
    sessionId: selectors_2.getSelectedSessionIdFromRoot,
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(GraphDocs);
var Docs = styled_1.styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: white;\n  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);\n  position: absolute;\n  right: -2px;\n  z-index: ", ";\n  height: 100%;\n  font-family: 'Open Sans', sans-serif;\n  -webkit-font-smoothing: antialiased;\n\n  .doc-type-description p {\n    padding: 16px;\n    font-size: 14px;\n  }\n\n  .field-name {\n    color: #1f61a0;\n  }\n  .type-name {\n    color: rgb(245, 160, 0);\n  }\n  .arg-name {\n    color: #1f61a9;\n  }\n\n  code {\n    font-family: 'Source Code Pro', monospace;\n    border-radius: 2px;\n    padding: 1px 2px;\n    background: rgba(0, 0, 0, 0.06);\n  }\n"], ["\n  background: white;\n  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);\n  position: absolute;\n  right: -2px;\n  z-index: ", ";\n  height: 100%;\n  font-family: 'Open Sans', sans-serif;\n  -webkit-font-smoothing: antialiased;\n\n  .doc-type-description p {\n    padding: 16px;\n    font-size: 14px;\n  }\n\n  .field-name {\n    color: #1f61a0;\n  }\n  .type-name {\n    color: rgb(245, 160, 0);\n  }\n  .arg-name {\n    color: #1f61a9;\n  }\n\n  code {\n    font-family: 'Source Code Pro', monospace;\n    border-radius: 2px;\n    padding: 1px 2px;\n    background: rgba(0, 0, 0, 0.06);\n  }\n"])), function (p) { return (p.open ? 2000 : 3); });
var DocsExplorer = styled_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background: white;\n  display: flex;\n  position: relative;\n  height: 100%;\n  letter-spacing: 0.3px;\n  outline: none;\n  box-shadow: -1px 1px 6px 0 rgba(0, 0, 0, 0.3);\n\n  &::before {\n    top: 0;\n    bottom: 0;\n    background: ", ";\n    position: absolute;\n    z-index: 3;\n    left: 0px;\n    content: '';\n    width: 6px;\n  }\n"], ["\n  background: white;\n  display: flex;\n  position: relative;\n  height: 100%;\n  letter-spacing: 0.3px;\n  outline: none;\n  box-shadow: -1px 1px 6px 0 rgba(0, 0, 0, 0.3);\n\n  &::before {\n    top: 0;\n    bottom: 0;\n    background: ", ";\n    position: absolute;\n    z-index: 3;\n    left: 0px;\n    content: '';\n    width: 6px;\n  }\n"])), function (props) { return props.theme.colours.green; });
var DocsExplorerContainer = styled_1.styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  position: relative;\n  height: 100%;\n  width: 100%;\n  overflow-x: auto;\n  overflow-y: hidden;\n"], ["\n  display: flex;\n  position: relative;\n  height: 100%;\n  width: 100%;\n  overflow-x: auto;\n  overflow-y: hidden;\n"])));
var DocsResizer = styled_1.styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  cursor: col-resize;\n  height: 100%;\n  left: -5px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 10px;\n  z-index: 10;\n"], ["\n  cursor: col-resize;\n  height: 100%;\n  left: -5px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 10px;\n  z-index: 10;\n"])));
var ErrorContainer = styled_1.styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-weight: bold;\n  left: 0;\n  letter-spacing: 1px;\n  opacity: 0.5;\n  position: absolute;\n  right: 0;\n  text-align: center;\n  text-transform: uppercase;\n  top: 50%;\n  transform: translate(0, -50%);\n"], ["\n  font-weight: bold;\n  left: 0;\n  letter-spacing: 1px;\n  opacity: 0.5;\n  position: absolute;\n  right: 0;\n  text-align: center;\n  text-transform: uppercase;\n  top: 50%;\n  transform: translate(0, -50%);\n"])));
var DocsButton = styled_1.styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 2;\n  left: -50px;\n  top: 129px;\n  padding: 6px 10px;\n  transform: rotate(-90deg);\n  border-top-left-radius: 2px;\n  border-top-right-radius: 2px;\n  color: ", ";\n  background: ", ";\n  box-shadow: -1px 1px 6px 0 rgba(0, 0, 0, 0.3);\n  text-transform: uppercase;\n  font-weight: 600;\n  font-size: 12px;\n  line-height: 17px;\n  letter-spacing: 0.45px;\n  cursor: pointer;\n"], ["\n  position: absolute;\n  z-index: 2;\n  left: -50px;\n  top: 129px;\n  padding: 6px 10px;\n  transform: rotate(-90deg);\n  border-top-left-radius: 2px;\n  border-top-right-radius: 2px;\n  color: ", ";\n  background: ", ";\n  box-shadow: -1px 1px 6px 0 rgba(0, 0, 0, 0.3);\n  text-transform: uppercase;\n  font-weight: 600;\n  font-size: 12px;\n  line-height: 17px;\n  letter-spacing: 0.45px;\n  cursor: pointer;\n"])), function (p) { return p.theme.colours.white; }, function (p) { return p.theme.colours.green; });
var DocsGradient = styled_1.styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 20px;\n  z-index: 1;\n  pointer-events: none;\n  content: '';\n  background: transparent;\n"], ["\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 20px;\n  z-index: 1;\n  pointer-events: none;\n  content: '';\n  background: transparent;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=GraphDocs.jsx.map