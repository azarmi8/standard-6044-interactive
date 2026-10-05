(function(){
  'use strict';
  window.AppendixSimulations = {
    uniformity: {
      thresholds: {
        densityNoAir:{label:'چگالی بدون حباب هوا',unit:'kg/m³',limitPct:10,basis:'میانگین دو مقدار'},
        air:{label:'درصد حباب هوا',unit:'%',limitPct:20,basis:'میانگین دو مقدار'},
        slump:{label:'اسلامپ',unit:'mm',limitPct:20,basis:'میانگین دو مقدار'},
        coarseAggregate:{label:'درصد سنگدانه درشت',unit:'%',limitPct:6,basis:'اختلاف نسبی آموزشی'},
        compressiveAverage:{label:'مقاومت فشاری متوسط',unit:'MPa',limitPct:7.5,basis:'اختلاف نسبی آموزشی'}
      },
      compare(feature,a,b){
        const cfg=this.thresholds[feature];
        if(!cfg)return {valid:false,error:'ویژگی انتخاب‌شده معتبر نیست.'};
        if(!Number.isFinite(a)||!Number.isFinite(b)||a<=0||b<=0)
          return {valid:false,error:'هر دو مقدار باید عدد مثبت باشند.'};
        const mean=(a+b)/2;
        const diffPct=Math.abs(a-b)/mean*100;
        return {valid:true,feature,label:cfg.label,a,b,mean,diffPct,limitPct:cfg.limitPct,pass:diffPct<=cfg.limitPct,unit:cfg.unit,basis:cfg.basis};
      }
    },
    air:{
      values:{
        '9.5':{moderate:4.5,severe:5.5},
        '12.5':{moderate:4.5,severe:6},
        '19':{moderate:5,severe:6},
        '25':{moderate:5.5,severe:7},
        '37.5':{moderate:6,severe:7.5}
      },
      lookup(size,exposure){
        const row=this.values[String(size)];
        if(!row||row[exposure]===undefined)return {valid:false,error:'اندازه سنگدانه یا شرایط رویارویی معتبر نیست.'};
        return {valid:true,sizeMm:Number(size),exposure,targetAirPct:row[exposure]};
      }
    }
  };
})();