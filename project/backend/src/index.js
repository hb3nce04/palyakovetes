BigInt.prototype.toJSON = function () {
	return this.toString();
}; // Fixing BigInt serialization to JSON

import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`server: http://localhost:${PORT}/api`);
	console.log(`environment: ${process.env.NODE_ENV}`);
});
