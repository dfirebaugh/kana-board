interface KanaState {
    single: Boolean
};
class StateService {
    state: KanaState = {
        single: true
    };

    update(state: KanaState): void {
        this.state = Object.assign(this.state, state);
    }

    get(): KanaState {
        return this.state;
    }
}


export default new StateService();