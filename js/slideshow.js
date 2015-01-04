var slideshow   = document.getElementById('slideshow');
var leftArrow   = document.getElementById('leftArr');
var rightArrow  = document.getElementById('rightArr');
var memberName  = document.getElementById('member-name');
var memberRole  = document.getElementById('member-role');
var memberImage = document.getElementById('member-image');

var jsonMembers = 'data/members.json';

var memberList    = [];
var currentMember = 0;
var transition = 150;


var Slider = {
    initHandlers: function() {
        this.init();
        leftArrow.addEventListener('click', this.slideLeft.bind(this), false);
        rightArrow.addEventListener('click', this.slideRight.bind(this), false);
    },

    init: function() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                memberList = JSON.parse(xhr.responseText);

                var currentIndex = memberList.length;
                var temporaryValue;
                var randomIndex;

                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    temporaryValue = memberList[currentIndex];
                    memberList[currentIndex] = memberList[randomIndex];
                    memberList[randomIndex] = temporaryValue;
                }

                memberName.innerHTML = memberList[0].name;
                memberRole.innerHTML = memberList[0].role;
                memberImage.style.opacity = 0;
                memberImage.setAttribute('style', 'background: url("' + memberList[0].picture + '") no-repeat center center; background-size: cover;');
                memberImage.style.opacity = 1;
            }
        };
        xhr.open('GET', jsonMembers, true);
        xhr.send();
    },

    slideLeft: function() {
        if (memberList.length > 0) {
            var previousMember = this.setCurrentMember(currentMember, false);
            memberName.innerHTML = memberList[previousMember].name;
            memberRole.innerHTML = memberList[previousMember].role;
            memberImage.style.opacity = 0;
            setTimeout(function() {
                memberImage.setAttribute('style', 'background: url("' + memberList[previousMember].picture + '") no-repeat center center; background-size: cover;');
                memberImage.style.opacity = 1;
            }, transition);
        } else {
            this.init();
        }
    },

    slideRight: function() {
        if (memberList.length > 0) {
            var nextMember = this.setCurrentMember(currentMember, true);
            memberName.innerHTML = memberList[nextMember].name;
            memberRole.innerHTML = memberList[nextMember].role;
            memberImage.style.opacity = 0;
            setTimeout(function() {
                memberImage.setAttribute('style', 'background: url("' + memberList[nextMember].picture + '") no-repeat center center; background-size: cover;');
                memberImage.style.opacity = 1;
            }, transition);
        } else {
            this.init();
        }
    },

    setCurrentMember: function(number, next) {
        var numberOfElements = memberList.length - 1;
        if (next === true) {
            if (number != numberOfElements) {
                currentMember++;
            } else {
                currentMember = 0;
            }
        } else {
            if (number != 0) {
                currentMember--;
            } else {
                currentMember = numberOfElements;
            }
        }
        return currentMember;
    }

};

Slider.initHandlers();

