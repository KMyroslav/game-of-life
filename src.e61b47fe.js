parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
let t,e,n,o=0;const l=document.querySelector(".btn"),r=document.querySelector(".btn-reset");let c=document.querySelector(".canvas"),i=document.querySelector(".canvas").getContext("2d");const f=12,a=c.clientWidth-c.clientWidth%f,u=c.clientHeight-c.clientHeight%f,s=a/f,h=u/f;function d(t,e,n){let o=0;return o+=0===e&&0===t?n[t][e+1][2]+n[t+1][e][2]+n[t+1][e+1][2]:e===h-1&&0===t?n[t+1][e][2]+n[t][e-1][2]+n[t+1][e-1][2]:0===e&&t===s-1?n[t][e+1][2]+n[t-1][e][2]+n[t-1][e+1][2]:e===h-1&&t===s-1?n[t][e-1][2]+n[t-1][e][2]+n[t-1][e-1][2]:0===t&&0!==e&&e!==h-1?n[t][e-1][2]+n[t][e+1][2]+n[t+1][e-1][2]+n[t+1][e][2]+n[t+1][e+1][2]:0===e&&0!==t&&t!==s-1?n[t-1][e][2]+n[t-1][e+1][2]+n[t][e+1][2]+n[t+1][e][2]+n[t+1][e+1][2]:t===s-1&&0!==e&&e!==h-1?n[t-1][e-1][2]+n[t-1][e][2]+n[t-1][e+1][2]+n[t][e-1][2]+n[t][e+1][2]:e===h-1&&0!==t&&t!==s-1?n[t-1][e-1][2]+n[t-1][e][2]+n[t][e-1][2]+n[t+1][e-1][2]+n[t+1][e][2]:n[t-1][e-1][2]+n[t-1][e][2]+n[t-1][e+1][2]+n[t][e-1][2]+n[t][e+1][2]+n[t+1][e-1][2]+n[t+1][e][2]+n[t+1][e+1][2]}function m(){const t=new Array(s);for(let e=0;e<s;e+=1)t[e]=new Array(h);for(let e=0;e<s;e+=1)for(let n=0;n<h;n+=1){let o=0;t[e][n]=[e,n,o]}for(let e=0;e<s;e+=1)for(let n=0;n<h;n+=1)t[e][n].push(d(e,n,t)),i.fillStyle=`rgb(\n          0,\n          0,\n          ${Math.floor(255*Math.random())})`,1===t[e][n][2]&&i.fillRect(e*f,n*f,f,f),0===t[e][n][2]&&i.clearRect(e*f,n*f,f,f);return t}c.setAttribute("style",`width:${a}px; height:${u}px`),c.setAttribute("width",`${a}`),c.setAttribute("height",`${u}`),c.onmousemove=function(t){e=Math.floor(t.offsetX/f),n=Math.floor(t.offsetY/f)},c.onmousedown=function(){y[e][n][2]=0===y[e][n][2]?1:0,i.fillStyle=`rgb(\n          0,\n          0,\n          ${Math.floor(255*Math.random())})`,1===y[e][n][2]&&i.fillRect(e*f,n*f,f,f),0===y[e][n][2]&&i.clearRect(e*f,n*f,f,f),console.log(y[e][n][2])};let y=m();function g(){const t=[...y];for(let e=0;e<s;e+=1)for(let n=0;n<h;n+=1){let o=d(e,n,t);o<2?y[e][n][2]=0:o>3?y[e][n][2]=0:1===y[e][n][2]&&2===o||1===y[e][n][2]&&3===o?y[e][n][2]=1:0===y[e][n][2]&&3===o&&(y[e][n][2]=1),1===y[e][n][2]&&(i.fillStyle=`rgb(\n            0,\n            0,\n            ${Math.floor(255*Math.random())})`,i.fillRect(e*f,n*f,f,f)),0===y[e][n][2]&&i.clearRect(e*f,n*f,f,f)}}function S(){(o=0===o?1:0)?(t=setInterval(g,75),l.textContent="Stop"):(clearInterval(t),l.textContent="Start")}function b(){y=m()}l.addEventListener("click",S),r.addEventListener("click",b);
},{}]},{},["Focm"], null)
//# sourceMappingURL=/game-of-life/src.e61b47fe.js.map