const jwt = require('jsonwebtoken');
const checktoken = (req, res, next) => {
	try {
		const authorization = req.headers.authorization;
		if (!authorization) {
			res.json({ error: "'Authorization' header not found" })
			return
		}
		const token = authorization.replace("Bearer", "").trim();
		if (!token) {
			res.send({ error: 'Authorization header incorrect' });
			return
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			res.send({ error: "Authorization header incorrect" });
			return
		}

		req.user_id = decoded.user_id;
		next();
	} catch (error) {
		res.send({ error: "Authorization header incorrect" });
	}
}
module.exports = checktoken;
