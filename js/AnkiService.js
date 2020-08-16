import localStorageDriver from "./localStorageDriver";
import kanas from "../data/kanas_with_images";

/**
 * initialize the localStorageDriver so that we can use it across multiple modules
 */
export default localStorageDriver(kanas);
