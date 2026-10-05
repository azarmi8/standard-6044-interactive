(function(){
  'use strict';
  window.AppendixDG = {
    productionControl:{
      categories:[
        {id:'materials',label:'مواد و مصالح',source:'پیوست د، جدول د-۲'},
        {id:'equipment',label:'وسایل و تجهیزات',source:'پیوست د، جدول د-۳'},
        {id:'production',label:'روش‌های تولید و خواص بتن',source:'پیوست د، جدول د-۴'},
        {id:'records',label:'سوابق و مستندات',source:'پیوست د، الزامات سامانه کنترل تولید'}
      ],
      check(input){
        const missing=this.categories.filter(x=>!input?.[x.id]).map(x=>x.label);
        return {valid:true,complete:missing.length===0,missing};
      }
    },
    highStrength:{
      categories:[
        {id:'supplier',label:'شواهد تأمین‌کننده مواد',source:'پیوست هـ، جدول هـ-۱'},
        {id:'admixture',label:'کنترل افزودنی‌ها',source:'پیوست هـ، جدول هـ-۱'},
        {id:'powder',label:'کنترل مواد مکمل پودری',source:'پیوست هـ، جدول هـ-۱'},
        {id:'production',label:'کنترل تکمیلی تولید',source:'پیوست هـ، جدول هـ-۱ و هـ-۲'}
      ],
      check(input){
        const missing=this.categories.filter(x=>!input?.[x.id]).map(x=>x.label);
        return {valid:true,complete:missing.length===0,missing};
      }
    },
    auditLifecycle:{
      check(input){
        const order=Array.isArray(input)?input:input?.order;
        const auditType=Array.isArray(input)?null:input?.auditType;
        const auditOk=auditType==='periodic'||auditType==='extraordinary';
        const expected=['initial','audit','corrective','review'];
        const valid=Array.isArray(order)&&order.length===4&&order.every((v,i)=>v===expected[i])&&auditOk;
        return {valid:true,pass:valid,auditType,expected};
      }
    },
    changeMap:{
      categories:[
        {id:'deleted',label:'حذف‌شده',description:'در نقشه تغییرات، مواردی که از ساختار نسخه مرجع حذف شده‌اند.'},
        {id:'replaced',label:'جایگزین/جابه‌جاشده',description:'مواردی که متن یا محل آن‌ها در ساختار استاندارد ملی تغییر کرده است.'},
        {id:'added',label:'اضافه‌شده',description:'مواردی که برای نیاز استاندارد ملی به ساختار اضافه شده‌اند.'}
      ],
      describe(id){return this.categories.find(x=>x.id===id)||null;}
    }
  };
})();