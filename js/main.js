const example = (/*begin*/) => {
  const SIZE_PART = 5
  const MOD_PART  = 10 ** (SIZE_PART)
  
  const getParts = (num) => {
      let parts = [],
          k = 0;
      while(num > 0){
          k = num % MOD_PART;
          parts.unshift(k)
          num = Math.floor(num / MOD_PART);
      }
      return parts
  }
  
  const mul = (num, num2) => {
      let remain = 0, 
          res = 0, 
          k = 0;
      for (let i = num.length - 1; i >= 0; --i){
          res = num[i] * num2;
          k = (res + remain) % MOD_PART;
          remain = Math.floor(res / MOD_PART);
          num[i] = k;
      }
      if (remain){
          num.unshift(remain); 
      }
      return num
  }
  
  const zeroPad =(num, places) => {
      var zero = places - num.toString().length + 1;
      return String(Array(+(zero > 0 && zero)).join("0") + num);
  }
  
  const joinNum = (num) => {
      let lastNum =num.pop();
      let last ='' + typeof(num[0]) !== 'undefined'? zeroPad(lastNum, SIZE_PART): lastNum;
      let result = '' + typeof(num[0]) !== 'undefined'? num[0]:'';
      let sz = num.length;
      for(let i = 1; i < sz; i++) 
         result += zeroPad(num[i], SIZE_PART);
      result += last
      return result;
  }
  
  const test = (num1, numPow) => {
      let num = num1;
      let value = getParts(num)
      for (let i = numPow; i > 1; --i)
          value = mul(value, num1)
      let result = joinNum(value)
      console.log(`${result}\ncount of symbols: ${result.length} \ncount of used parts: ${value.length}`)
  }
  console.log(test(3, 1000));
/*end*/}

const getListMark = () =>{
   return [{ key:'=>', class: 'blue'},
   { key:'let', class: 'blue'}, 
   { key:'const', class: 'blue'},
   { key:'const', class: 'blue'},
   { key:'typeof', class: 'blue'},
   { key:'toString', class: 'blue'},
   { key:'String', class: 'blue'},
   { key:'Array', class: 'blue'},
   { key:'unshift', class: 'blue'},
   /*{ key:'=', class:  'red'},*/ 
   { key:'>=', class: 'red'}, 
   { key:'>=', class: 'red'},
   /*{ key:'+', class: 'red'},*/
   { key:'+=', class: 'red'},
   { key:'-', class: 'red'},
   { key:'*', class: 'red'},
   { key:'/', class: 'red'},
   /*{ key:'>', class: 'red'},*/
   { key:'%', class: 'red'},
   { key:'?', class: 'red'},
   { key:':', class: 'red'},
   { key:'!=', class: 'red'},
   { key:'!==', class: 'red'},
   { key:'if', class: 'red'},
   { key:'for', class: 'red'},
   { key:'return', class: 'red'},
   { key:'while', class: 'red'},
   { key:'pop', class: 'blue'},
   { key:'console', class: 'emerald'},
   { key:'undefined', class: 'brown'},
   { key:"'", class: 'brown'},
   { key:'Math', class: 'emerald'},
   { key:'\\n', class: 'purple'},
 ]
}

const markup = () =>{
  let source = example.toString().replace(/\(\/\*begin\*\/\) => \{/,''); 
  // prepare text code
  source = source.replace(/\/\*end\*\/}/,''); 
  let textCode =  source;
  textCode = textCode.split('');
  // prepare keyword for synax hilight   
  let listMark = getListMark();
  listMark = listMark.sort((a,b) => a.key.length - b.key.length);
  
  // add span with color class to each keyford
  let bReplased =false 
  for (let i = textCode.length-1; i>=0; --i){
    bReplased = false;
    for (let e = listMark.length-1; e >= 0; --e){
      let element = listMark[e];
      let eLen = element.key.length; 
      if (element.key === textCode.slice(i,i+eLen).join('')){
        textCode.splice(i, eLen, `<span class="${element.class}">${element.key}</span>`);
        bReplased = true;            
        break;  
      } 
    }
    if (bReplased == false){
      switch(textCode.slice(i,i+3).join('')){
        case ' = ':
          textCode.splice(i, 3, `<span class="${'red'}">${' = '}</span>`);
          break; 
        case ' > ':
          textCode.splice(i, 3, `<span class="${'red'}">${' > '}</span>`);
          break;
        case ' + ':
          textCode.splice(i, 3, `<span class="${'red'}">${' + '}</span>`);
          break;
        }  
    }
  
  let code = document.getElementsByTagName('code')[0];
  code.innerHTML = textCode.join('');
  }
}

markup();
