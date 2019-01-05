Function.prototype.myBind = function(context) {
  return () => this.apply(context);
};