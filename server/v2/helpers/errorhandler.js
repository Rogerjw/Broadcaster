export default (fn) => {
    return async(req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
    };
};