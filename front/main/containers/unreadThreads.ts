'use strict';

import { Container } from 'unstated';

type UnreadThreads = {
    unreadCount: number
}

class UnreadThreadsContainer extends Container<UnreadThreads> {

    state = { unreadCount: 0 };

    logout () {
        this.setState({ isAuthenticated: false, token: '', user: null })
    }

}

export default new UnreadThreadsContainer()
