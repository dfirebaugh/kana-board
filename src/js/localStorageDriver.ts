import { StorageObj_t, StorageDriver } from "./types";

/**
 * localStorageDriver
 * service that will allow us to store and retrieve from localStorage
 */
export const localStorageDriver = (): StorageDriver => {
    return {
        update: updateLocalStorage,
        get: getLocalStorage
    }

    /**
     * setLocalStorage - update our stored kana weights
     * @param {Object} newObj 
     */
    function updateLocalStorage(newObj: StorageObj_t): void {
        localStorage.setItem("kanaBoard", JSON.stringify(newObj))
    }

    /**
     * getLocalStorage
     * @returns {Object} - returns 
     */
    function getLocalStorage(): String | undefined {
        return JSON.parse(localStorage.getItem("kanaBoard") || "{}");
    }
}
