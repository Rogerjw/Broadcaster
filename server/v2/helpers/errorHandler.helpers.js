export default (func) => {
    return async(req, res) => {
        try {
            await func(req, res);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
    };
};