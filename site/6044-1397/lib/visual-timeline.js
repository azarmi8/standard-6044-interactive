/* 6044 Visual Engine v2 — deterministic visual timeline primitive */
(function(){
  'use strict';
  class VisualTimeline{
    constructor({length=1,duration=2000,onStep=()=>{},onStop=()=>{}}={}){
      this.length=Math.max(1,Number(length)||1);
      this.duration=Math.max(250,Number(duration)||2000);
      this.onStep=onStep; this.onStop=onStop;
      this.index=0; this.playing=false; this.timer=null;
    }
    set(i,instant=false){
      this.index=Math.max(0,Math.min(this.length-1,Number(i)||0));
      this.onStep(this.index,instant);
      return this.index;
    }
    play(){
      this.stop(false);
      this.playing=true;
      this.set(0,true);
      this.timer=window.setInterval(()=>{
        if(this.index>=this.length-1){this.stop(true);return;}
        this.set(this.index+1,false);
      },this.duration);
    }
    pause(){this.stop(true)}
    stop(notify=true){
      this.playing=false;
      if(this.timer){window.clearInterval(this.timer);this.timer=null;}
      if(notify)this.onStop();
    }
    reset(){this.stop(false);this.set(0,true);}
  }
  window.VisualTimeline=VisualTimeline;
})();