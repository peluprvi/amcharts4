/**
 * FlowDiagramLink module
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
import { Sprite } from "../../core/Sprite";
import { Container } from "../../core/Container";
import { LinearGradient } from "../../core/rendering/fills/LinearGradient";
import { registry } from "../../core/Registry";
import { Bullet } from "../elements/Bullet";
import { Color } from "../../core/utils/Color";
import { ListTemplate, ListDisposer } from "../../core/utils/List";
import { Polyline } from "../../core/elements/Polyline";
import { Line } from "../../core/elements/Line";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import * as $iter from "../../core/utils/Iterator";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This class creates a link (waved color-filled line) between two nodes in a
 * Flow Diagram.
 *
 * @see {@link IFlowDiagramLinkEvents} for a list of available events
 * @see {@link IFlowDiagramLinkAdapters} for a list of available Adapters
 * @important
 */
var FlowDiagramLink = /** @class */ (function (_super) {
    __extends(FlowDiagramLink, _super);
    /**
     * Constructor
     */
    function FlowDiagramLink() {
        var _this = _super.call(this) || this;
        /**
         * A gradiend instance that is used to provided colored gradient fills for
         * the Flow link.
         *
         * @type {LinearGradient}
         */
        _this.gradient = new LinearGradient();
        _this.className = "FlowDiagramLink";
        var interfaceColors = new InterfaceColorSet();
        _this.maskBullets = false;
        _this.colorMode = "fromNode";
        _this.layout = "none";
        _this.isMeasured = false;
        _this.startAngle = 0;
        _this.endAngle = 0;
        _this.strokeOpacity = 0;
        // this is very important, otherwise the container will be shifted
        _this.verticalCenter = "none";
        _this.horizontalCenter = "none";
        _this.tooltipText = "{fromName}→{toName}:{value.value}";
        _this.tooltipLocation = 0.5;
        _this.link = _this.createChild(Sprite);
        _this.link.shouldClone = false;
        _this.link.element = _this.paper.add("path");
        _this.fillOpacity = 0.2;
        _this.fill = interfaceColors.getFor("alternativeBackground");
        _this.bulletsContainer = _this.createChild(Container);
        _this.bulletsContainer.shouldClone = false;
        _this.bulletsContainer.layout = "none";
        _this.bulletsMask = _this.createChild(Sprite);
        _this.bulletsMask.shouldClone = false;
        _this.bulletsMask.element = _this.paper.add("path");
        _this.applyTheme();
        return _this;
    }
    /**
     * Positions bullets
     * @ignore
     */
    FlowDiagramLink.prototype.positionBullets = function () {
        var _this = this;
        $iter.each(this.bullets.iterator(), function (bullet) {
            bullet.parent = _this.bulletsContainer;
            _this.positionBullet(bullet);
        });
    };
    /**
     * Positions bullets at relative bullet.locationX position on the link.
     * @ignore
     */
    FlowDiagramLink.prototype.positionBullet = function (bullet) {
        var location = bullet.locationX;
        if (!$type.isNumber(location)) {
            location = bullet.locationY;
        }
        if (!$type.isNumber(location)) {
            location = 0.5;
        }
        var point = this.middleLine.positionToPoint(location);
        bullet.moveTo(point);
        var rotationField = bullet.propertyFields.rotation;
        var angle;
        if (bullet.dataItem) {
            var dataContext = bullet.dataItem.dataContext;
            angle = dataContext[rotationField];
        }
        if (!$type.isNumber(angle)) {
            angle = point.angle;
        }
        bullet.rotation = angle;
    };
    Object.defineProperty(FlowDiagramLink.prototype, "startAngle", {
        /**
         * @return {number} Start angle
         */
        get: function () {
            return this.getPropertyValue("startAngle");
        },
        /**
         * [startAngle description]
         *
         * @todo Description
         * @param {number}  value  Start angle
         */
        set: function (value) {
            this.setPropertyValue("startAngle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlowDiagramLink.prototype, "endAngle", {
        /**
         * @return {number} End angle
         */
        get: function () {
            return this.getPropertyValue("endAngle");
        },
        /**
         * [endAngle description]
         *
         * @todo Description
         * @param {number}  value  End angle
         */
        set: function (value) {
            this.setPropertyValue("endAngle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlowDiagramLink.prototype, "colorMode", {
        /**
         * @type {"solid" | "gradient"} Fill mode
         */
        get: function () {
            return this.getPropertyValue("colorMode");
        },
        /**
         * Should link be filled with a solid color, color of from node, color of toNode or gradient between node colors.
         * Some of the links, like ChordLink does not support gradiens well.
         *
         * @param {"solid" | "gradient" | "fromNode" | "toNode"}  value  Fill mode
         */
        set: function (value) {
            if (value == "gradient") {
                this.fill = this.gradient;
                this.stroke = this.gradient;
            }
            this.setPropertyValue("colorMode", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlowDiagramLink.prototype, "maskBullets", {
        /**
         * @return {boolean} mask bullets value
         */
        get: function () {
            return this.getPropertyValue("maskBullets");
        },
        /**
         * Should link bullets be masked or not
         *
         * @param {boolean}  value
         * @default false;
         */
        set: function (value) {
            this.setPropertyValue("maskBullets", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlowDiagramLink.prototype, "tooltipLocation", {
        /**
         * @type {number} tooltip location value
         */
        get: function () {
            return this.getPropertyValue("tooltipLocation");
        },
        /**
         * Relative location of a tooltip.
         * @default 0.5
         *
         * @param {number} value
         */
        set: function (value) {
            this.setPropertyValue("tooltipLocation", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds color steps in the link gradient.
     *
     * @param {Color | Pattern | LinearGradient | RadialGradient}  value  Fill option
     */
    FlowDiagramLink.prototype.setFill = function (value) {
        _super.prototype.setFill.call(this, value);
        if (value instanceof Color) {
            this.gradient.stops.clear();
            this.gradient.addColor(value);
            this.gradient.addColor(value);
        }
    };
    /**
     * Updates bounding box based on element dimension settings.
     *
     * @ignore Exclude from docs
     */
    FlowDiagramLink.prototype.measureElement = function () {
    };
    Object.defineProperty(FlowDiagramLink.prototype, "bullets", {
        /**
         * List of bullets
         *
         * @return {ListTemplate<Bullet>} [description]
         */
        get: function () {
            var _this = this;
            if (!this._bullets) {
                this._bullets = new ListTemplate(new Bullet());
                this._disposers.push(new ListDisposer(this._bullets));
                this._disposers.push(this._bullets.template);
                this._bullets.events.on("inserted", function (event) {
                    event.newValue.events.on("propertychanged", function (event) {
                        if (event.property == "locationX" || event.property == "locationY") {
                            _this.positionBullet(event.target);
                        }
                    });
                });
            }
            return this._bullets;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies properties from another [[FlowDiagramLink]].
     *
     * @param {FlowDiagramLink}  source  Source link
     */
    FlowDiagramLink.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.bullets.copyFrom(source.bullets);
        var middleLine = this.middleLine;
        if (middleLine) {
            if (middleLine instanceof Line && source.middleLine instanceof Line) {
                middleLine.copyFrom(source.middleLine);
            }
            if (middleLine instanceof Polyline && source.middleLine instanceof Polyline) {
                middleLine.copyFrom(source.middleLine);
            }
        }
        this.link.copyFrom(source.link);
    };
    /**
     * @ignore Exclude from docs
     * @return {number} Tooltip X (px)
     */
    FlowDiagramLink.prototype.getTooltipX = function () {
        if (this.middleLine) {
            return this.middleLine.positionToPoint(this.tooltipLocation).x;
        }
    };
    /**
     * @ignore Exclude from docs
     * @return {number} Tooltip Y (px)
     */
    FlowDiagramLink.prototype.getTooltipY = function () {
        if (this.middleLine) {
            return this.middleLine.positionToPoint(this.tooltipLocation).y;
        }
    };
    return FlowDiagramLink;
}(Container));
export { FlowDiagramLink };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["FlowDiagramLink"] = FlowDiagramLink;
//# sourceMappingURL=FlowDiagramLink.js.map