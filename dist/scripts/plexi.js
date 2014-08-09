"use strict";var plexi={createGame:function(r){return new plexi.Game(r)},extend:function(r,t){for(var e in t)r[e]=t[e]},partial:function(r){var t=Array.prototype.slice,e=t.call(arguments,1);return function(){return r.apply(this,e.concat(t.call(arguments,0)))}}};
"use strict";var plexi=plexi||{},Body=function(t,i){plexi.extend(this,t.constants),plexi.extend(this,i)};Body.prototype.draw=function(t,i){var h=t(this.x,this.y);i.beginPath(),i.fillRect(h.x,h.y,this.width,this.height),i.closePath()},Body.prototype.update=function(t){this.vx&&this.vy&&(this.x=this.x+this.vx*t,this.y=this.y+this.vy*t,(this.x>1||this.x<-1)&&(this.vx*=-1),(this.y>1||this.y<-1)&&(this.vy*=-1))},plexi.Body=Body;
"use strict";var plexi=plexi||{},BodyType=function(p,t){this.id=p,this.props=[],this.constants={};for(var r in t)"props"===r?this.props=t.props:this.constants[r]=t[r]};BodyType.prototype.create=function(p){for(var t=0,r=this.props.length;r>t;t++){var s=this.props[t];if(!p.hasOwnProperty(s))return!1}var o=new plexi.Body(this,p);return o},plexi.BodyType=BodyType;
"use strict";var plexi=plexi||{},translate=function(t,i,s,a){return{x:(s+1)/2*t,y:(a+1)/2*i}},Canvas=function(t,i){this.name=t,this.canvas=document.getElementById(t),this.ctx=this.canvas.getContext("2d"),this.$parent=$(this.canvas).parent(),this.aspect=i.aspect||.66,this.reset()};Canvas.prototype.reset=function(){this.width=this.$parent.width()-20,this.canvas.width=this.width,this.height=this.width*this.aspect,this.canvas.height=this.height,this.transFn=plexi.partial(translate,this.width,this.height)},Canvas.prototype.clear=function(){this.ctx.clearRect(0,0,this.width,this.height)},Canvas.prototype.draw=function(t){this.clear();var i=this.ctx,s=this.transFn;t.forEach(function(t){t.draw(s,i)})},Canvas.prototype.drawBodies=function(t){this.clear();var i=this.ctx,s=this.transFn;t.forEach(function(t){t.draw(s,i)})},plexi.Canvas=Canvas;
"use strict";var plexi=plexi||{},Engine=function(i){this.game=i};plexi.Engine=Engine;
"use strict";function animate(t,i){t.update(.08),i.drawBodies(t._world.bodies),t.animFrame=window.requestAnimationFrame(animFn)}var $,plexi=plexi||{},Game=function(t){this.id=t,this._vars={},this._actions={},this._canvii={},this._bodyTypes={},this._world=new plexi.World,void 0!==$&&(this.$div=$("#"+t))};Game.prototype.vars=function(t){for(var i in t)this._vars[i]=t[i]},Game.prototype.var=function(t,i){return void 0===i?this._vars[t]:void(this._vars[t]=i)},Game.prototype.controls=function(t){for(var i in t){var a=t[i],n=this.$div.find("#"+i);n.val(this._vars[a])}},Game.prototype.actions=function(t){for(var i in t){var a=t[i];this._actions[i]=a}var n=this;this.$div.on("click",".btn",function(){n._actions[$(this).attr("id")](n)})},Game.prototype.canvas=function(t,i){var a=new plexi.Canvas(t,i);this._canvii[t]=a,this.mainCanvas=a},Game.prototype.bootstrap=function(t){this.bootstrapFn=t.bind(this),this.restart()},Game.prototype.restart=function(){this.stop(),this.reset(),this.bootstrapFn()},Game.prototype.reset=function(){this._world.reset()},Game.prototype.addParticle=function(t){return this._world.addParticle(t)},Game.prototype.draw=function(){this.mainCanvas.draw(this._world.particles)},Game.prototype.update=function(t){this._world.particles.forEach(function(i){i.update(t)}),this._world.bodies.forEach(function(i){i.update(t)})},Game.prototype.animate=function(t){this.update(.1),this.mainCanvas.drawBodies(this._world.bodies),this.animationFrame=window.requestAnimationFrame(this.animate.bind(this,t))};var animFn;Game.prototype.step=function(t){this.update(t),this.mainCanvas.draw(this._world.particles)},Game.prototype.start=function(){animFn=animate.bind(null,this,this.mainCanvas),this.animationFrame||window.requestAnimationFrame(animFn)},Game.prototype.stop=function(){this.animationFrame&&(window.cancelAnimationFrame(this.animationFrame),this.animationFrame=null)},Game.prototype.defineBodyType=function(t,i){return this._bodyTypes[t]=new plexi.BodyType(t,i),this._bodyTypes[t]},Game.prototype.addBody=function(t,i){var a=this._bodyTypes[t].create(i);return this._world.addBody(a),a},plexi.Game=Game;
"use strict";var plexi=plexi||{},Particle=function(t){t=t||{},this.x=t.x||0,this.y=t.y||0,this.mass=t.mass||1,this.velocity=t.velocity||new plexi.Vec2(0,0)};Particle.prototype.update=function(t){this.x+=this.velocity.x*t,this.y+=this.velocity.y*t,(this.x<-1||this.x>1)&&(this.velocity.x*=-1),(this.y<-1||this.y>1)&&(this.velocity.y*=-1)},Particle.prototype.draw=function(t,i){var e=t(this.x,this.y);i.beginPath(),i.arc(e.x,e.y,15,0,6.28,0),i.closePath(),i.fill()},plexi.Particle=Particle;
"use strict";var plexi=plexi||{},Vec2=function(e,i){this.x=e,this.y=i};plexi.Vec2=Vec2;
"use strict";var plexi=plexi||{},World=function(){this.particles=[],this.bodies=[],this.forces=[],this.behaviors=[],this.damping=0};World.prototype.reset=function(){this.particles=[]},World.prototype.addBody=function(t){return this.bodies.push(t),t},World.prototype.addParticle=function(t){var i=new plexi.Particle(t);return this.particles.push(i),i},plexi.World=World;