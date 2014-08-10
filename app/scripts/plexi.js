"use strict";var plexi={createGame:function(r){return new plexi.Game(r)},extend:function(r,t){for(var e in t)r[e]=t[e]},partial:function(r){var t=Array.prototype.slice,e=t.call(arguments,1);return function(){return r.apply(this,e.concat(t.call(arguments,0)))}}};
"use strict";var plexi=plexi||{},Body=function(t,i){plexi.extend(this,t.constants),plexi.extend(this,i)};Body.prototype.update=function(t){this.vx&&this.vy&&(this.x=this.x+this.vx*t,this.y=this.y+this.vy*t,(this.x>1||this.x<-1)&&(this.vx*=-1),(this.y>1||this.y<-1)&&(this.vy*=-1))},Body.prototype.shift=function(t,i){return this.x+t>this.maxX||this.x+t<this.minX||this.y+i>this.maxY||this.y+i<this.minY?(console.log("out of bounds"),this):(this.x+=t,this.y+=i,this)},plexi.Body=Body;
"use strict";var plexi=plexi||{},BodyType=function(t,s){this.id=t,this.props=[],this.constants={},this.children=[];for(var n in s)"props"===n?this.props=s.props:"paint"===n?this.paint=s.paint:this.constants[n]=s[n];this.constants.minX=this.constants.minX||-1,this.constants.maxX=this.constants.maxX||1,this.constants.minY=this.constants.minY||-1,this.constants.maxY=this.constants.maxY||1};BodyType.prototype.create=function(t){for(var s=0,n=this.props.length;n>s;s++){var i=this.props[s];if(!t.hasOwnProperty(i))return!1}var o=new plexi.Body(this,t);return this.children.push(o),o},BodyType.prototype.draw=function(t,s){this.paint.call(s,t)},BodyType.prototype.drawAll=function(t){var s=this;this.children.forEach(function(n){s.draw(t,n)})},plexi.BodyType=BodyType;
"use strict";var plexi=plexi||{},translate=function(t,i,s,h){return{x:(s+1)/2*t,y:(h+1)/2*i}},Canvas=function(t,i){this.name=t,this.canvas=document.getElementById(t),this.ctx=this.canvas.getContext("2d"),this.$parent=$(this.canvas).parent(),this.aspect=i.aspect||.66,this.reset()};Canvas.prototype.reset=function(){this.width=this.$parent.width()-20,this.canvas.width=this.width,this.height=this.width*this.aspect,this.canvas.height=this.height,this.transFn=plexi.partial(translate,this.width,this.height)},Canvas.prototype.clear=function(){this.ctx.clearRect(0,0,this.width,this.height)},Canvas.prototype.drawRect=function(t,i,s,h){var a=this.transFn(t,i);this.ctx.beginPath(),this.ctx.rect(a.x,a.y,s,h),this.ctx.closePath(),this.ctx.fill()},Canvas.prototype.drawCircle=function(t,i,s){var h=this.transFn(t,i);this.ctx.beginPath(),this.ctx.arc(h.x,h.y,s,0,6.28,0),this.ctx.fillStyle="black",this.ctx.closePath(),this.ctx.fill()},plexi.Canvas=Canvas;
"use strict";var plexi=plexi||{},Engine=function(i){this.game=i};plexi.Engine=Engine;
"use strict";var $,plexi=plexi||{},Game=function(t){this.id=t,this._vars={},this._actions={},this._canvii={},this._bodyTypes={},this._keyListeners={},this._namedBodies={},this._world=new plexi.World,void 0!==$&&(this.$div=$("#"+t))};Game.prototype.vars=function(t){for(var i in t)this._vars[i]=t[i]},Game.prototype.var=function(t,i){return void 0===i?this._vars[t]:void(this._vars[t]=i)},Game.prototype.controls=function(t){for(var i in t){var e=t[i],o=this.$div.find("#"+i);o.val(this._vars[e])}},Game.prototype.actions=function(t){for(var i in t){var e=t[i];this._actions[i]=e}var o=this;this.$div.on("click",".btn",function(){o._actions[$(this).attr("id")](o)})},Game.prototype.keyboard=function(t){for(var i in t)this._keyListeners[i]=t[i];var e=this;window.onkeypress=function(t){e.findKeyListener(t)},window.onkeydown=function(t){e.findKeyListener(t)}},Game.prototype.findKeyListener=function(t){var i=this._keyListeners[t.keyCode];i&&(i(this),t.preventDefault())},Game.prototype.findBody=function(t){var i=this._namedBodies[t];return i?i:null},Game.prototype.canvas=function(t,i){var e=new plexi.Canvas(t,i);this._canvii[t]=e,this.mainCanvas=e},Game.prototype.bootstrap=function(t){this.bootstrapFn=t.bind(this),this.restart()},Game.prototype.restart=function(){this.stop(),this.reset(),this.bootstrapFn()},Game.prototype.reset=function(){this._world.reset()},Game.prototype.update=function(t){this._world.bodies.forEach(function(i){i.update(t)})},Game.prototype.animate=function(){var t=this;this.update(.1);var i=this.mainCanvas;i.clear();for(var e in this._bodyTypes)this._bodyTypes[e].drawAll(i);this.animationFrame=window.requestAnimationFrame(function(i){t.animate.call(t,i)})},Game.prototype.start=function(){this.reset(),this.animate()},Game.prototype.stop=function(){this.animationFrame&&(window.cancelAnimationFrame(this.animationFrame),this.animationFrame=null)},Game.prototype.defineBodyType=function(t,i){return this._bodyTypes[t]=new plexi.BodyType(t,i),this._bodyTypes[t]},Game.prototype.addBody=function(t,i){var e=this._bodyTypes[t].create(i);return e.id&&(console.log("named body"),console.log(e.id),this._namedBodies[e.id]=e),this._world.addBody(e),e},plexi.Game=Game;
"use strict";var Keyboard=function(){};
"use strict";var plexi=plexi||{},Vec2=function(e,i){this.x=e,this.y=i};plexi.Vec2=Vec2;
"use strict";var plexi=plexi||{},World=function(){this.bodies=[],this.forces=[],this.behaviors=[],this.damping=0};World.prototype.reset=function(){},World.prototype.addBody=function(o){return this.bodies.push(o),o},plexi.World=World;