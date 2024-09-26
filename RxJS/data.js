export const State = {
    ACTIVE: 1,
    INACTIVE: 0
}

export const validUsers = {
    data: [
        { age: 18, state: State.ACTIVE},
        { age: 12, state: State.INACTIVE},
        { age: 14, state: State.ACTIVE},
        { age: 52, state: State.INACTIVE},
        { age: 41, state: State.ACTIVE},
        { age: 11, state: State.ACTIVE},
        { age: 46, state: State.INACTIVE},
    ]
}

export const invalidUsers = {
    data: [
        { age: 18, state: State.ACTIVE},
        { age: 12, state: State.INACTIVE},
        { age: 14, state: State.ACTIVE},
        { age: 52, state: State.INACTIVE},
        { age: 10, state: State.ACTIVE},
        { age: 11, state: State.ACTIVE},
        { age: 46, state: State.INACTIVE},
    ]
}