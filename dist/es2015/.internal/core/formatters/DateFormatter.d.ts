/**
 * Handles date and time formatting
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../Sprite";
import { Language, ILocaleProperties } from "../utils/Language";
import { BaseObject } from "../Base";
import * as $type from "../utils/Type";
/**
 * Interface describing parsed date format definition.
 */
export interface DateFormatInfo {
    "template": string;
    "parts": any[];
}
/**
 * Month names.
 *
 * @type {string}
 */
export declare type MonthNames = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
/**
 * Short month names.
 *
 * @param {string}
 */
export declare type ShortMonthNames = "Jan" | "Feb" | "Mar" | "Apr" | "May(short)" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";
/**
 * Weekedays.
 *
 * @type {string}
 */
export declare type Weekdays = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
/**
 * Short weekday names.
 *
 * @type {string}
 */
export declare type ShortWeekdays = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
/**
 * Handles date and time formatting.
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/} Tutorial on date/time formatting
 * @todo Better type casting of passed in date?
 * @todo Quarter support?
 * @todo When parsing named months make the search case-insensitive
 * @todo Escape a.m./p.m. properly when used in RegEx
 */
export declare class DateFormatter extends BaseObject {
    /**
     * Date format.
     *
     * @type {string}
     */
    protected _dateFormat: string;
    /**
     * Input date format.
     *
     * @type {string}
     */
    protected _inputDateFormat: string;
    /**
     * Assume UTC time zone.
     *
     * @type {boolean}
     */
    protected _utc: boolean;
    /**
     * First day of week.
     *
     * 0 - Sunday
     * 1 - Monday
     *
     * Etc.
     *
     * @type {number}
     */
    protected _firstDayOfWeek: number;
    /**
     * A list of month names.
     *
     * @type {Array<MonthNames>}
     */
    protected _months: Array<MonthNames>;
    /**
     * A list of short month names.
     *
     * @param {Array<ShortMonthNames>}
     */
    protected _monthsShort: Array<ShortMonthNames>;
    /**
     * A list of weekday names.
     *
     * @type {Array<Weekdays>}
     */
    protected _weekdays: Array<Weekdays>;
    /**
     * A list of short weekday names.
     *
     * @type {Array<ShortWeekdays>}
     */
    protected _weekdaysShort: Array<ShortWeekdays>;
    /**
     * Output format to produce. If the format calls for applying color to the
     * formatted value, this setting will determine what markup to use: SVG or
     * HTML.
     *
     * Available options: svg, html.
     *
     * @default "svg"
     * @type {string}
     */
    protected _outputFormat: string;
    /**
     * Holds reference to parent [[Sprite]] object.
     *
     * @type {Optional<Sprite>}
     */
    sprite: $type.Optional<Sprite>;
    /**
     * Holds reference to [[Language]] object.
     *
     * @type {Optional<Language>}
     */
    language: $type.Optional<Language>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Formats the date value according to specified format.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/} Tutorial on date/time formatting
     * @param  {any}     source  Date value
     * @param  {string}  format  Format
     * @return {string}          Formatted date string
     */
    format(source: any, format?: string): string;
    /**
     * Parses format into structured infromation.
     *
     * @param {string} format Format template
     */
    protected parseFormat(format: string): DateFormatInfo;
    /**
     * Applies format to Date.
     *
     * @param  {Date}            date      Date object
     * @param  {DateFormatInfo}  info      Parsed format information
     * @param  {Language}        language  Language
     * @return {string}                    Formatted date string
     */
    protected applyFormat(date: Date, info: DateFormatInfo, language: Language): string;
    /**
     * Parses any input value into Date object.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/#Parsing_Dates} Tutorial on date/time parsing
     * @param  {any}     source  Source value
     * @param  {string}  format  Source format
     * @return {Date}            Date object
     */
    parse(source: any, format?: string): Date;
    /**
     * Resolves month name (i.e. "December") into a month number (11).
     *
     * @param  {MonthNames}  value  Month name
     * @return {number}             Month number
     */
    protected resolveMonth(value: MonthNames): number;
    /**
     * Resolves short month name (i.e. "Dec") into a month number.
     *
     * @param  {ShortMonthNames}  value  Short month name
     * @return {number}                  Month number
     */
    protected resolveShortMonth(value: ShortMonthNames): number;
    /**
     * Checks if passed in string represents AM/PM notation in many of its
     * versions.
     *
     * @param  {string}   value  Source string
     * @return {boolean}         Is it AM/PM?
     */
    protected isAm(value: string): boolean;
    /**
     * Invalidates related [[Sprite]] causing it to redraw.
     */
    protected invalidateSprite(): void;
    /**
     * Translates list of strings.
     *
     * @param  {Array<keyof ILocaleProperties>}  list  Source strings
     * @return {Array<string>}                         Translated strings
     */
    protected getStringList(list: Array<keyof ILocaleProperties>): Array<string>;
    /**
     * @return {string} Date format
     */
    /**
     * Date format to use.
     *
     * If format is not supplied in-line in the string, this setting will be
     * used.
     *
     * @default "yyyy-MM-dd"
     * @param {string} value Date format
     */
    dateFormat: string;
    /**
     * @return {string} Date format
     */
    /**
     * Date format to use when parsing dates.
     *
     * @default "yyyy-MM-dd"
     * @param {string} value Date format
     */
    inputDateFormat: string;
    /**
     * @return {boolean} Use UTC?
     */
    /**
     * Should formatter use UTC functions?
     *
     * If UTC is used, all date/time values will be independent on client's
     * time zone.
     *
     * @param {boolean} value Use UTC?
     */
    utc: boolean;
    /**
     * @return {number} First day of week
     */
    /**
     * Dirst day of the week:
     *
     * * 0 - Sunday
     * * 1 - Monday
     * * 2 - Tuesday
     *
     * Etc.
     *
     * @param {number} value First day of week
     */
    firstDayOfWeek: number;
    /**
     * @ignore Exclude from docs
     * @return {string} Format
     */
    /**
     * Output format for the formatted date.
     *
     * @ignore Exclude from docs
     * @param {string}  value  Format
     */
    outputFormat: string;
}
