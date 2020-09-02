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
    function updateLocalStorage(newObj) {
        localStorage.setItem("kanaQueues", JSON.stringify(newObj))
    }

    /**
     * getLocalStorage
     * @returns {Object} - returns 
     */
    function getLocalStorage() {
        return JSON.parse(localStorage.getItem("kanaQueues"));
    }
}

export default LocalStorageDriver;
