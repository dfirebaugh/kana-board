
enum AppMode {
    DECK_SELCTION,
    HIRAGANA_SINGLE,
    HIRAGANA_BOARD,
    KATAKANA_BOARD
}

interface KanaState {
    single: Boolean,
    appMode: AppMode
};

class StateService {
    state: KanaState = {
        single: true,
        appMode: 0
    };

    update(state: any): void {
        this.state = Object.assign(this.state, state);
    }

    get(): KanaState {
        return this.state;
    }
}


export default new StateService();