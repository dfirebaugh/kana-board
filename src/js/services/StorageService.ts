import { localStorageDriver } from "../localStorageDriver";
import {
    StorageDriver,
} from "../types";

/**
 * initialize the localStorageDriver so that we can use it across multiple modules
 */
var storageDriver: StorageDriver = localStorageDriver();

/**
 * setStorageDriver
 * @param storageDriver 
 */
export function setStorageDriver(newStorageDriver: StorageDriver) {
    storageDriver = newStorageDriver;
}

/**
 * getStorageDriver
 * conditionally returns a storageDriver so that we can test without using local storage
 */
export function getStorageDriver(): StorageDriver {
    return storageDriver;
}
