// Shared deterministic simulation primitives for Standard 6044.
window.SimulationEngine = window.SimulationEngine || {};
window.SimulationEngine.ch11 = {
  id: 'ch11-compressive-conformity',
  source: { chapter: 11, clauses: ['11-1','11-2'], pages: '28–30' },
  validate(input) {
    if (!input || !Number.isFinite(input.fc) || input.fc <= 0) return 'fc باید بزرگ‌تر از صفر باشد.';
    if (!Array.isArray(input.results) || input.results.length !== 3 || input.results.some(v => !Number.isFinite(v))) {
      return 'دقیقاً سه نتیجه عددی لازم است.';
    }
    return null;
  },
  calculate(input) {
    const error = this.validate(input);
    if (error) return { valid:false, error };
    const mean = input.results.reduce((a,b)=>a+b,0)/3;
    const limit = 0.9 * input.fc;
    const meanOK = mean >= input.fc;
    const individualOK = input.results.every(v => v >= limit);
    return { valid:true, mean, limit, meanOK, individualOK, pass: meanOK && individualOK };
  },
  testCases: [
    { input:{fc:30,results:[29,31,30]}, pass:true, mean:30 },
    { input:{fc:30,results:[26,31,30]}, pass:false, mean:29 },
    { input:{fc:30,results:[27,30,30]}, pass:true, mean:29 },
    { input:{fc:30,results:[20,40,40]}, pass:false, mean:33.333333333333336 }
  ]
};

window.SimulationEngine.ch10 = {
  id: 'ch10-fresh-concrete',
  source: { chapter: 10, clauses: ['10-1','10-5'], pages: '24–28' },
  slumpClasses: {
    S1:{mean:25,min:10,max:40}, S2:{mean:70,min:50,max:90},
    S3:{mean:125,min:100,max:150}, S4:{mean:185,min:160,max:210}
  },
  flowClasses: {
    SF0:{mean:500,min:450,max:550}, SF1:{mean:600,min:560,max:650},
    SF2:{mean:700,min:660,max:750}, SF3:{mean:800,min:760,max:850}
  },
  classifySlump(mm) {
    if(!Number.isFinite(mm)) return null;
    return Object.entries(this.slumpClasses).find(([,r])=>mm>=r.min && mm<=r.max)?.[0] || null;
  },
  classifyFlow(mm) {
    if(!Number.isFinite(mm)) return null;
    return Object.entries(this.flowClasses).find(([,r])=>mm>=r.min && mm<=r.max)?.[0] || null;
  },
  density(measured, specified) {
    if(!Number.isFinite(measured)||!Number.isFinite(specified)) return {valid:false,error:'هر دو مقدار چگالی لازم است.'};
    const difference=Math.abs(measured-specified);
    return {valid:true,difference,limit:25,pass:difference<=25};
  },
  testCases: [
    {kind:'slump',input:25,expected:'S1'},
    {kind:'slump',input:90,expected:'S2'},
    {kind:'slump',input:151,expected:null},
    {kind:'flow',input:600,expected:'SF1'},
    {kind:'flow',input:850,expected:'SF3'},
    {kind:'flow',input:855,expected:null},
    {kind:'density',input:{measured:2400,specified:2420},pass:true},
    {kind:'density',input:{measured:2390,specified:2420},pass:false}
  ]
};