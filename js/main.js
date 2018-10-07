// example function for show it on the page
const example = (/*begin*/) => {
  
  /* This code can calculate 3 ^ 1000000 in 7 minutes */
  /* on my old laptop and display this number in the usual way. */

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
      for(let i = num.length - 1; i >= 0; --i){
          res = num[i] * num2;
          k = (res + remain) % MOD_PART;
          remain = Math.floor(res / MOD_PART);
          num[i] = k;
      }
      if(remain){
          num.unshift(remain); 
      }
      return num
  }
  
  const zeroPad = (num, places) => {
      let zero = places - num.toString().length + 1;
      return String(Array(+(zero > 0 && zero)).join("0") + num);
  }
  
  const joinNum = (num) => {
      let lastNum =num.pop();
      let last = '' + typeof num[0] !== 'undefined'? zeroPad(lastNum, SIZE_PART): lastNum;
      let result = '' + typeof num[0] !== 'undefined'? num[0]:'';
      let sz = num.length;
      for(let i = 1; i < sz; i++) 
         result += zeroPad(num[i], SIZE_PART);
      result += last
      return result;
  }
  
  const test = (num1, numPow) => {
      let num = num1;
      let value = getParts(num);
      for(let i = numPow; i > 1; --i)
          value = mul(value, num1);
      let result = joinNum(value);
      console.log(`${result}\ncount of symbols: ${result.length} \ncount of used parts: ${value.length}`);
  }

  test(3, 1000000);
/*end*/}

function toggleCodeEvent (event){
  // toggle button
  let button = event.currentTarget;
  button.innerText= (button.innerText ==='expand') ? 'shrink': 'expand';
  // toggle code
  let code = document.getElementById('code_example');
  code.style.display = (code.style.display === 'block') ? 'none': 'block' ;
}

const toggleCodeEventSet = () =>{
    document.getElementById('toggle_show').onclick = toggleCodeEvent;
}

const getListMark = () =>{
   return [
   { key:'String', class: 'blue', mask:/([^<\w])?(String)([^<])/g}, 
   { key:'toString', class: 'blue', mask:/([^>])?(toString)([^<])/g},  
   { key:'=>', class: 'blue' , mask:/([^<\w])?(=>)([^<])/g},
   { key:'let', class: 'blue' , mask:/([^<\w])?(let)([^<])/g}, 
   { key:'const', class: 'blue' , mask:/([^<\w])?(const)([^<])/g},
   { key:'typeof', class: 'blue' , mask:/([^<\w])?(typeof)([^<])/g},
   { key:'Array', class: 'blue', mask:/([^<\w])?(Array)([^<])/g},
   { key:'unshift', class: 'blue', mask:/([^>])?(unshift)([^<])/g},
   { key:'pop', class: 'blue' , mask:/([^>])?(pop)([^<])/g},
   { key:' = ', class:  'red' ,mask:/([^<\w])?( = )([^<])/g},
   { key:' >= ', class: 'red', mask:/([^<\w])?( >= )([^<])/g},
   { key:'++', class: 'red', mask:/([^<\w])?(\+\+)([^<])/g},
   { key:'--', class: 'red', mask:/([^<\w])?(\-\-)([^<])/g},
   { key:' + ', class: 'red', mask:/([^<\w])?( \+ )([^<])/g},
   { key:' += ', class: 'red', mask:/([^<\w])?( \+= )([^<])/g},
   { key:' - ', class: 'red',  mask:/([^<\w])?( - )([^<])/g},
   { key:' * ', class: 'red',  mask:/([^<\w])?( [*] )([^<])/g},
   { key:' / ', class: 'red' , mask:/([^<\w])?( \/ )([^<])/g},
   { key:' > ', class: 'red', mask:/([^<\w])?( > )([^<])/g},
   { key:' && ', class: 'red', mask:/([^<\w])?( && )([^<])/g},
   { key:' % ', class: 'red', mask:/([^<\w])?( % )([^<])/g},
   { key:' ? ', class: 'red', mask:/([^<\w])?( [?] )([^<])/g},
   { key:' : ', class: 'red', mask:/([^<\w])?( : )([^<])/g},
   { key:' != ', class: 'red', mask:/([^<\w])?( != )([^<])/g},
   { key:' !== ', class: 'red', mask:/([^<\w])?( !== )([^<])/g},
   { key:'if', class: 'red', mask:/([^<\w])?( if )([^<])/g},
   { key:'for', class: 'red', mask:/([^<\w])?(for)([^<])/g},
   { key:'return', class: 'red', mask:/([^<\w])?(return)([^<])/g},
   { key:'while', class: 'red', mask:/([^<\w])?(while)([^<])/g},
   { key:'console', class: 'emerald', mask:/([^<\w])?(console)([^<])/g},
   { key:'undefined', class: 'brown', mask:/([^<\w])?(undefined)([^<])/g},
   { key:"'", class: 'brown',mask:/([^<\w])?(')([^<])/g},
   { key:'$', class: 'brown', mask:/([^>])?(\$)([^<])/g},
   { key:'Math', class: 'emerald', mask:/([^>\w])Math($)([^<])/g},
   { key:'\\n', class: 'purple',mask:/([^>])(\\n)([^<])/g},
  ]
 }

// function for highlight syntax
const markup = () =>{
  // prepare text code
  let source = example.toString().replace(/\(\/\*begin\*\/\) => \{/,''); 
  source = source.replace(/\/\*end\*\/}/,''); 
  let textCode =  source;
  // prepare keyword for highlight syntax
  let listMark = getListMark();
  listMark = listMark.sort((a,b) => a.key.length - b.key.length);
  
  for (let e = listMark.length-1; e >= 0; --e){
    let element = listMark[e];
    textCode = textCode.replace(element.mask,`$1<span class=${element.class}>${element.key}</span>$3`);
  }
  textCode = textCode.replace(/(\/*)(.*)(\*\/)/g ,`$1<span class="green">$2</span>$3`);
  /(\/*)(.*)(\*\/)/
  let code = document.getElementsByTagName('code')[0];
  code.innerHTML = textCode;
}

toggleCodeEventSet();
markup();
