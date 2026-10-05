window.BOOK_CONFIG={
  interval:5000,
  beats:[
    {title:'آب مؤثر',body:'آب مؤثر یکی از اصطلاحات پایه فصل سوم است و برای فهم آب کل و نسبت‌های اختلاط اهمیت دارد.',sourceRef:'فصل ۳، بند ۳-۱'},
    {title:'آب کل و آزمون اولیه',body:'فصل سوم بین آب مؤثر، آب کل و مفهوم آزمون اولیه تمایز می‌گذارد تا زبان مشترک طراحی و کنترل شکل بگیرد.',sourceRef:'فصل ۳، بندهای ۳-۲ و ۳-۳'},
    {title:'انواع بتن',body:'تعریف بتن آماده و انواع روش‌های اختلاط و بتن‌های ویژه در این فصل پایه مفهومی فصل‌های بعد هستند.',sourceRef:'فصل ۳، بندهای ۳-۴ تا ۳-۱۱'},
    {title:'تجهیزات و تحویل',body:'تجهیزات همزن، زمان تحویل، کامیون مخلوط‌کن و محل تحویل نیز تعریف‌های عملیاتی استاندارد هستند.',sourceRef:'فصل ۳، بندهای ۳-۱۲ تا ۳-۱۵'},
    {title:'تعریف را به QC وصل کن',body:'تعریف خوب زمانی ارزش دارد که در سفارش، تولید، حمل، نمونه‌برداری، آزمون و ثبت سوابق قابل استفاده باشد.',sourceRef:'فصل ۳ + ارتباط با فصل‌های ۵ تا ۱۲'}
  ],
  scene:{root:'.stage',steps:[
    {className:'water',focus:{x:50,y:42},progress:.20,show:['water']},
    {className:'mix-water',focus:{x:50,y:48},progress:.40,show:['water','total-water']},
    {className:'concrete-types',focus:{x:50,y:53},progress:.60,show:['total-water','types']},
    {className:'equipment',focus:{x:50,y:56},progress:.80,show:['types','equipment']},
    {className:'qc-link',focus:{x:50,y:60},progress:1,show:['equipment','qc-link']}
  ]},
  quiz:{
    correct:'درست — اصطلاح باید در زنجیره واقعی QC قابل استفاده و ردیابی باشد.',
    incorrect:'کافی نیست — حفظ تعریف بدون ارتباط با فرآیند، یادگیری عملی را ناقص می‌کند.'
  },
  onRender(index,beat){
    const s=document.getElementById('sourceRef');
    if(s)s.textContent=beat.sourceRef||'';
  }
};