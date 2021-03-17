# easy

- what happens when we use display: none;?

- Diff betn display: none; and visibility: hidden;?

- Types of event delegation?
  Capturing and bubbling

# medium

- When we add element into the dom, only section of the dom rerenders or the entire dom?
<html>
	<body>
		<div class="A"></div>
	</body>
</html>
	
	Changes to:

<html>
	<body>
		<div class="A">
			<div class="B"></div>	
		</div>
	</body>
</html>

- Is this good code?

<!-- prettier-ignore-start -->

  setInterval(() => {
	  console.log("hey, wassup");
  }, 1000);

  good code:
	const interval = setInterval(() => {
	  console.log("hey, wassup");
  }, 1000);  

	clearInterval(interval);

<!-- prettier-ignore-end -->

- What happens when we use transfrom and left or right?

- How would you animate box-shadow?

# hard

- What happens when we use "delete" statement on an object key?
  const o = { x: "y" };
  delete o.x;
  o.x;

  JIT compiler has to recreate another class. V8 has to bail out of using hidden classes.

  better do
  const o = { x: "y" };
  o = null;
  o.x;

- Describe how garbage collector work in Javascript?
  Mark and sweep.

- Dom Leaks?

<!-- prettier-ignore-start -->
					body

div    div#tree    div
          |
  ________|_________
                    |
                    |
                   ul
           _________|_________
                              |
                             li
                              |
                           a#leaf
<!-- prettier-ignore-end -->

const tree = document.querySelector("#tree");
const leaf = document.querySelector("#leaf");
const body = document.querySelector("body");

body.removeChild(tree);

#tree cant be GCed yet cuz #tree is being referenced

tree = null;

#tree cant be GCed yet, due to indirect reference from leaf

leaf = null;

Now #tree can be GCed

- What happens when we write code like this?

<!-- prettier-ignore-start -->

document.body.addEventListener('touchstart', event => {
    if (event.target === area) {
        event.preventDefault();
    }
});

What happens:
Since you only need to write one event handler for all elements, ergonomics of this event delegation pattern are attractive. 
However, if you look at this code from the browser's point of view, now the entire page is marked as a non-fast scrollable region. 
This means even if your application doesn't care about input from certain parts of the page, 
the compositor thread has to communicate with the main thread and wait for it every time an input event comes in. 
Thus, the smooth scrolling ability of the compositor is defeated.


good code:
document.body.addEventListener('touchstart', event => {
    if (event.target === area) {
        event.preventDefault()
    }
 }, {passive: true});

What happens:
In order to mitigate this from happening, you can pass passive: true options in your event listener. 
This hints to the browser that you still want to listen to the event in the main thread, 
but compositor can go ahead and composite new frame as well.

Mozilla: A Boolean that, if true, indicates that the function specified by listener will never call preventDefault(). 
If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning.
The default value for the passive option is always false. 
However, this introduces the potential for event listeners handling certain touch events (among others) 
to block the browser's main thread while it is attempting to handle scrolling, 
resulting in possibly enormous reduction in performance during scroll handling.

<!-- prettier-ignore-end -->

- What are Coalesced Events?

For most web applications, coalesced events should be enough to provide a good user experience.
However, if you are building things like drawing application and putting a path based on touchmove coordinates,
you may lose in-between coordinates to draw a smooth line.
In that case, you can use the getCoalescedEvents method in the pointer event to get information about those coalesced events.

<!-- prettier-ignore-start -->
window.addEventListener('pointermove', event => {
    const events = event.getCoalescedEvents();
    for (let event of events) {
        const x = event.pageX;
        const y = event.pageY;
        // draw a line using x and y coordinates.
    }
});
<!-- prettier-ignore-end -->
