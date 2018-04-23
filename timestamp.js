module.exports = {
  flat : function() {
    var currentdate = new Date();
    
    return currentdate.getDate().toString() + (currentdate.getMonth()+1).toString() + currentdate.getFullYear().toString() 
    + "_" + currentdate.getHours().toString() + currentdate.getMinutes().toString() + currentdate.getSeconds().toString();
  }
}