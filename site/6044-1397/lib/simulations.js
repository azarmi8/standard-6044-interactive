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

window.SimulationEngine.ch08 = {
  id: 'ch08-sampling-15-85',
  source: { chapter: 8, clauses: ['8-3'], pages: '21–22' },
  validate(input) {
    if(!input || !Number.isFinite(input.firstPercent) || !Number.isFinite(input.secondPercent) || !Number.isFinite(input.intervalMinutes))
      return 'درصدهای نمونه‌برداری و فاصله زمانی را کامل وارد کنید.';
    if(input.firstPercent<0 || input.firstPercent>100 || input.secondPercent<0 || input.secondPercent>100 || input.intervalMinutes<0)
      return 'مقادیر واردشده خارج از دامنه معتبر هستند.';
    return null;
  },
  calculate(input) {
    const error=this.validate(input);
    if(error) return {valid:false,error};
    const firstAt15=input.firstPercent===15;
    const secondAt85=input.secondPercent===85;
    const intervalOK=input.intervalMinutes<=15;
    return {valid:true,firstAt15,secondAt85,intervalOK,pass:firstAt15&&secondAt85&&intervalOK};
  },
  testCases:[
    {input:{firstPercent:15,secondPercent:85,intervalMinutes:15},pass:true},
    {input:{firstPercent:15,secondPercent:85,intervalMinutes:16},pass:false},
    {input:{firstPercent:14,secondPercent:85,intervalMinutes:10},pass:false},
    {input:{firstPercent:15,secondPercent:84,intervalMinutes:10},pass:false}
  ]
};

window.SimulationEngine.ch07 = {
  id: 'ch07-delivery-temperature',
  source: { chapter: 7, clauses: ['7-12'], table: '1', pages: '19–20' },
  minimumTemperatureForDimension(mm) {
    if(!Number.isFinite(mm) || mm<=0) return null;
    if(mm<300) return 13;
    if(mm<=900) return 10;
    if(mm<=1800) return 7;
    return 5;
  },
  calculate(input) {
    if(!input || !Number.isFinite(input.memberDimensionMm) || !Number.isFinite(input.deliveryTemperatureC))
      return {valid:false,error:'کوچک‌ترین بُعد عضو و دمای تحویل را وارد کنید.'};
    if(input.memberDimensionMm<=0) return {valid:false,error:'کوچک‌ترین بُعد عضو باید بزرگ‌تر از صفر باشد.'};
    const min=this.minimumTemperatureForDimension(input.memberDimensionMm);
    const max=32;
    return {
      valid:true,
      minimumC:min,
      maximumC:max,
      minimumOK:input.deliveryTemperatureC>=min,
      maximumOK:input.deliveryTemperatureC<=max,
      pass:input.deliveryTemperatureC>=min && input.deliveryTemperatureC<=max
    };
  },
  testCases:[
    {input:{memberDimensionMm:250,deliveryTemperatureC:13},pass:true,minimumC:13},
    {input:{memberDimensionMm:600,deliveryTemperatureC:10},pass:true,minimumC:10},
    {input:{memberDimensionMm:1200,deliveryTemperatureC:6},pass:false,minimumC:7},
    {input:{memberDimensionMm:2000,deliveryTemperatureC:5},pass:true,minimumC:5},
    {input:{memberDimensionMm:600,deliveryTemperatureC:33},pass:false,minimumC:10}
  ]
};

window.SimulationEngine.specimen = {
  id: 'ch11-specimen-preparation-traceability',
  source: { chapter: 11, clauses: ['11-1'], pages: '28–30', references: ['ISIRI 1608-2','ISIRI 1608-3'] },
  calculate(input) {
    if(!input) return {valid:false,error:'اطلاعات نمونه وارد نشده است.'};
    const fields=[
      ['sampleId','شناسه نمونه'],
      ['truckId','شناسه کامیون'],
      ['placementLocation','محل بتن‌ریزی'],
      ['samplingLocation','محل نمونه‌برداری']
    ];
    const missing=fields.filter(([key])=>!String(input[key]??'').trim()).map(([,label])=>label);
    if(!Number.isInteger(input.specimenCount) || input.specimenCount<2)
      return {valid:false,error:'هر نوبت نمونه‌برداری باید حداقل دو آزمونه استاندارد داشته باشد.'};
    return {
      valid:true,
      specimenCount:input.specimenCount,
      traceabilityComplete:missing.length===0,
      missing,
      preparationStandard:'ISIRI 1608-2',
      testingStandard:'ISIRI 1608-3',
      ready:missing.length===0
    };
  },
  testCases:[
    {input:{sampleId:'S-01',truckId:'T-21',placementLocation:'فونداسیون F1',samplingLocation:'خروجی کامیون',specimenCount:2},ready:true},
    {input:{sampleId:'S-02',truckId:'T-22',placementLocation:'ستون C4',samplingLocation:'',specimenCount:2},ready:false},
    {input:{sampleId:'S-03',truckId:'T-23',placementLocation:'دال D2',samplingLocation:'خروجی کامیون',specimenCount:1},valid:false}
  ]
};