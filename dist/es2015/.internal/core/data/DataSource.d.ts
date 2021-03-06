import { DataParser } from "./DataParser";
import { BaseObjectEvents, IBaseObjectEvents } from "../Base";
import { Component } from "../Component";
import { Adapter } from "../utils/Adapter";
import { Language } from "../utils/Language";
import { DateFormatter } from "../formatters/DateFormatter";
import { INetRequestOptions } from "../utils/Net";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines events for [[DataSource]].
 */
export interface IDataSourceEvents extends IBaseObjectEvents {
    /**
     * Invoked when loading of the data starts.
     */
    started: {};
    /**
     * Invoked when loading of the data starts.
     */
    loadstarted: {};
    /**
     * Invoked when the loading of the data finishes.
     */
    loadended: {};
    /**
     * Invoked when parsing of the loaded data starts.
     */
    parsestarted: {};
    /**
     * Invoked when parsing of the loaded data finishes.
     */
    parseended: {};
    /**
     * Invoked when loading and parsing finishes.
     */
    ended: {};
    /**
     * Invoked when data source was successfully loaded and parsed.
     */
    done: {
        data: any;
    };
    /**
     * Invoked when data source encounters a loading error.
     */
    error: {
        code: number;
        message: string;
    };
    /**
     * Invoked when data source encounters a parsing error.
     */
    parseerror: {
        message: string;
    };
}
/**
 * Defines adapters for [[DataSource]].
 */
export interface IDataSourceAdapters {
    /**
     * Applied to a data source URL before it is loaded.
     *
     * @type {string}
     */
    url: string;
    /**
     * Applied to a parser type, before parsing starts.
     *
     * Can be used to supply different parser than the one set/determined by
     * Data Loader.
     *
     * @type {DataParser}
     */
    parser: DataParser;
    /**
     * Applied to the timeout setting.
     *
     * @type {number}
     */
    reloadTimeout: number;
    /**
     * Applied to the loaded data **before** it is passed to parser.
     *
     * @type {string}
     */
    unparsedData: string;
    /**
     * Applied to the loaded data **after** it was parsed by a parser.
     * @type {any}
     */
    parsedData: any;
    /**
     * Applied to `incremental` setting.
     *
     * @type {boolean}
     */
    incremental: boolean;
    /**
     * Applied to parser options.
     *
     * @type {any}
     */
    parserOptions: any;
    /**
     * Applied to the array that lists fields in data that hold date-based values.
     *
     * @type {string[]}
     */
    dateFields: string[];
    /**
     * Applied to the array that lists fields in data that hold numeric values.
     *
     * @type {string[]}
     */
    numberFields: string[];
    /**
     * Applied to the custom request options object.
     *
     * @type {INetRequestOptions}
     */
    requestOptions: INetRequestOptions;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Represents a single data source - external file with all of its settings,
 * such as format, data parsing, etc.
 *
 * ```TypeScript
 * chart.dataSource.url = "http://www.myweb.com/data.json";
 * chart.dataSource.parser = am4core.JSONParser;
 * ```
 * ```JavaScript
 * chart.dataSource.url = "http://www.myweb.com/data.json";
 * chart.dataSource.parser = am4core.JSONParser;
 * ```
 * ```JSON
 * {
 *   // ...
 *   "dataSource": {
 *     "url": "http://www.myweb.com/data.json",
 *     "parser": "JSONParser"
 *   },
 *   // ...
 * }
 * ```
 *
 * @see {@link IDataSourceEvents} for a list of available events
 * @see {@link IDataSourceAdapters} for a list of available Adapters
 */
export declare class DataSource extends BaseObjectEvents {
    /**
     * Defines available events.
     *
     * @type {IDataSourceEvents}
     * @ignore Exclude from docs
     */
    _events: IDataSourceEvents;
    /**
     * Defines available adapters.
     *
     * @ignore Exclude from docs
     * @type {IExportAdapters}
     */
    _adapter: IDataSourceAdapters;
    /**
     * Adapter.
     *
     * @type {Adapter<DataSource, IDataSourceAdapters>}
     */
    adapter: Adapter<DataSource, IDataSourceAdapters>;
    /**
     * A [[Component]] recipient of the data.
     *
     * @type {Component}
     */
    component: Component;
    /**
     * An instance of [[Language]].
     *
     * @type {Language}
     */
    protected _language: Language;
    /**
     * An instance of [[DateFormatter]].
     *
     * @type {DateFormatter}
     */
    protected _dateFormatter: DateFormatter;
    /**
     * An instance of parser class that can understand and parse data from the
     * source URL.
     *
     * @type {DataParser}
     */
    protected _parser: DataParser;
    /**
     * An URL of the data source.
     *
     * @type {string}
     */
    protected _url: string;
    /**
     * Custom options for HTTP(S) request.
     *
     * @type {INetRequestOptions}
     */
    protected _requestOptions: INetRequestOptions;
    /**
     * Reload full data source every X ms.
     *
     * @type {number}
     */
    protected _reloadFrequency: number;
    /**
     * Holds timeout reference for next reload.
     *
     * @type {any}
     */
    protected _reloadTimeout: any;
    /**
     * If set to `true`, any subsequent data loads will be considered incremental
     * (containing only new data points that are supposed to be added to existing
     * data).
     *
     * @type {boolean}
     */
    protected _incremental: boolean;
    /**
     * Holds the date of the last load.
     *
     * @type {Date}
     */
    lastLoad: Date;
    /**
     * If set to `true` it will timestamp all requested URLs to work around
     * browser cache.
     *
     * @type {boolean}
     */
    disableCache: boolean;
    /**
     * Will show loading indicator when loading files.
     *
     * @type {boolean}
     */
    showPreloader: boolean;
    /**
     * Loaded and parsed data.
     *
     * @type {string}
     */
    data: any;
    /**
     * Constructor
     */
    constructor(url?: string, parser?: string | DataParser);
    /**
     * Processes the loaded data.
     *
     * @ignore Exclude from docs
     * @param {string}  data  Raw (unparsed) data
     * @param {string}  type  Content type of the loaded data (optional)
     */
    processData(data: string, type?: string): void;
    /**
     * @return {string} URL
     */
    /**
     * URL of the data source.
     *
     * @param {string}  value  URL
     */
    url: string;
    /**
     * @return {INetRequestOptions} Options
     */
    /**
     * Custom options for HTTP(S) request.
     *
     * At this moment the only option supported is: `requestHeaders`, which holds
     * an array of objects for custom request headers, e.g.:
     *
     * ```TypeScript
     * chart.dataSource.requestOptions.requestHeaders = [{
     *   "key": "x-access-token",
     *   "value": "123456789"
     * }];
     * ``````JavaScript
     * chart.dataSource.requestOptions.requestHeaders = [{
     *   "key": "x-access-token",
     *   "value": "123456789"
     * }];
     * ```
     * ```JSON
     * {
     *   // ...
     *   "dataSource": {
     *     // ...
     *     "requestOptions": {
     *       "requestHeaders": [{
     *         "key": "x-access-token",
     *         "value": "123456789"
     *       }]
     *     }
     *   }
     * }
     * ```
     *
     * NOTE: setting this options on an-already loaded DataSource will not
     * trigger a reload.
     *
     * @param {INetRequestOptions}  value  Options
     */
    requestOptions: INetRequestOptions;
    /**
     * @return {DataParser} Data parser
     */
    /**
     * A parser to be used to parse data.
     *
     * ```TypeScript
     * chart.dataSource.url = "http://www.myweb.com/data.json";
     * chart.dataSource.parser = am4core.JSONParser;
     * ```
     * ```JavaScript
     * chart.dataSource.url = "http://www.myweb.com/data.json";
     * chart.dataSource.parser = am4core.JSONParser;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "dataSource": {
     *     "url": "http://www.myweb.com/data.json",
     *     "parser": "JSONParser"
     *   },
     *   // ...
     * }
     * ```
     *
     * @default JSONParser
     * @param {DataParser}  value  Data parser
     */
    parser: DataParser;
    /**
     * @return {number} Reload frequency (ms)
     */
    /**
     * Data source reload frequency.
     *
     * If set, it will reload the same URL every X milliseconds.
     *
     * @param {number} value Reload frequency (ms)
     */
    reloadFrequency: number;
    /**
     * @return {boolean} Incremental load?
     */
    /**
     * Should subsequent reloads be treated as incremental?
     *
     * Incremental loads will assume that they contain only new data items
     * since the last load.
     *
     * If `incremental = false` the loader will replace all of the target's
     * data with each load.
     *
     * @default false
     * @param {boolean} Incremental load?
     */
    incremental: boolean;
    /**
     * @return {Language} A [[Language]] instance to be used
     */
    /**
     * Language instance to use.
     *
     * Will inherit and use chart's language, if not set.
     *
     * @param {Language} value An instance of Language
     */
    language: Language;
    /**
     * @return {DateFormatter} A [[DateFormatter]] instance to be used
     */
    /**
     * A [[DateFormatter]] to use when parsing dates from string formats.
     *
     * Will inherit and use chart's DateFormatter if not ser.
     *
     * @param {DateFormatter} value An instance of [[DateFormatter]]
     */
    dateFormatter: DateFormatter;
    /**
     * Adds current timestamp to the URL.
     *
     * @param  {string}  url  Source URL
     * @return {string}       Timestamped URL
     */
    timestampUrl(url: string): string;
    /**
     * Disposes of this object.
     */
    dispose(): void;
    /**
     * Initiate the load.
     *
     * All loading in JavaScript is asynchronous. This function will trigger the
     * load and will exit immediately.
     *
     * Use DataSource's events to watch for loaded data and errors.
     */
    load(): void;
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param {object}  config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
}
