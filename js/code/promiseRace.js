// implement promise race

const p1 = new Promise((resolve, reject) => {
	setTimeout(() => resolve("p1"));
});
const p2 = new Promise((resolve, reject) => {
	setTimeout(() => resolve("p2"));
});
const p3 = new Promise((resolve, reject) => {
	setTimeout(() => resolve("p3"));
});

const promiseRace = (arr) => {
	return new Promise((resolve, reject) => {
		for (const p of arr) {
			p.then((value) => {
				resolve(value);
			}).catch((err) => {
				reject(err);
			});
		}
	});
};

promiseRace([p1, p2, p3])
	.then((value) => {
		console.log(value);
	})
	.catch((err) => {
		console.error("error", err);
	});
