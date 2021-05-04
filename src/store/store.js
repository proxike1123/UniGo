import AsyncStore from '@react-native-async-storage/async-storage'

const SESSION = "@SESSION";

const USERNAME = "@USERNAME";

const setSession = (id) => {
    AsyncStore.setItem(SESSION, id);
}

const getSession = () => {
    return AsyncStore.getItem(SESSION);
}

const deleteSession = () => {
    AsyncStore.removeItem(SESSION);
}

const setUsername = (us) => {
    AsyncStore.setItem(USERNAME, us);
}

const getUsername = () => {
    return AsyncStore.getItem(USERNAME);
}

const deleteUsername = () => {
    AsyncStore.removeItem(USERNAME);
}

export {
    setSession,
    getSession,
    deleteSession,
    setUsername,
    getUsername,
    deleteUsername,
}


