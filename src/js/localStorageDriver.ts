import { StorageObj_t } from "./types";
 
 /**
 * service that will allow us to store and retrieve from localStorage
 */
function LocalStorageDriver() {
    return {
        updateStorage: updateLocalStorage,
        getStorage: getLocalStorage
    }

    /**
     * setLocalStorage - update our stored kana weights
     * @param {Object} newObj 
     */
    function updateLocalStorage(newObj: StorageObj_t) {
        localStorage.setItem("kanaBoard", JSON.stringify(newObj))
    }

    /**
     * getLocalStorage
     * @returns {Object} - returns 
     */
    function getLocalStorage() {
        return JSON.parse(localStorage.getItem("kanaBoard") || "{}");
    }
}

export default LocalStorageDriver;
