const Clock = (_ => {

    let interval;
    let currentStatus = `session`;
    const audio = new Audio("http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav");

    const $time = document.querySelector("#time");
    const $timeLeft = document.querySelector("#time-left");
    const $startStop = document.querySelector(".start-stop");
    const $reset = document.querySelector("#reset");
    const $timerLabel = document.querySelector("#timer-label");
    const $activityIcon = document.querySelector(".activity-icon");

    const $breakDecrement = document.querySelector("#break-decrement");
    const $breakIncrement = document.querySelector("#break-increment");
    const $breakLength = document.querySelector("#break-length");
    $breakLength.innerHTML = 5;

    const $sessionDecrement = document.querySelector("#session-decrement");
    const $sessionIncrement = document.querySelector("#session-increment");
    const $sessionLength = document.querySelector("#session-length");
    $sessionLength.innerHTML = 25;

    let min = $sessionLength.innerHTML - 1;
    let sec = 60;

    $timeLeft.innerHTML = `${$sessionLength.innerHTML}:00`
    $startStop.innerHTML = `<i class="fa fa-play"></i>`;

    const init = _ => {
        listeners();
    }

    const listeners = _ => {

        $startStop.addEventListener("click", _ => {
            console.log("tryna start/pause");
            if (!interval) {
                if (!$activityIcon.innerHTML) {
                    $activityIcon.innerHTML = `<i class="fa fa-laptop"></i>`;
                }
                interval = setInterval(_ => {
                    if (min !== 0 && sec !== 0) {
                        sec--;
                    } else if (min === 0 && sec !== 0) {
                        sec--;
                        $time.style.color = "#920412";
                    } else if (min !== 0 && sec === 0) {
                        min--;
                        sec = 59;
                    } else if (min === 1 && sec === 0) {
                        min--;
                        sec = 59;
                        $time.style.color = "#920412";
                    } else if (min === 0 && sec === 0) {
                        audio.play();
                        $time.style.color = "#BEC0BB";
                        if (currentStatus === `session`) {
                            min = $breakLength.innerHTML; sec = 0;
                            currentStatus = `break`;
                            $activityIcon.innerHTML = `<i class="fa fa-coffee"></i>`;
                        } else {
                            min = $sessionLength.innerHTML; sec = 0;
                            currentStatus = `session`;
                            $activityIcon.innerHTML = `<i class="fa fa-laptop"></i>`;
                        }
                        $timeLeft.innerHTML = `${min}:00`;
                        $timerLabel.innerHTML = currentStatus;
                        return;
                    }
                    let displayMin = min < 10 ? `0${min}` : min;
                    let displaySec = sec < 10 ? `0${sec}` : sec;
                    $timeLeft.innerHTML = `${displayMin}:${displaySec}`;
                    $timerLabel.innerHTML = currentStatus;
                }, 1000)
            } else {
                clearInterval(interval);
                interval = !interval;
            }

            if ($startStop.innerHTML === `<i class="fa fa-play"></i>`) {
                $startStop.innerHTML = `<i class="fa fa-pause"></i>`;
            } else {
                $startStop.innerHTML = `<i class="fa fa-play"></i>`;
            }

        });

        $reset.addEventListener("click", _ => {
            min = 24; sec = 60;
            $breakLength.innerHTML = 5;
            $sessionLength.innerHTML = 25;
            $timeLeft.innerHTML = `${$sessionLength.innerHTML}:00`;
            $time.style.color = "#BEC0BB";
            $timerLabel.innerHTML = `use me!`;
            $activityIcon.innerHTML = ``;
            $startStop.innerHTML = `<i class="fa fa-play"></i>`;
            currentStatus = `session`;
            clearInterval(interval);
            if (interval) {
                interval = !interval;
            }
        })

        const breakDec = _ => {
            if ($breakLength.innerHTML > 1) {
                $breakLength.innerHTML--;
                if (currentStatus === `break`) {
                    $timeLeft.innerHTML = `${$breakLength.innerHTML}:00`;
                    min = $breakLength.innerHTML - 1;
                    sec = 60;
                    $time.style.color = "#BEC0BB";
                }
            }
        }
        const breakInc = _ => {
            if ($breakLength.innerHTML < 60) {
                $breakLength.innerHTML++;
                if (currentStatus === `break`) {
                    $timeLeft.innerHTML = `${$breakLength.innerHTML}:00`;
                    min = $breakLength.innerHTML - 1;
                    sec = 60;
                    $time.style.color = "#BEC0BB";
                }
            }
        }
        const seshDec = _ => {
            if ($sessionLength.innerHTML > 1) {
                $sessionLength.innerHTML--;
                if (currentStatus === `session`) {
                    $timeLeft.innerHTML = `${$sessionLength.innerHTML}:00`;
                    min = $sessionLength.innerHTML - 1;
                    sec = 60;
                    $time.style.color = "#BEC0BB";
                }
            }
        }
        const seshInc = _ => {
            if ($sessionLength.innerHTML < 60) {
                $sessionLength.innerHTML++;
                if (currentStatus === `session`) {
                    $timeLeft.innerHTML = `${$sessionLength.innerHTML}:00`;
                    min = $sessionLength.innerHTML - 1;
                    sec = 60;
                    $time.style.color = "#BEC0BB";
                }
            }
        }

        $breakDecrement.addEventListener("click", _ => {
            if (!interval) {
                breakDec();
            }
        })
        $breakIncrement.addEventListener("click", _ => {
            if (!interval) {
                breakInc();
            }
        })
        $sessionDecrement.addEventListener("click", _ => {
            if (!interval) {
                seshDec();
            }
        });
        $sessionIncrement.addEventListener("click", _ => {
            if (!interval) {
                seshInc();
            }
        })
    }

    return {
        init
    }

})();

Clock.init();