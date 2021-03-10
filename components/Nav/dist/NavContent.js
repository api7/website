"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.NavContent = void 0;
var react_1 = require("@chakra-ui/react");
var React = require("react");
var Logo_1 = require("./Logo");
var NavLink_1 = require("./NavLink");
var NavMenu_1 = require("./NavMenu");
var Submenu_1 = require("./Submenu");
var ToggleButton_1 = require("./ToggleButton");
var _data_1 = require("./_data");
var MobileNavContext = function (props) {
    var _a = react_1.useDisclosure(), isOpen = _a.isOpen, onToggle = _a.onToggle;
    return (React.createElement(React.Fragment, null,
        React.createElement(react_1.Flex, __assign({ align: "center", justify: "space-between", className: "nav-content__mobile" }, props),
            React.createElement(react_1.Box, { flexBasis: "6rem" },
                React.createElement(ToggleButton_1.ToggleButton, { isOpen: isOpen, onClick: onToggle })),
            React.createElement(react_1.Box, { as: "a", rel: "home", mx: "auto" },
                React.createElement(Logo_1.Logo, { h: "24px", iconColor: "blue.400" })),
            React.createElement(react_1.Box, { visibility: { base: 'hidden', sm: 'visible' } },
                React.createElement(react_1.Button, { as: "a", colorScheme: "blue" }, "Get Started"))),
        React.createElement(NavMenu_1.NavMenu, { animate: isOpen ? 'open' : 'closed' },
            _data_1.links.map(function (link, idx) {
                return link.children ? (React.createElement(Submenu_1.Submenu.Mobile, { key: idx, link: link })) : (React.createElement(NavLink_1.NavLink.Mobile, { key: idx, href: link.href }, link.label));
            }),
            React.createElement(react_1.Button, { colorScheme: "blue", w: "full", size: "lg", mt: "5" }, "Try for free"))));
};
var DesktopNavContent = function (props) {
    return (React.createElement(react_1.Flex, __assign({ className: "nav-content__desktop", align: "center", justify: "space-between" }, props),
        React.createElement(react_1.Box, { as: "a", href: "#", rel: "home" },
            React.createElement(react_1.VisuallyHidden, null, "Envelope"),
            React.createElement(Logo_1.Logo, { h: "6", iconColor: "blue.500" })),
        React.createElement(react_1.HStack, { as: "ul", id: "nav__primary-menu", "aria-label": "Main Menu", listStyleType: "none" }, _data_1.links.map(function (link, idx) { return (React.createElement(react_1.Box, { as: "li", key: idx, id: "nav__menuitem-" + idx }, link.children ? (React.createElement(Submenu_1.Submenu.Desktop, { link: link })) : (React.createElement(NavLink_1.NavLink.Desktop, { href: link.href }, link.label)))); })),
        React.createElement(react_1.HStack, { spacing: "8", minW: "240px", justify: "space-between" },
            React.createElement(react_1.Box, { as: "a", href: "#", color: react_1.useColorModeValue('blue.600', 'blue.300'), fontWeight: "bold" }, "Sign In"),
            React.createElement(react_1.Button, { as: "a", href: "#", colorScheme: "blue", fontWeight: "bold" }, "Sign up for free"))));
};
exports.NavContent = {
    Mobile: MobileNavContext,
    Desktop: DesktopNavContent
};
