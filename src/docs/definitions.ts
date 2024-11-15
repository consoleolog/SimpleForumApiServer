export default {
    Error: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                description: 'error name',
            },
            errorCode: {
                type: 'string',
                description: 'error Code',
            },
            message: {
                type: 'string',
                description: 'error message',
            },
        },
    },
};