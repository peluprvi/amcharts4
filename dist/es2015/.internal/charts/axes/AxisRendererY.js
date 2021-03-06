/**
 * Module, defining Axis Renderer for vertical axes.
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
import { AxisRenderer } from "./AxisRenderer";
import { WavedLine } from "../../core/elements/WavedLine";
import { WavedRectangle } from "../../core/elements/WavedRectangle";
import { registry } from "../../core/Registry";
import { percent } from "../../core/utils/Percent";
import * as $math from "../../core/utils/Math";
import * as $path from "../../core/rendering/Path";
import * as $utils from "../../core/utils/Utils";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A renderer for vertical axis.
 *
 * @see {@link IAxisRendererYEvents} for a list of available events
 * @see {@link IAxisRendererYAdapters} for a list of available Adapters
 */
var AxisRendererY = /** @class */ (function (_super) {
    __extends(AxisRendererY, _super);
    /**
     * Constructor.
     *
     * @param {Axis} axis Related axis
     */
    function AxisRendererY() {
        var _this = _super.call(this) || this;
        _this.className = "AxisRendererY";
        _this.minGridDistance = 40;
        _this.opposite = false;
        _this.height = percent(100);
        _this.labels.template.verticalCenter = "middle";
        _this.applyTheme();
        return _this;
    }
    /**
    * @ignore
    */
    AxisRendererY.prototype.setAxis = function (axis) {
        _super.prototype.setAxis.call(this, axis);
        axis.layout = "horizontal";
    };
    /**
     * Called when rendered is attached to an Axis, as well as a property of
     * Axis that might affect the appearance is updated.
     *
     * E.g. `axis.opposite`, `axis.inside`, etc.
     *
     * This method is called **before** draw, so that any related setting
     * changed in this method can be changed.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    AxisRendererY.prototype.processRenderer = function () {
        _super.prototype.processRenderer.call(this);
        var axis = this.axis;
        if (axis) {
            var title = axis.title;
            title.valign = "middle";
            axis.height = percent(100);
            if (this.opposite) {
                title.rotation = 90;
                this.line.toBack();
                title.toFront();
            }
            else {
                title.rotation = -90;
                title.toBack();
                this.line.toFront();
            }
        }
    };
    /**
     * Updates some of the Axis tooltip's visual properties, related to
     * rendering of the Axis.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    AxisRendererY.prototype.updateTooltip = function () {
        var axis = this.axis;
        if (axis) {
            var bigNum = 2000;
            var bbx = 0;
            var bby = 0;
            var bbw = bigNum;
            var bbh = this.pixelHeight;
            // right
            if (this.opposite) {
                if (this.inside) {
                    bbx = -bigNum;
                    bbw = bigNum;
                }
            }
            // left
            else {
                if (!this.inside) {
                    bbx = -bigNum;
                    bbw = bigNum;
                }
            }
            this.axis.updateTooltip("horizontal", { x: bbx, y: bby, width: bbw, height: bbh });
        }
    };
    Object.defineProperty(AxisRendererY.prototype, "axisLength", {
        /**
         * Returns actual length of the Axis, in pixels.
         *
         * @return {number} Length (px)
         */
        get: function () {
            var axis = this.axis;
            return axis.pixelHeight - axis.pixelPaddingTop - axis.pixelPaddingBottom;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts relative position on axis to point coordinates.
     *
     * @param  {number}  position  Position (0-1)
     * @return {IPoint}            Point
     */
    AxisRendererY.prototype.positionToPoint = function (position) {
        return { x: 0, y: this.positionToCoordinate(position) };
    };
    /**
     * Converts a point at specific coordinates to a relative position (0-1)
     * on the axis.
     *
     * @param  {IPoint}  point  Point
     * @return {number}         Position (0-1)
     */
    AxisRendererY.prototype.pointToPosition = function (point) {
        return this.coordinateToPosition(point.y);
    };
    /**
     * [getPositionRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param  {number}  startPosition  Starting position
     * @param  {number}  endPosition    End position
     * @return {string}                 SVG path
     */
    AxisRendererY.prototype.getPositionRangePath = function (startPosition, endPosition) {
        var y1 = $math.fitToRange(this.positionToCoordinate(startPosition), 0, this.axisLength);
        var y2 = $math.fitToRange(this.positionToCoordinate(endPosition), 0, this.axisLength);
        var h = Math.abs(y2 - y1);
        var w = this.getWidth();
        var y = Math.min(y1, y2);
        var x = 0;
        return $path.rectToPath({
            x: x,
            y: y,
            width: w,
            height: h
        }, true);
    };
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param {Grid}    grid         Grid element
     * @param {number}  position     Starting position
     * @param {number}  endPosition  End position
     */
    AxisRendererY.prototype.updateGridElement = function (grid, position, endPosition) {
        var point = this.positionToPoint(position);
        if (grid.element) {
            grid.element.attr({ "d": $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: this.getWidth(), y: 0 }) });
        }
        this.positionItem(grid, point);
        this.toggleVisibility(grid, position, 0, 1);
    };
    /**
     * Updates and positions a tick element.
     *
     * @ignore Exclude from docs
     * @param {AxisTick}  tick         Tick element
     * @param {number}    position     Starting position
     * @param {number}    endPosition  End position
     */
    AxisRendererY.prototype.updateTickElement = function (tick, position, endPosition) {
        var point = this.positionToPoint(position);
        var tickLength = tick.length;
        if (!this.opposite) {
            point.x = this.pixelWidth;
            tickLength *= (tick.inside ? 1 : -1);
        }
        else {
            tickLength *= (tick.inside ? -1 : 1);
        }
        tick.element.attr({ "d": $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: tickLength, y: 0 }) });
        this.positionItem(tick, point);
        this.toggleVisibility(tick, position, 0, 1);
    };
    /**
     * Updates and positions the axis line element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererY.prototype.updateAxisLine = function () {
        var element = this.line.element;
        if (element) {
            element.attr({ "d": $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: 0, y: this.axisLength }) });
        }
    };
    /**
     * Updates and positions the base grid element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererY.prototype.updateBaseGridElement = function () {
        _super.prototype.updateBaseGridElement.call(this);
        var axis = this.axis;
        var w = this.getWidth();
        var h = this.getHeight();
        var y = axis.basePoint.y;
        var baseGrid = this.baseGrid;
        if (y < 0 || y > h) {
            baseGrid.hide(0);
        }
        else {
            var x = $utils.spritePointToSprite({ x: 0, y: 0 }, this.gridContainer, baseGrid.parent).x;
            baseGrid.element.attr({ "d": $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: w, y: 0 }) });
            baseGrid.moveTo({ x: x, y: y });
            baseGrid.show(0);
        }
    };
    /**
     * Updates and positions a label element.
     *
     * @ignore Exclude from docs
     * @param {AxisLabel}  label        Label element
     * @param {number}     position     Starting position
     * @param {number}     endPosition  Ending position
     */
    AxisRendererY.prototype.updateLabelElement = function (label, position, endPosition) {
        position = position + (endPosition - position) * label.location;
        label.isMeasured = !label.inside;
        var point = this.positionToPoint(position);
        var horizontalCenter;
        var deltaX = 0;
        if (this.opposite) {
            if (label.inside) {
                horizontalCenter = "right";
            }
            else {
                horizontalCenter = "left";
            }
            if (label.inside) {
                if (label.align == "left") {
                    deltaX = -this.maxWidth + this.measuredWidth;
                    horizontalCenter = "left";
                }
            }
            point.x = 0 + deltaX;
        }
        else {
            if (label.inside) {
                horizontalCenter = "left";
            }
            else {
                horizontalCenter = "right";
            }
            if (label.inside) {
                if (label.align == "right") {
                    deltaX = this.maxWidth - this.measuredWidth;
                    horizontalCenter = "right";
                }
            }
            point.x = this.measuredWidth + deltaX;
        }
        label.horizontalCenter = horizontalCenter;
        this.positionItem(label, point);
        this.toggleVisibility(label, position, this.minLabelPosition, this.maxLabelPosition);
    };
    /**
     * Updates and positions an axis break element.
     *
     * @ignore Exclude from docs
     * @param {AxisBreak} axisBreak Break element
     */
    AxisRendererY.prototype.updateBreakElement = function (axisBreak) {
        _super.prototype.updateBreakElement.call(this, axisBreak);
        var startLine = axisBreak.startLine;
        var endLine = axisBreak.endLine;
        var fillShape = axisBreak.fillShape;
        var startPoint = axisBreak.startPoint;
        var endPoint = axisBreak.endPoint;
        var x1 = axisBreak.pixelMarginLeft;
        var x2 = this.getWidth() - axisBreak.pixelMarginLeft - axisBreak.pixelMarginRight;
        startPoint.y = $math.fitToRange(startPoint.y, -1, this.pixelHeight + 1);
        endPoint.y = $math.fitToRange(endPoint.y, -1, this.pixelHeight + 1);
        if (startPoint.y == endPoint.y && (startPoint.y < 0 || startPoint.y > this.pixelHeight)) {
            axisBreak.fillShape.__disabled = true;
        }
        else {
            axisBreak.fillShape.__disabled = false;
        }
        var w = Math.abs(x2 - x1);
        startLine.x = x1;
        startLine.height = 0;
        startLine.width = w;
        endLine.x = x1;
        endLine.height = 0;
        endLine.width = w;
        fillShape.width = w;
        fillShape.height = Math.abs(endPoint.y - startPoint.y);
        fillShape.x = x1;
        fillShape.y = endPoint.y;
    };
    /**
     * Creates visual elements for and axis break.
     *
     * @ignore Exclude from docs
     * @param {AxisBreak} axisBreak Axis break
     */
    AxisRendererY.prototype.createBreakSprites = function (axisBreak) {
        axisBreak.startLine = new WavedLine();
        axisBreak.endLine = new WavedLine();
        var wavedRectangle = new WavedRectangle();
        wavedRectangle.setWavedSides(true, false, true, false);
        axisBreak.fillShape = wavedRectangle;
    };
    /**
     * Converts a position on the axis to a coordinate in pixels.
     *
     * @ignore Exclude from docs
     * @param  {number}  position  Position (0-1)
     * @return {number}            Coordinate (px)
     */
    AxisRendererY.prototype.positionToCoordinate = function (position) {
        var coordinate;
        var axis = this.axis;
        var axisFullLength = axis.axisFullLength;
        if (!axis.renderer.inversed) {
            coordinate = (axis.end - position) * axisFullLength;
        }
        else {
            coordinate = (position - axis.start) * axisFullLength;
        }
        return $math.round(coordinate, 1);
    };
    return AxisRendererY;
}(AxisRenderer));
export { AxisRendererY };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisRendererY"] = AxisRendererY;
//# sourceMappingURL=AxisRendererY.js.map