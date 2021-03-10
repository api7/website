"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var i18n_1 = require("../../i18n");
var style_1 = require("./style");
var NavComponent = function (_a) {
    var t = _a.t;
    var _b = react_1.useState("/zh"), zhLang = _b[0], setZhLang = _b[1];
    var _c = react_1.useState("/en"), enLang = _c[0], setEnLang = _c[1];
    react_1.useEffect(function () {
        setEnLang(location.pathname.replace("/zh", "/en"));
        setZhLang(location.pathname.replace("/en", "/zh"));
    }, []);
    return (react_1["default"].createElement(react_bootstrap_1.Navbar, { bg: "light", expand: "lg", sticky: "top" },
        react_1["default"].createElement(react_bootstrap_1.Navbar.Brand, { href: "/" },
            react_1["default"].createElement("img", { src: "https://static.apiseven.com/2020/05/Jietu20200312-103300-removebg-preview.png", style: { height: 50 }, alt: "" })),
        react_1["default"].createElement(react_bootstrap_1.Navbar.Toggle, { "aria-controls": "basic-navbar-nav" }),
        react_1["default"].createElement(react_bootstrap_1.Navbar.Collapse, { id: "basic-navbar-nav" },
            react_1["default"].createElement(style_1.SHover, null,
                react_1["default"].createElement(react_bootstrap_1.Nav, { className: "mr-auto" },
                    react_1["default"].createElement(react_bootstrap_1.Nav.Link, { href: "/" }, t("homepage")),
                    react_1["default"].createElement(react_bootstrap_1.Nav.Link, { href: "/news" }, t("common:news")),
                    react_1["default"].createElement(react_bootstrap_1.NavDropdown, { title: t("open-source"), id: "basic-nav-dropdown", renderMenuOnMount: true },
                        react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { href: "https://github.com/apache/apisix" }, "Apache APISIX"),
                        react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { href: "https://github.com/apache/apisix-ingress-controller" }, "k8s ingress controller"),
                        react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { href: "/apisix-vs-api7" }, "Apache APISIX vs API7")),
                    react_1["default"].createElement(react_bootstrap_1.Nav.Link, { href: "/usercases" }, t("showcases")),
                    react_1["default"].createElement(react_bootstrap_1.NavDropdown, { title: t("commercial-products-and-support"), id: "basic-nav-dropdown", renderMenuOnMount: true },
                        react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { href: "/business-support/" }, t("business-support")),
                        react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { href: "/form-api7-trial" }, t("trial"))),
                    react_1["default"].createElement(react_bootstrap_1.Nav.Link, { href: "/careers" }, t("job")),
                    react_1["default"].createElement(react_bootstrap_1.NavDropdown, { title: t("text3"), id: "basic-nav-dropdown", renderMenuOnMount: true },
                        react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { href: zhLang }, t("text1")),
                        react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { href: enLang }, t("text2"))))))));
};
NavComponent.getInitialProps = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ({
                namespacesRequired: ["common"]
            })];
    });
}); };
exports["default"] = i18n_1.withTranslation("common")(NavComponent);
