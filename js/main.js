// first, we need to save the canvas and the positioning message area to variables
// this is so we can refer to them later
const game = document.getElementById('canvas');
const movement = document.getElementById('movement')
// movement will display the character's X and Y movements

// we also need to define our game context
const ctx = game.getContext('2d');

// we have a variable height and width on our canvas so we need to get that height and width as a reference point so we can do stuff with it later!
// for this, we'll use the built in getComputedStyle function!
// we'll use this along with setAttribute
game.setAttribute('width', getComputedStyle(game)['width']);
game.setAttribute('height', getComputedStyle(game)['height']);

// console.log('this is the canvas width', game.width);
// console.log('this is the canvas height', game.height);
// now we know we can refer to game.width and game.height to get the specific dimensions of the canvas

// THIS IS WHERE WE START TALKING ABOUT OOP: Object Oriented Programming
// Programming with objects in mind
// OBJECTS are descriptive elements - elements that DESCRIBE things with key:value pairs

const someObject = {
    name: 'object name',
    height: 50,
    favoriteFood: 'donut',
    alive: true,
    itemsInPocket: [
        {name: 'phone', size: 'small'},
        {name: 'the ring', size: 'very small'},
    ]
}

// sometimes when we want to make a bunch of the same object, we can use a class! this is a JS thing!
// this way we can write DRY code, and create elements of different shapes and sizes
// classes ALWAYS start with a capital letter

// objects are made of properties (key: value pairs) and methods, which are functions
class Crawler {
    // classes can ALSO have (and usually do) a constructor function!
    // this is how we tell our class exactly how we want to build our objects
    // this also allows us to use the keyword 'this' in reference to whatever object has been made by the class
    //any attributes that are variable go into the constructor function!
    constructor(x, y, color, width, height) {
        // this is how I define what my objects will be made of
        // because these will be in an object, need to separate by commas
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        // anything that is going to be the same for all instances of the objects we create, we can hard set the value here and leave that out of the constructor.
        // and these are all referring to the parameters we're setting up in the constructor function
        this.alive = true,
        // we can also add methods!
        // in our case, the method is going to be the render method
        this.render = function() {
            // here is where we start interacting with the canvas!
            // we set the fillStyle and the fillRect
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

// to instantiate instances of classes, or as we call them: OBJECTS
// we call the class method with a very specific syntax
let player = new Crawler(10, 10, 'blue', 16, 16);
let ogre = new Crawler(200, 50, 'lightgreen', 32, 48);

//animation is a bunch of sequential frames that give the illusion of movement by showing slight variations in the frame

// the gameLoop function will be what helps us create an animation effect
// it also allows us to say what happens When and control those events to our liking
// this is how we utilize movement

const gameLoop = () => {
    // make sure you don't have console logs in your game loop!!
    // console.log('frame running')
    // the win condition of our game is to kill shrek
    // if our ogre is alive, the game can continue
    if (ogre.alive) {
        detectHit();
    }
    // if shrek is deceased, the game will end
    // we need to render both our objects, and we'll use their respective render methods to do this
    // we will also update our movement box with the coordinates of our player
    // to create the illusion of movement, we'll need to clear the canvas ever 'frame' so that our hero's movement doesn't turn him into a snake

    //before my text change, and before my player render
    ctx.clearRect(0, 0, game.width, game.height)
    movement.textContent = player.x + ', ' + player.y;
    player.render()
    // canvas can be a bit weird, keep if statements separate by default, just test it!
    if (ogre.alive) {
        ogre.render();
    }
}

// to implement a pause button, we can just stop the interval?

document.addEventListener('DOMContentLoaded', function () {
    // in here, we need to have our movement handler
    document.addEventListener('keydown', movementHandler)
    // we also need to have our game loop running at an interval
    setInterval(gameLoop, 60) // this is 60 frames!
})

// this function is going to be how we move our player around!
// we'll use e to take the place of an event
const movementHandler = (e) => {
    // this movement handler is going to be attached to an event listener
    // we'll attach it with a keydown event
    // key events can use the key itself or a keycode
    // we'll use keycodes
    // w = 87, a = 65, s = 83, d = 68
    // alternately we can use the arrow keys
    // up = 38, down = 40, left = 37, right = 39
    // in order to do different things for different keys, we can use if statements or we can use a switch case!
    // switch cases are handy when you have multiple possibilities
    // switch case has a main switch, and cases (in this our cases are inputs)
    // we also need a break in every case, so we can read this multiple times!
        // this works with both arrow and wasd keys
    switch (e.keyCode) {
        case 87: case 38:
            // moves player up
            player.y -= 10;
            break;
        case 83: case 40:
            // moves player down
            player.y += 10;
            break;
        case 65: case 37:
            // moves player left
            player.x -= 10;
            break;
        case 68: case 39:
            // moves player right
            player.x += 10;
            break;
        default:
    }
}

// COLLISION DETECTION
// collision is when these two objects collide(player square crosses into the plane of the shrek square)
// to detect collision bw objects, we need to account for the entire space that the object takes up
// here, we'll write a collision detection funciton that
// takes our dimensions into account, and tells us what to do if collision happens
const detectHit = () => {
    // we'll use one big if statement that clearly defines any moment of collision
    // that means utilizing x, y, width, and height of our objects
    if (player.x < ogre.x + ogre.width 
        && player.x + player.width > ogre.x
        && player.y < ogre.y + ogre.height
        && player.y + player.height > ogre.y) {
            // here we can see if the hit happens at the right time
            // console.log('we have a hit!');
            // if a hit occurs, shrek dies and we win
            ogre.alive = false;
            document.getElementById('status').textContent = 'You win!'
        }
}
