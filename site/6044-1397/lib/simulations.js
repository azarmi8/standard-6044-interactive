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