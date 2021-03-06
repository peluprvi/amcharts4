/**
 * Ellipse module.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Circle } from "./Circle";
import { registry } from "../Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws an ellipse
 * @see {@link IEllipseEvents} for a list of available events
 * @see {@link IEllipseAdapters} for a list of available Adapters
 */
var Ellipse = /** @class */ (function (_super) {
    __extends(Ellipse, _super);
    /**
     * Constructor
     */
    function Ellipse() {
        var _this = _super.call(this) || this;
        _this.className = "Ellipse";
        _this.element = _this.paper.add("ellipse");
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the ellipsis.
     */
    Ellipse.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.element.attr({ "rx": this.radius });
        this.element.attr({ "ry": this.radiusY });
    };
    Object.defineProperty(Ellipse.prototype, "radiusY", {
        /**
         * @return {number} Vertical radius
         */
        get: function () {
            return this.innerHeight / 2;
        },
        /**
         * Vertical radius.
         *
         * It's a relative size to the `radius`.
         *
         * E.g. 0.8 will mean the height of the ellipsis will be 80% of it's
         * horizontal radius.
         *
         * @param {number}  value  Vertical radius
         */
        set: function (value) {
            this.height = value * 2;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ellipse.prototype, "radius", {
        /**
         * @return {number} Horizontal radius
         */
        get: function () {
            return this.innerWidth / 2;
        },
        /**
         * Horizontal radius.
         *
         * @param {number}  value  Horizontal radius
         */
        set: function (value) {
            this.width = value * 2;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    return Ellipse;
}(Circle));
export { Ellipse };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Ellipse"] = Ellipse;
//# sourceMappingURL=Ellipse.js.map