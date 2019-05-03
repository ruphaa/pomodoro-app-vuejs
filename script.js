new Vue({
    el: "#app",
    data: {
      message: "Let the countdown begin!",
      sessionTime: 25,
      breakTime: 5,
      sessionInterval: null,
      status: "START",
      totalTime: (25 * 60),
      sound: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
      state: "timer",
      isBreak: false
    },
    computed: {
      time: function() {
        return this.minutes + ":" + this.seconds;
      },
      minutes: function() {
        var min = Math.floor(this.totalTime / 60);
        return min >= 10 ? min : '0' + min;
      },
      seconds: function() {
        var sec = Math.floor(this.totalTime % 60);
        return sec >= 10 ? sec : '0' + sec;
      }
      
    },
    methods: {
      // starts, pauses and resumes the timer
      startStopTimer: function() {
        if(this.sessionInterval === null && this.status == "START") {
          this.sessionInterval = setInterval(this.calculateTimer, 1000);
        this.message = "Only you can change your life!";
        this.status = "PAUSE";
        } else if(this.sessionInterval !== null && this.status == "PAUSE") {
          clearInterval(this.sessionInterval);
          this.sessionInterval = null;
          this.message = "Never quit! Keep going \\o/";
          this.status = "RESUME";
        } else if(this.sessionInterval === null && this.status == "RESUME"){
          this.sessionInterval = setInterval(this.calculateTimer, 1000);
          this.message = "Only you can change your life!";
          this.status = "PAUSE";
        }
      },
      // changes the interval state based on whether it is session or break
      changeState: function() {
        if(this.state == "break")
          this.totalTime = this.breakTime * 60;
      },
      // resets the timer to initial session duration
      resetTimer: function() {
        this.message = "Let the countdown begin!";
        if (this.sessionInterval !== null) {
          clearInterval(this.sessionInterval);
          this.sessionInterval = null;
        }
        this.status = "START";
        this.totalTime = this.sessionTime * 60;
      },
      calculateTimer: function() {
        if(this.totalTime > 0)
          this.totalTime--;   
        else {
          if(this.state == "break") {
            if (this.sessionInterval !== null) {
              clearInterval(this.sessionInterval);
              this.sessionInterval = null;
            }
            this.totalTime = this.sessionTime * 60;
            this.state= "timer";
            this.message= "Yaay! You have completed a pomodoro successfully :) ";
            
          } else {
            this.playSound();
            this.sound = null;
            this.state = "break";
            this.changeState();
          }
          this.status = "START";
        }
      },
      // increments the duration length of both break and session
      incrementTime: function(isSession) {
        if(isSession) 
          this.sessionTime >= 60 ? this.sessionTime : this.sessionTime ++;
        else 
          this.breakTime >= 60 ? this.breakTime : this.breakTime ++;
        this.totalTime = this.sessionTime * 60;
      },
      
      // decrements the duration length of both break and session
      decrementTime: function(isSession) {
        if(isSession) 
          this.sessionTime <= 1 ? this.sessionTime : this.sessionTime --;
        else 
          this.breakTime <= 1 ? this.breakTime : this.breakTime --;
          this.totalTime = this.sessionTime * 60;
      },
       playSound: function() {
         if(this.sound) {
          var audio = new Audio(this.sound);
          audio.currentTime=0;
          audio.play();
        }
       }
    }
  });