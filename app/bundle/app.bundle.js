!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const r=n(1),o=n(2),c=new r,i=new o;function u(){if(!0!==c.isOver()&&c.getCounter()<5){let e=i.getQuestions(),t=[],n=e[Math.round(Math.random()*e.length)];c.setCorrectAnswer(n.continent);let r=e.filter(e=>e.continent!==n.continent),o=r[Math.round(Math.random()*r.length)];t.push(o);let u=r.filter(e=>e.continent!==o.continent),a=u[Math.round(Math.random()*u.length)];t.push(a),function(e,t){let n=c.getCounter();0===n&&document.querySelector(".icons").remove();let r=document.querySelector("#game-screen");for(;r.firstChild;)r.removeChild(r.firstChild);c.updateCounter(),n=c.getCounter();let o=document.querySelector("#game-screen"),i=document.querySelector("#info");i.className="in-game",i.textContent=`Question: ${n}`;let u=document.createElement("img");u.className="main__screen__img",u.style="width:90%; min-height:300px",u.src=e.image,o.appendChild(u);let a=document.createElement("button"),l=document.createElement("button"),d=document.createElement("button");a.className="main__screen__button buttonOne",l.className="main__screen__button buttonTwo",d.className="main__screen__button buttonThree";let m=[e,t[0],t[1]],h=m[Math.round(2*Math.random())],f=m.filter(e=>e.continent!==h.continent),p=f[Math.round(Math.random())],g=f.filter(e=>e.continent!==p.continent)[0];a.value=h.continent,l.value=p.continent,d.value=g.continent,a.id=h.continent,l.id=p.continent,d.id=g.continent,a.textContent=h.continent,l.textContent=p.continent,d.textContent=g.continent,a.addEventListener("click",s),l.addEventListener("click",s),d.addEventListener("click",s),o.appendChild(a),o.appendChild(l),o.appendChild(d)}(n,t)}}function s(e){let t,n=e.target.value,r=c.getCorrectAnswer();n===r&&(c.updateScore(750),t=!0);let o=document.createElement("button");o.className="main__screen__next",o.textContent="Next",o.addEventListener("click",u);let i=document.getElementById(`${n}`),s=document.getElementById(`${r}`);t||i.classList.add("wrong-answer"),s.classList.add("correct-answer"),document.querySelector("#game-screen").appendChild(o)}(async function(){const e=await fetch("https://api.myjson.com/bins/a6da9");return await e.json()})().then(e=>{i.setQuestions(e)}),document.querySelector("#play").addEventListener("click",(function(){null!==i.getQuestions()&&u()}))},function(e,t){e.exports=class{constructor(){this.counter=0,this.score=0,this.over=!1,this.correctAnswer=null}updateCounter(){this.counter++}updateScore(e){this.score+=e}getCounter(){return this.counter}getScore(){return this.score}gameOver(){this.over=!0}isOver(){return!0===this.over}getCorrectAnswer(){return this.correctAnswer}setCorrectAnswer(e){this.correctAnswer=e}}},function(e,t){e.exports=class{constructor(){this.questions=null}setQuestions(e){this.questions=e}getQuestions(){return this.questions}}}]);