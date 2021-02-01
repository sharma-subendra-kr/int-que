// implement promise all

const p1 = new Promise((resolve, reject) => {
	setTimeout(() => resolve("p1"));
});
const p2 = new Promise((resolve, reject) => {
	setTimeout(() => resolve("p2"));
});
const p3 = new Promise((resolve, reject) => {
	setTimeout(() => resolve("p3"));
});

const promiseAll = (arr) => {
	return new Promise((resolve, reject) => {
		let count = 0;
		const res = new Array(arr.length);

		for (const p of arr) {
			p.then((value) => {
				res[count++] = value;
				if (count === arr.length) {
					resolve(res);
				}
			}).catch((err) => {
				reject(err);
			});
		}
	});
};

promiseAll([p1, p2, p3])
	.then((value) => {
		console.log(value);
	})
	.catch((err) => {
		console.log("error", err);
	});
