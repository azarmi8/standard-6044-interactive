const beats=[
['هشدار ایمنی','استاندارد تصریح می‌کند که همه موارد ایمنی مرتبط را بیان نمی‌کند؛ کاربر باید الزامات ایمنی و بهداشتی و محدودیت‌های اجرایی را رعایت و مشخص کند.'],
['هدف استاندارد','هدف، تعیین ویژگی‌های بتن آماده تعریف‌شده در زیر‌بند ۳-۴ است.'],
['الزامات سفارش‌دهنده','اگر سفارش‌دهنده الزامات سخت‌گیرانه‌تری درخواست کند، همان الزامات باید ملاک عمل قرار گیرد؛ اما نباید موجب خروج از الزامات استاندارد شود.'],
['دامنه فرآیند','استاندارد اختلاط، حمل و تحویل بتن آماده را پوشش می‌دهد و برای برخی عملیات پس از تحویل، مسئولیت را در پروژه به خریدار مرتبط می‌کند.'],
['خارج از دامنه','فصل اول صریحاً چند مورد از جمله بتن غلتکی، بتن بدون اسلامپ، بتن مسلح الیافی و بتن تولیدشده با توزین حجمی و اختلاط پیوسته را خارج از دامنه معرفی می‌کند.'],
['زبان مشترک زنجیره','استاندارد رابطه اطلاعاتی میان سفارش‌دهنده، تولیدکننده و مصرف‌کننده را برای سفارش، تولید، حمل، تحویل و کنترل کیفیت بتن آماده مشخص می‌کند.']
];
let i=0,timer=null;
const $=id=>document.getElementById(id);
function render(){ $('title').textContent=beats[i][0]; $('body').textContent=beats[i][1]; $('count').textContent=`${i+1} / ${beats.length}`; $('bar').style.width=`${(i+1)/beats.length*100}%`; }
$('next').onclick=()=>{i=Math.min(beats.length-1,i+1);render()};
$('prev').onclick=()=>{i=Math.max(0,i-1);render()};
$('play').onclick=()=>{if(timer){clearInterval(timer);timer=null;$('play').textContent='پخش';return}timer=setInterval(()=>{if(i===beats.length-1){clearInterval(timer);timer=null;$('play').textContent='پخش';return}i++;render()},4500);$('play').textContent='توقف'};
document.querySelectorAll('.quiz button').forEach(b=>b.onclick=()=>{$('quizResult').textContent=b.dataset.q==='good'?'درست. فصل اول یک زنجیره کامل از سفارش تا تحویل و کنترل کیفیت را در محدوده‌های مشخص تعریف می‌کند.':'این گزینه دامنه فصل اول را بیش از حد محدود می‌کند.';$('quizResult').className=b.dataset.q});
render();
