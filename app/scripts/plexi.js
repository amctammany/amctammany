"use strict";function partial(r){var t=Array.prototype.slice,n=t.call(arguments,1);return function(){return r.apply(this,n.concat(t.call(arguments,0)))}}var plexi={createGame:function(r){return new Game(r)},extend:function(r,t){for(var n in t)r[n]=t[n]}};
"use strict";var Body=function(t,i){plexi.extend(this,t.constants),plexi.extend(this,i)};Body.prototype.draw=function(t,i){var e=t(this.x,this.y);i.beginPath(),i.fillRect(e.x,e.y,this.width,this.height),i.closePath()};
"use strict";var BodyType=function(t,r){this.id=t,this.props=[],this.constants={};for(var s in r)"props"===s?this.props=r.props:this.constants[s]=r[s]};BodyType.prototype.create=function(t){for(var r=0,s=this.props.length;s>r;r++){var o=this.props[r];if(!t.hasOwnProperty(o))return!1}var p=new Body(this,t);return p};
"use strict";var Canvas=function(t,i){this.name=t,this.canvas=document.getElementById(t),this.ctx=this.canvas.getContext("2d"),this.$parent=$(this.canvas).parent(),this.aspect=i.aspect||.66,this.reset()};Canvas.prototype.reset=function(){this.width=this.$parent.width()-20,this.canvas.width=this.width,this.height=this.width*this.aspect,this.canvas.height=this.height};var translate=function(t,i,a,h){return{x:(a+1)/2*t,y:(h+1)/2*i}};Canvas.prototype.clear=function(){this.ctx.clearRect(0,0,this.width,this.height)},Canvas.prototype.draw=function(t){this.clear();var i=this.ctx,a=partial(translate,this.width,this.height);t.forEach(function(t){t.draw(a,i)})},Canvas.prototype.drawBodies=function(t){this.clear();var i=this.ctx,a=partial(translate,this.width,this.height);t.forEach(function(t){t.draw(a,i)})};

"use strict";var $,Game=function(t){this.id=t,this._vars={},this._actions={},this._canvii={},this._bodyTypes={},this._world=new World,void 0!==$&&(this.$div=$("#"+t))};Game.prototype.vars=function(t){for(var i in t)this._vars[i]=t[i]},Game.prototype.var=function(t,i){return void 0===i?this._vars[t]:void(this._vars[t]=i)},Game.prototype.controls=function(t){for(var i in t){var a=t[i],o=this.$div.find("#"+i);o.val(this._vars[a])}},Game.prototype.actions=function(t){for(var i in t){var a=t[i];this._actions[i]=a}var o=this;this.$div.on("click",".btn",function(){o._actions[$(this).attr("id")](o)})},Game.prototype.canvas=function(t,i){var a=new Canvas(t,i);this._canvii[t]=a,this.mainCanvas=a},Game.prototype.bootstrap=function(t){this.bootstrapFn=t.bind(this),this.restart()},Game.prototype.restart=function(){this.stop(),this.reset(),this.bootstrapFn()},Game.prototype.reset=function(){this._world.reset()},Game.prototype.addParticle=function(t){return this._world.addParticle(t)},Game.prototype.draw=function(){this.mainCanvas.draw(this._world.particles)},Game.prototype.update=function(t){this._world.particles.forEach(function(i){i.update(t)})},Game.prototype.animate=function(t){this.update(.3),this.mainCanvas.drawBodies(this._world.bodies),this.animationFrame=window.requestAnimationFrame(this.animate.bind(this,t))},Game.prototype.step=function(t){this.update(t),this.mainCanvas.draw(this._world.particles)},Game.prototype.start=function(){this.animationFrame||this.animate(this.mainCanvas)},Game.prototype.stop=function(){this.animationFrame&&(window.cancelAnimationFrame(this.animationFrame),this.animationFrame=null)},Game.prototype.defineBodyType=function(t,i){return this._bodyTypes[t]=new BodyType(t,i),this._bodyTypes[t]},Game.prototype.addBody=function(t,i){var a=this._bodyTypes[t].create(i);return this._world.addBody(a),a};
"use strict";var Particle=function(t){t=t||{},this.x=t.x||0,this.y=t.y||0,this.mass=t.mass||1,this.velocity=t.velocity||new Vec2(0,0)};Particle.prototype.update=function(t){this.x+=this.velocity.x*t,this.y+=this.velocity.y*t,(this.x<-1||this.x>1)&&(this.velocity.x*=-1),(this.y<-1||this.y>1)&&(this.velocity.y*=-1)},Particle.prototype.draw=function(t,i){var s=t(this.x,this.y);i.beginPath(),i.arc(s.x,s.y,15,0,6.28,0),i.closePath(),i.fill()};
"use strict";var Vec2=function(t,i){this.x=t,this.y=i};
"use strict";var World=function(){this.particles=[],this.bodies=[],this.forces=[],this.behaviors=[],this.damping=0};World.prototype.reset=function(){this.particles=[]},World.prototype.addBody=function(t){return this.bodies.push(t),t},World.prototype.addParticle=function(t){var i=new Particle(t);return this.particles.push(i),i};