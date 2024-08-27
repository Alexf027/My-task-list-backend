const z = require('zod');

const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required',
    }).email({
        message: 'Invalid email',
    }),
    password: z.string({
        required_error: 'Password is required',
    }).min(6, {
        message: 'Incorrect password or email',
    }),
});

module.exports = loginSchema;