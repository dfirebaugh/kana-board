import localStorageDriver from "../localStorageDriver";
import kanas from "../kanas_with_images";

// const QUEUE_SIZE = 20;

/**
 * getStorageDriver
 * conditionally returns a storageDriver so that we can test without using local storage
 */
function getStorageDriver() {
    
    /**
     * initialize the localStorageDriver so that we can use it across multiple modules
     */
    return localStorageDriver(kanas)
}

/**
 * SRSService
 * We have 3 different buckets (Weak, Medium, Strong)
 * Each item will also have a date of last review attached.
 * 
 * When we request a new queue, we will return $QUEUE_SIZE items prioritizing the weakest first
 *  then the one's that we haven't reviewed in a while
 */
function SRSService() {
    return getStorageDriver();
}


export default SRSService();
