// Q1
console.log("one");
setTimeout(function () {
	console.log("two");
}, 0);
Promise.resolve().then(function () {
	console.log("three");
});
console.log("four");

// Q2
for (var i = 0; i < 5; i++) {
	setTimeout(() => {
		console.log(i);
	});
}

// Q3
for (let i = 0; i < 5; i++) {
	setTimeout(() => {
		console.log(i);
	});
}
