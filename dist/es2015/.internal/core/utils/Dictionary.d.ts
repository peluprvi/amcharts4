/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IDisposer, Disposer } from "./Disposer";
import { EventDispatcher, AMEvent } from "./EventDispatcher";
import { Optional } from "./Type";
import { IClone } from "./Clone";
import * as $iter from "./Iterator";
/**
 * Defines events from [[Dictionary]].
 */
export interface IDictionaryEvents<Key, Value> {
    /**
     * Invoked when an item is removed from the dictionary.
     */
    remove: {
        /**
         * Removed value.
         *
         * @type {Value}
         */
        oldValue: Value;
    };
    /**
     * Invoked when dictionary is cleared.
     */
    clear: {};
    /**
     * Invoked when `insertKey()` method is called.
     */
    insertKey: {
        /**
         * Key.
         *
         * @type {Key}
         */
        key: Key;
        /**
         * Added value.
         *
         * @type {Value}
         */
        newValue: Value;
    };
    /**
     * Invoked when `setKey()` method is called.
     */
    setKey: {
        /**
         * Key.
         *
         * @type {Key}
         */
        key: Key;
        /**
         * Removed value. (if overwriting)
         *
         * @type {Value}
         */
        oldValue: Value;
        /**
         * Added value.
         *
         * @type {Value}
         */
        newValue: Value;
    };
    /**
     * Invoked when `removeKey()` method is called.
     */
    removeKey: {
        /**
         * Key.
         *
         * @type {Key}
         */
        key: Key;
        /**
         * Removed value.
         *
         * @type {Value}
         */
        oldValue: Value;
    };
}
/**
 * [K description]
 *
 * @ignore Exclude from docs
 * @todo Descirption
 */
export declare type DictionaryLike<K, A> = $iter.Iterable<[K, A]> & {
    events: EventDispatcher<{
        remove: {
            oldValue: A;
        };
    }>;
};
/**
 * A disposable dictionary, which when disposed itself will call `dispose()`
 * method on all its items.
 */
export declare class DictionaryDisposer<K, A extends IDisposer> extends Disposer {
    constructor(dict: DictionaryLike<K, A>);
}
/**
 * A Dictionary is collection where values of some type can be mapped to
 * string keys.
 *
 * You might call it an "associative list" or "associative array".
 */
export declare class Dictionary<Key extends string, T> {
    /**
     * Key/value pairs
     */
    private _dictionary;
    /**
     * Event dispatcher.
     *
     * @type {EventDispatcher<AMEvent<Dictionary<Key, T>, IDictionaryEvents<Key, T>>>}
     */
    events: EventDispatcher<AMEvent<Dictionary<Key, T>, IDictionaryEvents<Key, T>>>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Returns `true` if key exists in Dictionary.
     *
     * @param  {Key}      key  The key to search for
     * @return {boolean}       `true` if key exists, `false` if it doesn't
     */
    hasKey(key: Key): boolean;
    /**
     * Returns the value for a specific key.
     *
     * @param  {Key}          key  The key to search for
     * @return {Optional<T>}       Value for the key, or `undefined` if it doesn't exist
     */
    getKey(key: Key): Optional<T>;
    /**
     * Inserts value at specific key.
     *
     * Will thrown an exception if the key already exists in the dictionary.
     *
     * @param {Key}  key    Key
     * @param {T}    value  Value
     */
    insertKey(key: Key, value: T): void;
    /**
     * Adds or updates key/value into dictionary.
     *
     * If the key already exists, the old value will be overwritten.
     *
     * @param  {Key}  key    Key
     * @param  {T}    value  Value
     */
    setKey(key: Key, value: T): void;
    /**
     * Updates the value at specific `key` using custom function.
     *
     * Passes in current value into the function, and uses its output as a new
     * value.
     *
     * @ignore Exclude from docs
     * @param {Key}       key  Key
     * @param {function}  fn   Function to transform the value
     */
    updateKey(key: Key, fn: (value: T) => T): void;
    /**
     * Removes value at specific `key` from dictionary.
     *
     * @param {Key}  key  Key to remove
     */
    removeKey(key: Key): void;
    /**
     * [insertKeyIfEmpty description]
     *
     * @ignore Exclude from docs
     * @todo description
     * @param  {Key}       key      [description]
     * @param  {function}  ifEmpty  [description]
     * @return {T}                  [description]
     */
    insertKeyIfEmpty(key: Key, ifEmpty: () => T): T;
    /**
     * Removes all items from the dictionary.
     */
    clear(): void;
    /**
     * Copies items from another Dictionary.
     *
     * @param {Dictionary<Key, T>}  source  A Dictionary to copy items from
     */
    copyFrom(source: this): void;
    /**
     * Returns an interator that can be used to iterate through all items in
     * the dictionary.
     *
     * @return {Iterator} Iterator
     */
    iterator(): $iter.Iterator<[Key, T]>;
    /**
     * Returns an ES6 iterator for the keys/values of the dictionary.
     */
    [Symbol.iterator](): Iterator<[Key, T]>;
    /**
     * Calls `f` for each key/value in the dictionary.
     */
    each(f: (key: Key, value: T) => void): void;
    /**
     * Returns an iterator that can be used to iterate through all items in
     * the dictionary, ordered by key.
     *
     * @ignore Exclude from docs
     * @return {Iterator} Iterator
     */
    sortedIterator(): $iter.Iterator<[Key, T]>;
}
/**
 * A version of a [[Dictionary]] that has a "template".
 *
 * A template is an instance of an object, that can be used to create new
 * elements in the list without actually needing to create instances for those.
 *
 * When new element is created in the list, e.g. by calling its `create()`
 * method, an exact copy of the element is created (including properties and
 * other attributes), inserted into the list and returned.
 */
export declare class DictionaryTemplate<Key extends string, T extends IClone<T> & {
    isTemplate: boolean;
}> extends Dictionary<Key, T> {
    /**
     * A template object.
     *
     * @todo Make this private
     * @type {T}
     */
    _template: T;
    /**
     * Constructor
     *
     * @param {T} t Template object
     */
    constructor(t: T);
    /**
     * @return {T} Template object
     */
    /**
     * A "template" object to copy all properties from when creating new list
     * items.
     *
     * @param {T}  v  Template object
     */
    template: T;
    /**
     * Copies all elements from other dictionary.
     *
     * @param {DictionaryTemplate}  source  Source dictionary
     */
    copyFrom(source: this): void;
    /**
     * Instantiates a new object of the specified type, adds it to specified
     * `key` in the dictionary, and returns it.
     *
     * @param make  Item type to use. Will use the default type for the dictionary if not specified.
     * @return      Newly created item
     */
    create(key: Key): T;
}
