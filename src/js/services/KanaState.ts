
import { APP_MODES } from "../types";

interface KanaState {
    single: Boolean,
    appMode: APP_MODES,
    currentDeck: string
};

class StateService {
    state: KanaState = {
        single: true,
        appMode: 0,
        currentDeck: ""
    };

    update(state: any): void {
        this.state = Object.assign(this.state, state);
    }

    get(): KanaState {
        return this.state;
    }
}


export default new StateService();