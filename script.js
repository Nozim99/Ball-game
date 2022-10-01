const ball = document.getElementById("ball")
const gameBody = document.getElementById("game__body")
const point = document.getElementById("point")
const record = document.getElementById("record")
const recordBox = document.getElementById("record-box")
const displayWidth = parseFloat(window.getComputedStyle(gameBody).getPropertyValue("width"))
const displayHeight = parseFloat(window.getComputedStyle(gameBody).getPropertyValue("height"))
const thornSecond = 5000

let pointMeter = 0
let recordMeter = JSON.parse(localStorage.getItem("record")) ? JSON.parse(localStorage.getItem("record")) : 0
record.innerText = recordMeter
setInterval(() => {
    pointMeter++
    point.innerText = pointMeter
    if (pointMeter > recordMeter) {
        localStorage.setItem("record", JSON.stringify(pointMeter))
        recordBox.style.color = "red"
    }
}, 300);

let ballTop = 370
let ballLeft = 100
ball.style.left = ballLeft + "px"
ball.style.top = ballTop + "px"

let intUp;
let intDown;
let intRight;
let intLeft;
let fixIntUp = true;
let fixIntDown = true;
let fixIntRight = true;
let fixIntLeft = true;

window.addEventListener("keydown", e => {
    if (e.code === "ArrowUp") {
        if (fixIntUp) {
            intUp = setInterval(() => {
                if (ballTop >= 0) {
                    ballTop -= 2
                    ball.style.top = ballTop + "px"
                }
            }, 1);
        }
        fixIntUp = false
    }
    if (e.code === "ArrowDown") {
        if (fixIntDown) {
            intDown = setInterval(() => {
                if (ballTop <= displayHeight - 50) {
                    ballTop += 2
                    ball.style.top = ballTop + "px"
                }
            }, 1);
        }
        fixIntDown = false
    }
    if (e.code === "ArrowRight") {
        if (fixIntRight) {
            intRight = setInterval(() => {
                if (ballLeft <= displayWidth - 50) {
                    ballLeft += 2
                    ball.style.left = ballLeft + "px"
                }
            }, 1);
        }
        fixIntRight = false
    }
    if (e.code === "ArrowLeft") {
        if (fixIntLeft) {
            intLeft = setInterval(() => {
                if (ballLeft >= 0) {
                    ballLeft -= 2
                    ball.style.left = ballLeft + "px"
                }
            }, 1);
        }
        fixIntLeft = false
    }
})

window.addEventListener("keyup", e => {
    if (e.code === "ArrowUp") {
        clearInterval(intUp)
        fixIntUp = true
    }
    if (e.code === "ArrowDown") {
        clearInterval(intDown)
        fixIntDown = true
    }
    if (e.code === "ArrowRight") {
        clearInterval(intRight)
        fixIntRight = true
    }
    if (e.code === "ArrowLeft") {
        clearInterval(intLeft)
        fixIntLeft = true
    }
})

setTimeout(() => {
    setInterval(() => {
        const thorn = document.createElement("div")
        thorn.classList.add("thorn")
        gameBody.append(thorn)
        const randomNum = Math.random() * 10
        const thornTop = displayHeight / 100 * randomNum * randomNum
        thorn.style.top = thornTop + "px"
        thorn.style.animation = "thornLeft 5s linear forwards"
        const test = setInterval(() => {
            if (parseFloat(window.getComputedStyle(ball).getPropertyValue("top")) - 40 < parseFloat(window.getComputedStyle(thorn).getPropertyValue("top"))
                && parseFloat(window.getComputedStyle(ball).getPropertyValue("top")) + 40 > parseFloat(window.getComputedStyle(thorn).getPropertyValue("top"))
                && parseFloat(window.getComputedStyle(ball).getPropertyValue("left")) - 40 < parseFloat(window.getComputedStyle(thorn).getPropertyValue("left"))
                && parseFloat(window.getComputedStyle(ball).getPropertyValue("left")) + 40 > parseFloat(window.getComputedStyle(thorn).getPropertyValue("left"))
            ) {
                alert("Lose")
                location.reload()
            }
        }, 10);
        setTimeout(() => {
            clearInterval(test)
            thorn.remove()
        }, thornSecond);
    }, 600);

    setInterval(() => {
        const thorn = document.createElement("div")
        thorn.classList.add("thorn")
        gameBody.append(thorn)
        const randomNum = Math.random() * 10
        const thornTop = displayWidth / 100 * randomNum * randomNum
        thorn.style.left = thornTop + "px"
        thorn.style.animation = "thornRight 4s linear forwards"

        const test = setInterval(() => {
            if (parseFloat(window.getComputedStyle(ball).getPropertyValue("top")) - 40 < parseFloat(window.getComputedStyle(thorn).getPropertyValue("top"))
                && parseFloat(window.getComputedStyle(ball).getPropertyValue("top")) + 40 > parseFloat(window.getComputedStyle(thorn).getPropertyValue("top"))
                && parseFloat(window.getComputedStyle(ball).getPropertyValue("left")) - 40 < parseFloat(window.getComputedStyle(thorn).getPropertyValue("left"))
                && parseFloat(window.getComputedStyle(ball).getPropertyValue("left")) + 40 > parseFloat(window.getComputedStyle(thorn).getPropertyValue("left"))
            ) {
                alert("Lose")
                location.reload()
            }
        }, 10);
        setTimeout(() => {
            clearInterval(test)
            thorn.remove()
        }, thornSecond);
    }, 600);
}, 1000);